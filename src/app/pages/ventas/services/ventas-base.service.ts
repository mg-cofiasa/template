import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { END_POINT_VENTAS_BASE } from '../constants/api-ventas-base.routes';
import { iArregloGraficaDatos, iTablaVentaSegmento, iUsuarioCatalogos } from '../interfaces/ventas.interface';

@Injectable({
  providedIn: 'root'
})
export class VentasBaseService {

  constructor(private http:HttpClient) { }

  /**
   * Accion: Obtiene los catalogos y permisos del usuario
   */
  public GetPermisosUsuario(usuario: string): Observable<iUsuarioCatalogos>{
    return this.http.get<iUsuarioCatalogos>(END_POINT_VENTAS_BASE.READ.USUARIOCATALOGOS + `?Usuario=${usuario}&formateado=true&mostrarTodas=false`);
  }

  /**
   * Accion: Envia datos para generar y obtener archivo de excel de las graficas
   */
  public GetExcelGraficas(datos: iArregloGraficaDatos, segmento: number): Observable<any>{
    return this.http.post(END_POINT_VENTAS_BASE.READ.GENERAREXCELGRAFICAS + `?segmento=${segmento}`, datos, { responseType: 'blob' });
  }
  
  /**
   * Accion: Envia datos para generar y obtener archivo de excel de la tabla
   */
  public GetExcelTabla(datos: any[], segmento: number): Observable<any>{
    return this.http.post(END_POINT_VENTAS_BASE.READ.GENERAREXCELTABLA + `?segmento=${segmento}`, datos, { responseType: 'blob' });
  }

  /**
   * Accion: Envia datos para generar y obtener archivo de excel de la tabla
   */
  public GenerarExcelTablaProyeccion(datos: any[], segmento: number): Observable<any>{
    return this.http.post(END_POINT_VENTAS_BASE.READ.GENERAREXCELTABLAPROYECCION + `?segmento=${segmento}`, datos, { responseType: 'blob' });
  }
}