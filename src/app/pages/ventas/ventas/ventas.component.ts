import { Component } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { VentasService } from '../services/ventas.service';
import { VentasBaseService } from '../services/ventas-base.service';
import { MessageService } from 'primeng/api';
//import { AuthService } from '@modules/auth';
import { iArregloGraficaDatos, iCatalogoCondicionesColores, iCatalogoFormulas, iCatalogoIdNombre, iCatalogoNombre, iCatalogos, iDatosGrafica, iEnviarDatosGrafica, iTablaVenta, iUsuarioCatalogos } from '../interfaces/ventas.interface';
import * as Highcharts from 'highcharts';
import Swal from 'sweetalert2';
import { catalogoCondicionesColores, catalogoFormulas } from '../constants/api-ventas-catalogos';

import { TokenService } from 'src/app/auth/services/token.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { InfoUsuario } from 'src/app/auth/interfaces/token-response';
import { GraficasParametrizacionService } from '../services/graficas-parametrizacion.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss'],
  providers: [MessageService]
})
export class VentasComponent {
  public infoUsuario: InfoUsuario = <InfoUsuario>{};
  public tituloGraficasTablas: string = "";
  public tituloColumnaTabla: string = "Sucursal";
  public datosGraficas: iArregloGraficaDatos = <iArregloGraficaDatos>{};

  public formulasVisible: boolean = false;
  public condicionesColoresVisible: boolean = false;

  public formulas: iCatalogoFormulas[] = catalogoFormulas;
  public condicionesColores: iCatalogoCondicionesColores[] = catalogoCondicionesColores;

  public actualizacionInformacion: Date = new Date();
  public tablaData: iTablaVenta[] = [];
  public mostrarGraficas: boolean = false;
  public mostrarTabla: boolean = false;
  public actualGraficaTabla: string = "grafica";

  private usuario?: string = "";
  public periodo: number[] = [];
  public fechaHoy = new Date();
  public periodoActual: string = ((this.fechaHoy.getFullYear() * 100) + this.fechaHoy.getMonth() + 1).toString();

  public enviarDatosGrafica: iEnviarDatosGrafica = <iEnviarDatosGrafica>{};

  public ventaNeta: boolean = false;
  
  public formBusqueda: FormGroup = this.fb.group({
    cboPeriodo: [],
    cboZona: [],
    cboPlaza: [],
    cboSucursal: [],
    cboSegmento: [],
    cboCategoria: [],
    chkVentaNeta: [false]
  });

  public cboPeriodoData: iCatalogoNombre[] = [];
  public cboZonaData: iCatalogos[] = [];
  public cboPlazaData: iCatalogos[] = [];
  public cboSucursalData: iCatalogos[] = [];
  public cboSegmentoData: iCatalogoNombre[] = [];
  public cboCategoriaData: iCatalogoIdNombre[] = [
    {Id: 2, Nombre: "Agentes"},
    {Id: 3, Nombre: "Mostrador y agente"},
    {Id: 1, Nombre: "Mostradores"},
    {Id: 0, Nombre: "Sucursales"},
  ];

  Highcharts: typeof Highcharts = Highcharts;
  
  public ventaEnDineroGrafica: Highcharts.Options = this.graficasParametrizacionService.graficaBase;
  public ventaEnToneladasGrafica: Highcharts.Options = this.graficasParametrizacionService.graficaBase;
  public utilidadEnImporteGrafica: Highcharts.Options = this.graficasParametrizacionService.graficaBase;
  public margenGrafica: Highcharts.Options = this.graficasParametrizacionService.graficaBase;
  public mezclaGrafica: Highcharts.Options = this.graficasParametrizacionService.graficaBase;
  
  constructor(
    //private auth: AuthService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private ventasService: VentasService,
    private ventasBaseService: VentasBaseService,
    private tokenService: TokenService,
    private sharedService: SharedService,
    private graficasParametrizacionService: GraficasParametrizacionService
    ){
      this.infoUsuario = this.tokenService.ObtenerInfoUsuario();
      this.usuario = this.infoUsuario.Usuario;

      for(let anio = (Number(this.fechaHoy.getFullYear())) ; anio >= Number(this.fechaHoy.getFullYear()-5) ; anio--){
        let mesBase = 12;
        if (anio === this.fechaHoy.getFullYear()){
          mesBase = this.fechaHoy.getMonth() + 1;
        }

        for(let mes = mesBase ; mes > 0 ; mes--){
          this.cboPeriodoData.push({Nombre: anio + '' + mes.toString().padStart(2, '0')});
        }
      }

      this.GetPermisosUsuario(this.usuario);     
  }

  /**
   * Acción: Getter para facilitar el acceso al formulario
   */    
  public get form(){
    return this.formBusqueda.controls;
  }

  public GetDatosGraficas(tipo: string, event: any = null, graficaTabla: string){    
    if (["cboZona", "cboPlaza", "cboSucursal"].includes(tipo)){
      let opcion = event.value;
      
      if (opcion === null){
        this.enviarDatosGrafica.LugarValor = "";
        this.enviarDatosGrafica.TipoLugar = "";
      }
      else{
        this.enviarDatosGrafica.LugarValor = event.value.Valor;
        this.enviarDatosGrafica.TipoLugar = tipo.replace("cbo", "");
      }
      
      this.formBusqueda.controls["cboZona"].setValue(null);
      this.formBusqueda.controls["cboPlaza"].setValue(null);
      this.formBusqueda.controls["cboSucursal"].setValue(null);
      this.formBusqueda.controls[tipo].setValue(event.value);
    }

    let segmento: iCatalogoNombre = this.form["cboSegmento"].value;
    this.enviarDatosGrafica.VentaNeta = this.form["chkVentaNeta"].value;

    if (this.form["cboPeriodo"].value === null){
      this.messageService.add({severity: 'info', summary: 'Seleccionar un periodo', detail: `Seleccionar un periodo de la lista`});
      return 1;
    }
    
    let periodo: iCatalogoNombre = this.form["cboPeriodo"].value;
    let actualizarDatos: boolean = this.enviarDatosGrafica.Periodo !== periodo.Nombre ? true : false;

    this.enviarDatosGrafica.Periodo = periodo.Nombre;

    if (tipo === "actualizarDatos"){
      actualizarDatos = true;
    }
    
    if (segmento === null){
      this.enviarDatosGrafica.Segmento = "";
    }
    else{
      this.enviarDatosGrafica.Segmento = segmento.Nombre.replace("+", "%2B");
    }

    if (this.enviarDatosGrafica.TipoLugar === undefined || this.enviarDatosGrafica.TipoLugar === ""){
      this.enviarDatosGrafica.TipoLugar = "Gran Total";
    }

    if (graficaTabla != ""){
      this.actualGraficaTabla = this.actualGraficaTabla === "grafica" ? "tabla" : "grafica";
    }

    if (this.actualGraficaTabla === "grafica"){ // Genera las gráficas
      this.tituloGraficasTablas = "Consulta por Sucursales (Venta por sucursal)";

      if (this.mostrarGraficas === false){
        setTimeout(()=>{       
          this.MostrarGraficas(this.enviarDatosGrafica, actualizarDatos);
          this.mostrarGraficas = true;
          this.mostrarTabla = false;
        }, 100);
      }
      else{
        this.MostrarGraficas(this.enviarDatosGrafica, actualizarDatos);
        this.mostrarGraficas = true;
        this.mostrarTabla = false;
      }
    }
    else{ // Genera la tabla
      this.mostrarGraficas = false;
      this.mostrarTabla = true;

      if (this.form["cboCategoria"].value === null){
        this.form["cboCategoria"].setValue({Id: 0, Nombre: "Sucursales"});
      }

      if (this.form["cboCategoria"].value.Id === 0){
        this.tituloColumnaTabla = "Sucursal";
        this.tituloGraficasTablas = "Consulta por Sucursales (Venta por sucursal)";
      }
      else if(this.form["cboCategoria"].value.Id === 1){
        this.tituloColumnaTabla = "Mostrador";
        this.tituloGraficasTablas = "Consulta por Mostradores (Incluye Solo Agentes Mostradores)";
      }
      else if(this.form["cboCategoria"].value.Id === 2){
        this.tituloColumnaTabla = "Agente";
        this.tituloGraficasTablas = "Consulta por Agentes de Venta (Incluye Solo Agentes de Ventas)";
      }
      else if(this.form["cboCategoria"].value.Id === 3){
        this.tituloColumnaTabla = "Agente y mostrador";
        this.tituloGraficasTablas = "Consulta por Agentes y Mostradores de Venta (Agentes + Mostradores)";
      }
      
      this.MostrarTabla(this.enviarDatosGrafica, actualizarDatos);
    }

    return 0;
  }

  /**
   * Acción: Obtiene información para generar las gráficas
   */
  public MostrarGraficas(enviarDatosGrafica: iEnviarDatosGrafica, actualizarDatos: boolean){
    this.sharedService.SwalModalAwaitServer();

    if (actualizarDatos === true){
      this.ventasService.GetDatosActualizadosGraficas(enviarDatosGrafica).subscribe({
        next: (Respuesta: iArregloGraficaDatos) => {
          Swal.close();
          this.actualizacionInformacion = new Date();
          this.messageService.add({severity: 'success', summary: 'Información actualizada', detail: `La consulta se realizó correctamente`, key: 'preload_success', life:1000});

          this.datosGraficas = Respuesta;
          this.GenerarGraficas(Respuesta);
        },
        error: (error) => {
        }
      });    
    }
    else{
      this.ventasService.GetDatosGraficas(enviarDatosGrafica).subscribe({
        next: (Respuesta: iArregloGraficaDatos) => {
          Swal.close();
          this.messageService.add({severity: 'success', summary: 'Información actualizada', detail: `La consulta se realizó correctamente`, key: 'preload_success', life:1000});

          this.datosGraficas = Respuesta;
          this.GenerarGraficas(Respuesta);
        },
        error: (error) => {
        }
      });
    }
  }

  /**
   * Acción: Genera las gráficas
   */
  public GenerarGraficas(Respuesta: iArregloGraficaDatos){
    this.ventaEnDineroGrafica = JSON.parse(JSON.stringify(this.graficasParametrizacionService.graficaBase));
    this.ventaEnToneladasGrafica = JSON.parse(JSON.stringify(this.graficasParametrizacionService.graficaBase));
    this.utilidadEnImporteGrafica = JSON.parse(JSON.stringify(this.graficasParametrizacionService.graficaBase));
    this.margenGrafica = JSON.parse(JSON.stringify(this.graficasParametrizacionService.graficaBase));
    this.mezclaGrafica = JSON.parse(JSON.stringify(this.graficasParametrizacionService.graficaBase));

    this.ventaEnDineroGrafica.series = [{
      name: 'Venta en dinero',
      type:'column',
      colorByPoint: true,
      tooltip:{followPointer:true},
      data: Respuesta.Ventas
    }];

    this.ventaEnDineroGrafica.title = {text:"VENTA EN DINERO"};
    this.ventaEnDineroGrafica.yAxis = {title: {text: "MILES &nbsp; DE &nbsp; PESOS"}};

    this.ventaEnToneladasGrafica.series =  [{
      name: 'Venta en toneladas',
      type:'column',
      colorByPoint: true,
      tooltip:{followPointer:true},
      data: Respuesta.Toneladas
    }];
    this.ventaEnToneladasGrafica.title = {text:"VENTA EN TONELADAS"};
    this.ventaEnToneladasGrafica.yAxis = {title: {text: "TONELADAS"}};

    this.utilidadEnImporteGrafica.series = [{
      name: 'Utilidad en importe',
      type:'column',
      colorByPoint: true,
      tooltip:{followPointer:true},
      data: Respuesta.Utilidad
    }];
    this.utilidadEnImporteGrafica.title = {text:"UTILIDAD EN IMPORTE"};
    this.utilidadEnImporteGrafica.yAxis = {title: {text: "MILES &nbsp; DE &nbsp; PESOS"}};

    this.margenGrafica.series = [{
      name: 'Margen',
      type:'column',
      colorByPoint: true,
      tooltip:{followPointer:true},
      data: Respuesta.Margen
    }];
    this.margenGrafica.title = {text:"MARGEN"};
    this.margenGrafica.yAxis = {title: {text: "PORCENTAJE"}};

    this.mezclaGrafica.series =  [{
      name: 'Mezcla',
      type:'column',
      colorByPoint: true,
      tooltip:{followPointer:true},
      data: Respuesta.Mezcla
    }];
    this.mezclaGrafica.title = {text:"MEZCLA"};
    this.mezclaGrafica.yAxis = {title: {text: "MILES &nbsp; DE &nbsp; PESOS &nbsp; / &nbsp; PORCENTAJE"}};    
  }

  /**
   * Acción: Obtiene información para generar la tabla de resultados
   */
  public MostrarTabla(enviarDatosGrafica: iEnviarDatosGrafica, actualizarDatos: boolean){
    this.sharedService.SwalModalAwaitServer();

    if (this.form["cboCategoria"].value !== null){
      enviarDatosGrafica.Categoria = this.form["cboCategoria"].value.Id;
    }

    if (actualizarDatos === true){
      this.ventasService.GetDatosActualizadosTabla(enviarDatosGrafica).subscribe({
        next: (Respuesta: iTablaVenta[]) => {
          Swal.close();
          this.actualizacionInformacion = new Date();
          this.messageService.add({severity: 'success', summary: 'Información actualizada', detail: `La consulta se realizó correctamente`, key: 'preload_success', life:1000});
  
          this.tablaData = Respuesta;

          let cont = 0;
          this.tablaData.map( (x: any, index: number) =>{
            if (index%4 === 0){
              cont = cont + 1
            }
            x.order = cont;
          });          
        },
        error: (error) => {
        }
      });       
    }
    else{
      this.ventasService.GetDatosTabla(enviarDatosGrafica).subscribe({
        next: (Respuesta: iTablaVenta[]) => {
          Swal.close();
          this.messageService.add({severity: 'success', summary: 'Información actualizada', detail: `La consulta se realizó correctamente`, key: 'preload_success', life:1000});
          this.tablaData = Respuesta;

          let cont = 0;
          this.tablaData.map( (x: any, index: number) =>{
            if (index%4 === 0){
              cont = cont + 1
            }
            x.order = cont;
          });
        },
        error: (error) => {
        }
      });    
    }
  }

  /**
   * Acción: Obtiene las zonas, plazas y sucursales del usuario
   */
  public GetPermisosUsuario(usuario: string = ""){
    this.ventasBaseService.GetPermisosUsuario(usuario).subscribe({
      next: (Respuesta: iUsuarioCatalogos) =>{
        this.cboZonaData = Respuesta.Zonas;
        this.cboPlazaData = Respuesta.Plazas;
        this.cboSucursalData = Respuesta.Sucursales;

        this.cboSegmentoData = [];
        Respuesta.Segmentos.map( x=> {
          this.cboSegmentoData.push({Nombre: x});
        });
      },
      error: (error) => {
      }
    });
  }

  /**
   * Acción: Muestra/Oculta los dialogs de la ayuda
   */
  public OcultarDialogs(dialog: string){
    if (dialog === "formulas"){
      this.formulasVisible = !this.formulasVisible;
      this.condicionesColoresVisible = false; 
    }
    else{
      this.condicionesColoresVisible = !this.condicionesColoresVisible;
      this.formulasVisible = false;
    }
  }

  /**
   * Acción: Envía información al servidor para obtener el excel correspondiente
   */
  public DescargarExcel(){
    this.sharedService.SwalModalAwaitServer();

    if (this.mostrarGraficas === true){
      this.ventasBaseService.GetExcelGraficas(this.datosGraficas, 0).subscribe({
        next: (Respuesta: any) => {
          Swal.close();

          this.DownloadFile(Respuesta, "ventas_reporte_graficas_" + formatDate(new Date(), 'yyyy-MM-dd_hh:mm:ss', 'en') + ".xlsx");
          this.messageService.add({severity: 'success', summary: 'Excel generado', detail: `El archivo se ha generado correctamente`, key: 'preload_success', life:1000});
        },
        error: (error) => {
        }
      });       
    }
    else {
      this.ventasBaseService.GetExcelTabla(this.tablaData, 0).subscribe({
        next: (Respuesta: any) => {
          Swal.close();

          this.DownloadFile(Respuesta, "ventas_reporte_tabla_" + formatDate(new Date(), 'yyyy-MM-dd_hh:mm:ss', 'en') + ".xlsx");
          this.messageService.add({severity: 'success', summary: 'Excel generado', detail: `El archivo se ha generado correctamente`, key: 'preload_success', life:1000});
        },
        error: (error) => {
        }
      });       
    }
  }

  /**
   * Acción: Descarga el excel enviado por el servidor
   */  
  public DownloadFile(data: any, archivo: any) {
    var blob = new Blob([data], { type: 'application/octet-stream' });
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.target = '_blank';
    downloadLink.setAttribute('download', archivo);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }  
}