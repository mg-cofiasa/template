import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DashboardService } from '../services/dashboard.service';
import { iMeta, iTarea } from '../interfaces/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public tituloDialogMeta: string = "Agregar nueva meta";
  public tituloDialogTarea: string = "Agregar nueva tarea";
  public metaDialog: boolean = false;
  public tareaDialog: boolean = false;
  public metaSeleccionada: any;
  public tareaSeleccionada: any;
  public agregarEditarMeta: string =  "agregar";
  public agregarEditarTarea: string =  "agregar";

  public metasLista: any[] = [];

  public tareasLista: any[] = [];
  

  public formMeta: FormGroup = this.fb.group({
    txtMeta: ['', [Validators.required, Validators.maxLength(80)]],
  });
  
  public formTarea: FormGroup = this.fb.group({
    txtTarea: ['', [Validators.required, Validators.maxLength(80)]],
  });

  public formGroup!: FormGroup;

  constructor(
    private fb:FormBuilder,
    private dashboardService: DashboardService
    ){
      this.GetMetas();
  }

  public AgregarEditarMeta(tipoAccion: string, idMeta: number){
    this.metaDialog = true;

    if (tipoAccion === "agregar"){
      this.formMeta.reset();
      this.tituloDialogMeta = "Agregar nueva meta";
      this.agregarEditarMeta = "agregar";
    }
    else{
      this.tituloDialogMeta = "Editar meta";
      this.agregarEditarMeta = "editar";

      let editar = this.metasLista.filter((item: any) => item.id === idMeta );
      if (editar.length > 0){
        this.formMeta.controls["txtMeta"].patchValue(editar[0].nombre);
      }
    }
  }


  public GetMetas(){
    this.dashboardService.GetMetas().subscribe({
      next: (data: any[]) => {
        this.metasLista = data;

        this.metasLista.map((item: any) => {
          item.barra = (item.concluidos / item.total) * 100;
        })
      },
      error: (error) => {
      
      }
    });
  }

  public PostMeta(){
    if (this.agregarEditarMeta === "agregar"){
      let data: iMeta = {
        idMeta: 0,
        fechaCreacion: new Date(),
        nombre: this.formMeta.controls["txtMeta"].value
      };
  
      this.dashboardService.PostMeta(data).subscribe({
        next: (data: any) =>{
          this.metaDialog = false;
          this.GetMetas();
        },
        error:(error) =>{
        
        }
      });
    }
    else{
      let data: iMeta = {
        idMeta: this.metaSeleccionada.id,
        fechaCreacion: new Date(),
        nombre: this.formMeta.controls["txtMeta"].value
      };
  
      this.dashboardService.PutMeta(data).subscribe({
        next: (data: any) =>{
          this.metaDialog = false;
          this.GetMetas();
        },
        error:(error) =>{
        
        }
      });    
    }
  }

  public DeleteMeta(id: number){

    this.dashboardService.deleteMeta(id).subscribe({
      next: (data: any[]) => {
        this.GetMetas();
      },
      error: (error) => {
      
      }
    });
  }  

  public AgregarEditarTarea(tipoAccion: string, idTarea: number, idMeta: any){
    this.tareaDialog = true;
    this.formTarea.reset();

    if (tipoAccion === "agregar"){
      this.tituloDialogTarea = "Agregar tarea";
      this.agregarEditarTarea = "agregar";
    }
    else{
      this.tituloDialogTarea = "Editar tarea";
      this.agregarEditarTarea = "editar";
      let editar = this.tareasLista.filter((item: any) => item.idTarea === idTarea );

      if (editar.length > 0){
        this.formTarea.controls["txtTarea"].patchValue(editar[0].nombre);
      }
    }
  }

  public SeleccionOpt(opt: any){
    this.tareaSeleccionada = opt;
  }


  public GetTareas(){
    this.tareasLista = [];
    this.dashboardService.GetTareas(this.metaSeleccionada.idMeta).subscribe({
      next: (data: any[]) => {
        this.tareasLista = data;
      },
      error: (error) => {
      
      }
    });
  }

  public PostTarea(){
    if (this.agregarEditarTarea === "agregar"){
      let data: iTarea = {
        idTarea: 0,
        idMeta: this.metaSeleccionada.idMeta,
        fechaCreacion: new Date(),
        nombre: this.formTarea.controls["txtTarea"].value,
        estatus: 'Abierta'
      };

      this.dashboardService.PostTarea(data).subscribe({
        next: (data: any) =>{
          this.tareaDialog = false;
          this.GetTareas();
        },
        error:(error) =>{
        }
      });
    }
    else{
      let data: iTarea = {
        idTarea: this.tareaSeleccionada.idTarea,
        idMeta: this.metaSeleccionada.idMeta,
        fechaCreacion: this.tareaSeleccionada.fechaCreacion,
        nombre: this.formTarea.controls["txtTarea"].value,
        estatus: this.tareaSeleccionada.estatus,
      };
  
      this.dashboardService.PutTarea(data).subscribe({
        next: (data: any) =>{
          this.tareaDialog = false;
          this.GetTareas();
        },
        error:(error) =>{
        
        }
      });    
    }
  }  

  public DeleteTarea(id: number){
    const elemento = this.tareasLista.filter((item: any)=> item.idTarea === id);

    Swal.fire({
      title: '¿Está seguro?',
      text: "Que desea eliminar el elemento " + elemento[0].nombre,
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: 'Cancelar',
      focusCancel: true,
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-2 right-gap',
        confirmButton: 'order-1',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.dashboardService.deleteTarea(id).subscribe({
          next: (data: any[]) => {
            this.GetTareas();
          },
          error: (error) => {
          
          }
        });
      } else if (result.isDenied) {
      }
    })
  }  

  public CompletarTarea(id: number){
    console.log(id)
    this.dashboardService.PutTareaCompletar(id).subscribe({
      next: (data: any) =>{
        this.tareaDialog = false;
        this.GetTareas();
        this.GetMetas();
      },
      error:(error) =>{
      }
    });
  }  
}