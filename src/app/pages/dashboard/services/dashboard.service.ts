import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { END_POINT_DASHBOARD } from '../constants/api-dashboard';
import { iSucursalesUbicacion, iZonaPlazaSucursales } from '../interfaces/dashboard.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  /**
   * Accion: Obtiene los catalogos y permisos del usuario
   */
  public GetSucursalesUbicacion(): Observable<iZonaPlazaSucursales>{
    return this.http.get<iZonaPlazaSucursales>(END_POINT_DASHBOARD.READ.SUCURSALESUBICACION);
  }
}