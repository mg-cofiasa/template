import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { iArregloGraficaDatos, iEnviarDatosGrafica, iTablaVentaSegmento } from '../interfaces/ventas.interface';
import { END_POINT_VENTAS_SEGMENTO } from '../constants/api-ventas-segmento.routes';

@Injectable({
  providedIn: 'root'
})
export class VentasSegmentoService {

  constructor(private http:HttpClient) { }

  /**
   * Accion: Obtiene los datos para generar las graficas del componente ventas por segmento
   */
  public GetDatosGraficasSegmento(datos: iEnviarDatosGrafica): Observable<iArregloGraficaDatos>{
    return this.http.get<iArregloGraficaDatos>(END_POINT_VENTAS_SEGMENTO.READ.DATOSVENTAS + `?periodo=${datos.Periodo || ''}&TipoLugar=${datos.TipoLugar || 'ZONA'}&LugarValor=${datos.LugarValor || ''}&segmento=${datos.Segmento || ''}&Grafica=true&categoria=0&concepto=${datos.Concepto || ''}&proyeccion=${datos.ProyeccionUtilidad}`);
  }    

  /**
   * Accion: Obtiene los datos para generar la tabla del componente ventas por segmento
   */
  public GetDatosTablaSegmento(datos: iEnviarDatosGrafica): Observable<any[]>{
    return this.http.get<any[]>(END_POINT_VENTAS_SEGMENTO.READ.DATOSVENTAS + `?periodo=${datos.Periodo || ''}&TipoLugar=${datos.TipoLugar || 'ZONA'}&LugarValor=${datos.LugarValor || ''}&segmento=${datos.Segmento || ''}&Grafica=false&categoria=${datos.Categoria || 0}&concepto=${datos.Concepto || ''}&proyeccion=${datos.ProyeccionUtilidad}`);
  }
}