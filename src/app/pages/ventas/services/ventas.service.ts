import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { END_POINT_VENTAS_SEGMENTO } from '../constants/api-ventas.routes';
import { iArregloGraficaDatos, iEnviarDatosGrafica, iTablaVenta } from '../interfaces/ventas.interface';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http:HttpClient) { }

  /**
   * Accion: Obtiene los datos para generar las graficas del componente ventas
   */
  public GetDatosGraficas(datos: iEnviarDatosGrafica): Observable<iArregloGraficaDatos>{
    return this.http.get<iArregloGraficaDatos>(END_POINT_VENTAS_SEGMENTO.READ.DATOSVENTAS + `?periodo=${datos.Periodo || ''}&TipoLugar=${datos.TipoLugar || 'ZONA'}&LugarValor=${datos.LugarValor || ''}&segmento=${datos.Segmento || ''}&Grafica=true&categoria=0`);
  }

  /**
   * Accion: Obtiene los datos actualizados para generar las graficas del componente ventas
   */
  public GetDatosActualizadosGraficas(datos: iEnviarDatosGrafica): Observable<iArregloGraficaDatos>{
    return this.http.post<iArregloGraficaDatos>(END_POINT_VENTAS_SEGMENTO.READ.DATOSVENTASACTUALIZADOS + `?periodo=${datos.Periodo || ''}&TipoLugar=${datos.TipoLugar || 'ZONA'}&LugarValor=${datos.LugarValor || ''}&segmento=${datos.Segmento || ''}&Grafica=true&categoria=0&vtaNeta=${datos.VentaNeta}`, null);
  }

  /**
   * Accion: Obtiene los datos para generar la tabla del componente ventas
   */
  public GetDatosTabla(datos: iEnviarDatosGrafica): Observable<iTablaVenta[]>{
    return this.http.get<iTablaVenta[]>(END_POINT_VENTAS_SEGMENTO.READ.DATOSVENTAS + `?periodo=${datos.Periodo || ''}&TipoLugar=${datos.TipoLugar || 'ZONA'}&LugarValor=${datos.LugarValor || ''}&segmento=${datos.Segmento || ''}&Grafica=false&categoria=${datos.Categoria || 0}`);
  }

  /**
   * Accion: Obtiene los datos actualizados para generar la tabla del componente ventas
   */
  public GetDatosActualizadosTabla(datos: iEnviarDatosGrafica): Observable<iTablaVenta[]>{
    return this.http.post<iTablaVenta[]>(END_POINT_VENTAS_SEGMENTO.READ.DATOSVENTASACTUALIZADOS + `?periodo=${datos.Periodo || ''}&TipoLugar=${datos.TipoLugar || 'ZONA'}&LugarValor=${datos.LugarValor || ''}&segmento=${datos.Segmento || ''}&Grafica=false&categoria=${datos.Categoria || 0}&vtaNeta=${datos.VentaNeta}`, null);
  }
}