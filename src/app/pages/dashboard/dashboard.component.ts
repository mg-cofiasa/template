import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

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
  public tareaSeleccionada: boolean = false;
  public tareaSeleccionada2: boolean = true;

  public metasLista: any[] = [
    {
      Id: 1,
      Nombre: 'Meta 1',
      Fecha: '2024-02-03'
    },
    {
      Id: 2,
      Nombre: 'Meta 2',
      Fecha: '2024-02-04'
    }   
  ];

  public tareasLista: any[] = [
    {
      Id: 1,
      IdMeta: 1,
      Nombre: 'Tarea 1',
      Fecha: '2024-02-03',
      Estatus: 'Completada'
    },
    {
      Id: 2,
      IdMeta: 2,
      Nombre: 'Tarea 2',
      Fecha: '2024-02-04',
      Estatus: 'Abierta'      
    }   
  ];
  

  public formMeta: FormGroup = this.fb.group({
    txtMeta: ['', Validators.required],
  });
  
  public formTarea: FormGroup = this.fb.group({
    txtTarea: ['', Validators.required],
  });

  public formGroup!: FormGroup;

  constructor(
    private fb:FormBuilder
    ){
      this.formGroup = new FormGroup({
        selectedCategory: new FormControl()
    });
  }

  public AgregarEditarMeta(tipoAccion: string, idMeta: number){
    this.metaDialog = true;

    if (tipoAccion === "agregar"){
      this.tituloDialogMeta = "Agregar nueva meta";
    }
    else{
      this.tituloDialogMeta = "Editar meta";
      let editar = this.metasLista.filter((item: any) => item.Id === idMeta );

      if (editar.length > 0){
        this.formMeta.controls["txtMeta"].patchValue(editar[0].Nombre);
      }
    }
  }

  public AgregarEditarTarea(tipoAccion: string, idTarea: number, idMeta: any){
    this.metaDialog = true;

    if (tipoAccion === "agregar"){
      this.tituloDialogMeta = "Agregar tarea";
    }
    else{
      this.tituloDialogMeta = "Editar tarea";
      let editar = this.tareasLista.filter((item: any) => item.Id === idMeta );

      if (editar.length > 0){
        this.formMeta.controls["txtTarea"].patchValue(editar[0].Nombre);
      }
    }
  }

  public EliminarMeta(idMeta: number){

  }
}