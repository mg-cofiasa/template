import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor() {}

  public async handleError(error: HttpErrorResponse) {
    const codigosEstadoHttp: number[] = [400, 404, 415, 500];

    if (error.status === 401) { // Accion: Mensaje de error en login
      this.SweetAlertModal("Error al iniciar sesión", error.error.Title);
      return;
    }
    else if (codigosEstadoHttp.includes(error.status)) { // Accion: Mensaje de error 400
      if (error.error instanceof Blob) { // Si el error es de tipo blob, convierte a json
        const blb = new Blob([error.error], { type: 'text/plain' });
        const reader = new FileReader();

        reader.onloadend = () => {
          if (reader.result != null){
            const errors = JSON.parse(reader.result.toString());
            let message = `<div class="pt-1 pb-2">${errors.type}</div>`

            const values:any = errors.errors;
            if (values){
              if (values instanceof Array){
                values.map((value: any) => {
                  message = `${message} <div class="pt-2 small" style="text-align: center">${value}</div>`;
                });
              }
              else if(values instanceof Object){
                for(let item in values){
                  if (values[item] instanceof Array){
                    values[item].map((value: any) => {
                      message = `${message} <div class="pt-2 small" style="text-align: center">${value}</div>`;
                    });                    
                  }
                  else{
                    message = `${message} <div class="pt-2 small" style="text-align: center">${values[item]}</div>`;
                  }
                }
              }
            }

            message = `${message} <div class="pt-6 text-danger fst-italic" style="text-align: right; font-size: smaller; padding-right:4px">Error ${error.status}</div>`;
            this.SweetAlertModal(errors.title, message);            
          }
        };

        reader.readAsText(blb);
      }
      else{
        let message = `<div class="pt-2">${error.error.Type}</div>`;
  
        const values:any = error.error.Errors.ListErrors;
        if (values){
          values.map((value: any) => {
            message = `${message} <div class="pt-2 small" style="text-align: center">${value}</div>`;
          });
        }
        
        message = `${message} <div class="pt-6 text-danger fst-italic" style="text-align: right; font-size: smaller; padding-right:4px">Error ${error.status}</div>`;
        this.SweetAlertModal(error.error.Title, message);
      }      
      return;
    }
    else { // Accion: Mensaje de error no controlado
      let message = `<div class="pt-2">Se ha generado una excepción no controlada</div>`;

      let values: any = error.error;
      if (values){
        if (values.Errors){
          if (values.Errors.ListErrors){
            values = values.Errors.ListErrors;
            values.map((value: any) => {
              message = `${message} <div class="pt-2 small" style="text-align: center">${value}</div>`;
            });
          }
        }
      }
      
      message = `${message} <div class="pt-6 text-danger fst-italic" style="text-align: right; font-size: smaller; padding-right:4px">Error no controlado (${error.status})</div>`;
      this.SweetAlertModal("Error no controlado", message);
      return;    
    }
  }

  /**
   * Comentario: Sweetalert para mensajes
   */
  public SweetAlertModal(title: string, text: string){
    Swal.fire({
      icon: 'error',
      title: `<div class="swal-error">${title}</div>`,
      html: text,
      showConfirmButton: true,
      focusConfirm: false,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#f1416c',      
      heightAuto: false
    });
  }  
}