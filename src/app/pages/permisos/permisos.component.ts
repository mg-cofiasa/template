import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MessageService } from 'primeng/api';
import { TreeNode } from 'primeng/api';
import Swal from 'sweetalert2';

import { SharedService } from 'src/app/shared/services/shared.service';
import { PermisosService } from './services/permisos.service';
import {
  iAplicacionPermisos,
  iAplicacionPermisosMenu,
  iAplicacionRoles,
  iAplicacionRolesOpcion,
  iAplicacionRolesSeccion,
  iAplicacionSeccionPermisos,
  iOpcionesSeleccionadas,
  iUsuarioAplicacion,
  iUsuarioInformacion,
  iUsuarioPermisosGuardar,
} from './interfaces/permisos.interface';
import { iCatalogoIdCadena } from 'src/app/shared/interfaces/shared';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrl: './permisos.component.scss',
  providers: [MessageService],
})
export class PermisosComponent implements OnInit {
  public expandir: boolean = true;
  public urlMedia: string = environment.urlMedia;
  public patronBusqueda: string = '';
  public usuariosLista: iUsuarioInformacion[] = [];
  public usuarioSeleccionado: iUsuarioInformacion = <iUsuarioInformacion>{};
  public aplicacionSeleccionada: iUsuarioAplicacion = <iUsuarioAplicacion>{};
  public arbolMenu: TreeNode[] = [];
  public opcionesSeleccionadas: TreeNode[] = [];
  public opcionesSeleccionadasGuardar: iOpcionesSeleccionadas[] = [];
  public cboAplicacionesData: iCatalogoIdCadena[] = [];
  public cboAplicacioRolesData: iAplicacionRoles[] = [];

  public formBusqueda: FormGroup = this.fb.group({
    txtBuscarUsuario: [],
  });

  public formAgregarApp: FormGroup = this.fb.group({
    cboAgregarApp: [],
  });

  public formRoles: FormGroup = this.fb.group({
    cboAppRoles: [],
  });

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private permisos: PermisosService,
    private sharedService: SharedService
  ) {
  }

  ngOnInit(): void {}

  /**
   * Acción: Busqueda de usuarios a partir de un patron de busqueda
   */
  public BuscarUsuario() {
    this.usuarioSeleccionado = <iUsuarioInformacion>{};
    this.aplicacionSeleccionada = <iUsuarioAplicacion>{};

    this.usuariosLista = <iUsuarioInformacion[]>{};
    this.opcionesSeleccionadas = [];
    this.arbolMenu = [];
    this.opcionesSeleccionadasGuardar = [];
    this.patronBusqueda = this.formBusqueda.controls['txtBuscarUsuario'].value;

    if (this.patronBusqueda !== null && this.patronBusqueda.trim().length > 0) {
      this.sharedService.SwalModalAwaitServer();

      this.permisos.GetUsuarioAplicaciones(this.patronBusqueda).subscribe({
        next: (data: iUsuarioInformacion[]) => {
          Swal.close();

          if (data !== null) {
            this.usuariosLista = data;
            this.usuariosLista.map((item: iUsuarioInformacion) => {
              if (item.Aplicacion.length === 1 && item.Aplicacion[0].NombreAplicacion === ""){
                item.Aplicacion = [];
              }
            });

            this.messageService.clear();
          } else {
            this.messageService.add({ severity: 'info', summary: 'Resultado de la búsqueda', detail: 'No se encontraron resultados de acuerdo al patrón de búsqueda' });
          }
        },
        error: () => {
          Swal.close();
        },
      });
    } else {
      this.messageService.add({ severity: 'info', summary: 'Patrón de búsqueda', detail: 'Escribir al menos un caracter de búsqueda' });
    }
  }

  /**
   * Acción: Obtiene los permisos de la aplicacion asociada al usuario seleccionado
   */
  public ObtenerPermisosAplicacion() {
    this.formRoles.reset();
    this.sharedService.SwalModalAwaitServer();

    this.permisos.GetUsuarioAplicacionPermisos(this.usuarioSeleccionado.Usuario, this.aplicacionSeleccionada.IdAplicacion).subscribe({
      next: (data: iAplicacionPermisos[]) => {
        Swal.close();
        this.opcionesSeleccionadas = [];
        let secciones: TreeNode[] = [];

        data[0].Menu.forEach((menu: iAplicacionPermisosMenu, i: number) => {
          let permisos: TreeNode[] = [];

          menu.Permisos.forEach((b: iAplicacionSeccionPermisos, j: number) => {
            const permiso = {
              key: 'opcion-' + i + '-' + j,
              data: menu.Seccion,
              label: b.PermisoNombre,
              icon: b.Permiso
            };

            if (b.Valor === 1) {
              this.opcionesSeleccionadas.push(permiso);
            }

            permisos.push(permiso);
          });

          let seccion: TreeNode = {
            key: 'opcion-' + i,
            label: menu.Seccion,
            children: permisos,
          };

          secciones.push(seccion);

          if (menu.Permisos.length === this.opcionesSeleccionadas.filter((y) => y.data === seccion.label).length) {
            this.opcionesSeleccionadas.push({ key: seccion.key });
          } 
          else if (this.opcionesSeleccionadas.filter((y) => y.data === seccion.label).length > 0) {
            seccion.partialSelected = true;
          }
        });

        let temp: TreeNode[] = [
          {
            label: data[0].App,
            key: '0',
            children: secciones,
          },
        ];

        this.arbolMenu = temp;
        this.ExpandirTodo();
      },
      error: () => {
        Swal.close();
      },
    });
  }

  /**
   * Acción: Al seleccionar un usuario, establecer a ninguna aplicacion seleccionada
   */
  public AplicacionSeleccionadaRestablecer() {
    this.aplicacionSeleccionada = <iUsuarioAplicacion>{};
    this.opcionesSeleccionadas = [];
    this.arbolMenu = [];
    this.AplicacionesNoAsignadas();
  }
    
  /**
   * Acción: Agrega permiso(s) al usuario, de la aplicacion seleccionada
   */
  public AgregarNodo(data: any) {
    let nodo: TreeNode = data.node;

    if (nodo.key === '0') { // Si se selecciona el nodo principal, agrega todas los permisos
      this.opcionesSeleccionadas = [];
      this.SeleccionaTodo();
    } 
    else if (nodo.data === undefined) { // Si se selecciona una seccion, agrega todos sus permisos
      this.SeleccionarRecursivo(nodo, false);
    } 
    else { // Si selecciona un permiso
      let permiso: TreeNode = {
        key: nodo.key,
        data: nodo.data,
        label: nodo.label,
        icon: nodo.icon
      };

      this.opcionesSeleccionadas.push(permiso);
    }
  }

  /**
   * Acción: Elimina permiso(s) del usuario, de la aplicacion seleccionada
   */
  public EliminarNodo(nodo: any) {
    let posicion = 0;
    if (nodo.node.key === '0') { // Si se selecciona el nodo principal, se eliminan todos los permisos
      this.opcionesSeleccionadas = [];
    }
    else {
      posicion = this.opcionesSeleccionadas.findIndex((item: TreeNode) => item.key === nodo.node.key);

      if (posicion === -1 || nodo.node.data === undefined) { // No existe el nodo en opciones seleccionadas o no tiene nombre, elimina todos los permisos de la seccion
        this.opcionesSeleccionadas = this.opcionesSeleccionadas.filter((item: TreeNode) => !item.key!.includes(nodo.node.key));
      } 
      else {
        let padre = nodo.node.parent;
        this.opcionesSeleccionadas.splice(posicion, 1);

        // Busca si el nodo padre tiene mas permisos seleccionados para quitar la seleccion
        if (this.opcionesSeleccionadas.filter((item: any) => item.key.includes(padre.key).length === 1) && padre.data === undefined) {
          posicion = this.opcionesSeleccionadas.findIndex((item: any) => item.key === padre.key);

          if (posicion !== -1) {
            this.opcionesSeleccionadas.splice(posicion, 1);
          }
        }
      }
    }
  }

  /**
   * Acción: Expande el arbol de permisos de la aplicacio seleccionada
   */
  public ExpandirTodo() {
    this.expandir = true;

    this.arbolMenu!.forEach((node) => {
      this.ExpandirRecursivo(node, true);
    });
  }

  /**
   * Acción: Contrae el arbol de permisos de la aplicacio seleccionada
   */
  public ContraerTodo() {
    this.expandir = false;

    this.arbolMenu!.forEach((node) => {
      this.ExpandirRecursivo(node, false);
    });
  }

  /**
   * Acción: Expande de forma recursiva los nodos del arbol
   */
  private ExpandirRecursivo(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach((childNode) => {
        this.ExpandirRecursivo(childNode, isExpand);
      });
    }
  }

  /**
   * Acción: Selecciona todos los permisos del nodo
   */
  public SeleccionaTodo() {
    this.arbolMenu!.forEach((node) => {
      this.SeleccionarRecursivo(node, true);
    });
  }

  /**
   * Acción: Selecciona de forma recursiva los permisos del nodo
   */
  private SeleccionarRecursivo(node: TreeNode, isExpand: boolean) {
    let permiso: TreeNode = {
      key: node.key,
      data: node.data,
      label: node.label,
      icon: node.icon
    };

    let posicion = this.opcionesSeleccionadas.findIndex((item: TreeNode) => item.key === permiso.key);

    if (posicion === -1) {
      this.opcionesSeleccionadas.push(permiso);
    }

    if (node.children) {
      node.children.forEach((childNode) => {
        this.SeleccionarRecursivo(childNode, isExpand);
      });
    }
  }

  /**
   * Acción: Actualiza los permisos del usuario
   */
  public GuardarAplicacionOpciones() {
    let post: iUsuarioPermisosGuardar = <iUsuarioPermisosGuardar>{};
    this.opcionesSeleccionadasGuardar = [];

    this.opcionesSeleccionadas.map((item: TreeNode) => {
      if (item.data !== undefined) {
        let permiso: iOpcionesSeleccionadas = {
          key: item.icon!,
          data: item.data,
          label: item.label!,
        };

        this.opcionesSeleccionadasGuardar.push(permiso);
      }
    });

    post.IdUsuario = this.usuarioSeleccionado.Usuario;
    post.IdAplicacion = this.aplicacionSeleccionada.IdAplicacion;
    post.Permisos = JSON.stringify(this.opcionesSeleccionadasGuardar);

    this.sharedService.SwalModalAwaitServer();
    this.permisos.PostGuardarAplicacionesOpciones(post).subscribe({
      next: (data: boolean) => {
        if (data) {
          Swal.close();
          this.formAgregarApp.reset();
          this.arbolMenu = [];

          this.usuariosLista.map((item: iUsuarioInformacion) => {
            if (item.Usuario === this.usuarioSeleccionado.Usuario && item.Aplicacion.filter((app: iUsuarioAplicacion) => app.IdAplicacion === post.IdAplicacion).length === 0 ){
              item.Aplicacion.push({
                IdAplicacion: this.aplicacionSeleccionada.IdAplicacion,
                NombreAplicacion: this.aplicacionSeleccionada.NombreAplicacion
              });
            }
          });

          this.AplicacionesNoAsignadas();

          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Se actualizaron correctamente los permisos',
            key: 'toast-cc',
          });
        }
      },
      error: () => {
        Swal.close();
      },
    });
  }

  /**
   * Acción: Obtiene la relación de aplicaciones no asignadas al usuario
   */
  public AplicacionesNoAsignadas() {
    this.cboAplicacionesData = [];
    this.sharedService.SwalModalAwaitServer();
    this.formAgregarApp.reset();

    this.permisos.GetAplicaciones(this.usuarioSeleccionado.Usuario).subscribe({
      next: (data: iCatalogoIdCadena[]) => {
        Swal.close();
        if (data !== null){
          this.cboAplicacionesData = data;
        }
      },
      error: () => {
        Swal.close();
      },
    });
  }

  /**
   * Acción: Obtiene el arbol de permisos de la aplicación seleccionada
   */
  public AplicacionArbolPermisos() {
    this.opcionesSeleccionadas = [];
    this.formRoles.reset();
    const aplicacion: iCatalogoIdCadena = this.formAgregarApp.controls["cboAgregarApp"].value;

    if (aplicacion === null || aplicacion === undefined){
      this.messageService.add({ severity: 'info', summary: 'Seleccionar aplicación', detail: 'Seleccionar una aplicación de la lista' });
    }
    else{
      this.sharedService.SwalModalAwaitServer();

      this.permisos.GetAplicacionArbolPermisos(aplicacion.Id).subscribe({
        next: (data: iAplicacionPermisos[]) => {
          Swal.close();
          let secciones: TreeNode[] = [];
  
          data[0].Menu.forEach((menu: iAplicacionPermisosMenu, i: number) => {
            let permisos: TreeNode[] = [];
  
            menu.Permisos.forEach((b: iAplicacionSeccionPermisos, j: number) => {
              const permiso: TreeNode = {
                key: 'opcion-' + i + '-' + j,
                data: menu.Seccion,
                label: b.PermisoNombre,
                icon: b.Permiso
              };
              permisos.push(permiso);
            });
  
            let seccion: TreeNode = {
              key: 'opcion-' + i,
              label: menu.Seccion,
              children: permisos,
            };
  
            secciones.push(seccion);
          });
  
          let temp: TreeNode[] = [
            {
              label: data[0].App,
              key: '0',
              children: secciones,
            },
          ];
  
          this.arbolMenu = temp;
          this.ExpandirTodo();

          this.ObtenerRoles(aplicacion.Id);
        },
        error: () => {
          Swal.close();
        },
      });    
    }

  }  

  /**
   * Acción: Aplicacion seleccionada para agregar al usuario los permisos correspondientes
   */
  public AgregarApp(){
    if (this.formAgregarApp.controls["cboAgregarApp"].value !== undefined && this.formAgregarApp.controls["cboAgregarApp"].value !== null){
      let app: iCatalogoIdCadena = this.formAgregarApp.controls["cboAgregarApp"].value;
      this.aplicacionSeleccionada.IdAplicacion = app.Id;
      this.aplicacionSeleccionada.NombreAplicacion = app.Nombre;
    }
    else{
      this.aplicacionSeleccionada = <iUsuarioAplicacion>{};
      this.arbolMenu = [];
    }
  }

  /**
   * Acción: Obtiene los roles de usuario de la aplicación seleccionada
   */
  public ObtenerRoles(IdAplicacion: string){
    this.sharedService.SwalModalAwaitServer();

    this.permisos.GetAplicacionRoles(IdAplicacion).subscribe({
      next: (data: iAplicacionRoles[]) => {
        Swal.close();

        this.cboAplicacioRolesData = data;
      },
      error: () => {
        Swal.close();
      },
    });    
  }

  /**
   * Acción: Aplica los permisos al arbol de la aplicación del rol seleccionado
   */
  public AppAplicarRol(){
    const rol = this.formRoles.controls["cboAppRoles"].value;
    let nodosArbolMenu: iCatalogoIdCadena[] = [];

    this.arbolMenu[0].children?.map((seccion: TreeNode) =>{
      seccion.children?.map((opcion: TreeNode) => {
        nodosArbolMenu.push({
          Id: opcion.key!,
          Nombre: (opcion.data!).concat(opcion.label!)
        });
      });
    });


    if (rol != undefined && rol != null){
      this.opcionesSeleccionadas = [];

      rol.Permisos.map((item: iAplicacionRolesSeccion) =>{
        item.Seccion.map((opc: iAplicacionRolesOpcion) => {
          let key: iCatalogoIdCadena[] = nodosArbolMenu.filter((nodo: iCatalogoIdCadena) => nodo.Nombre === item.Nombre.concat(opc.Nombre) );



          let permiso: TreeNode = {
            key: key[0].Id,
            data: item.Nombre,
            icon: opc.Id,
            label: opc.Nombre
          }
          this.opcionesSeleccionadas.push(permiso);
        })
      });
    }
  }
}