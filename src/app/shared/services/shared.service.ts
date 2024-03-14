import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  /**
   * Acción: Modal para esperar información del servidor
   */
  public SwalModalAwaitServer(){
    Swal.fire({
      html:`<h2 class='p-2 d-inline-flex'>
              <i class='fa-solid fa-spinner fa-spin' style='color:#696cff !important;'></i>
            </h2>
            <div class='p-2 d-inline-flex fuente-16' style='color:#696cff !important;'>Obteniendo información del servidor...</div>`,
      customClass:{
        popup:"sweet-alert-custom-info"
      },
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false
    });   
  }
}
