import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { END_POINT_PERMISOS } from '../constants/api-permisos.routes';
import { iAplicacionPermisos, iAplicacionRoles, iUsuarioInformacion, iUsuarioPermisosGuardar } from '../interfaces/permisos.interface';
import { iCatalogoIdCadena } from 'src/app/shared/interfaces/shared';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(private http:HttpClient) { }

  /**
   * Accion: Obtiene relación de usuarios de acuerdo al patron de busqueda
   */
  public GetUsuarioAplicaciones(patronBusqueda: string): Observable<iUsuarioInformacion[]>{
    return this.http.get<iUsuarioInformacion[]>(END_POINT_PERMISOS.READ.USUARIOAPLICACIONES + `?patronBusqueda=${patronBusqueda}`);
  }

  /**
   * Accion: Obtiene los los permisos de la aplicación asociada al usuario
   */
  public GetUsuarioAplicacionPermisos(IdUsuario: string, IdAplicacion: string): Observable<iAplicacionPermisos[]>{
    return this.http.get<iAplicacionPermisos[]>(END_POINT_PERMISOS.READ.USUARIOAPLICACIONPERMISOS + `?IdUsuario=${IdUsuario}&IdAplicacion=${IdAplicacion}`);
  }

  /**
   * Accion: Obtiene la relación de aplicaciones que no tiene asignadas el usuario seleccoinado
   */
  public GetAplicaciones(IdUsuario: string): Observable<iCatalogoIdCadena[]>{
    return this.http.get<iCatalogoIdCadena[]>(END_POINT_PERMISOS.READ.USUARIOAPLICACIONESNOASIGNADAS + `?IdUsuario=${IdUsuario}`);
  }  

  /**
   * Accion: Obtiene la relación de aplicaciones que no tiene asignadas el usuario seleccoinado
   */
  public GetAplicacionArbolPermisos(IdAplicacion: string): Observable<iAplicacionPermisos[]>{
    return this.http.get<iAplicacionPermisos[]>(END_POINT_PERMISOS.READ.APLICACIONARBOLPERMISOS + `?IdAplicacion=${IdAplicacion}`);
  }  

  /**
   * Accion: Obtiene los roles de la aplicación seleccionada
   */
  public GetAplicacionRoles(IdAplicacion: string): Observable<iAplicacionRoles[]>{
    return this.http.get<iAplicacionRoles[]>(END_POINT_PERMISOS.READ.APLICACIONROLES + `?IdAplicacion=${IdAplicacion}`);
  }  

  /**
   * Accion: Actualiza los permisos de la aplicacion asociada al usuario
   */
  public PostGuardarAplicacionesOpciones(data: iUsuarioPermisosGuardar): Observable<boolean>{
    return this.http.post<boolean>(END_POINT_PERMISOS.CREATE.GUARDARAPLICACIONESOPCIONES, data);
  }

}