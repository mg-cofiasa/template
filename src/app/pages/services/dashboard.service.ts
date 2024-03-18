import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { iMeta, iTarea } from '../interfaces/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private api: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Accion: 
   */
  public GetMetas(): Observable<any[]>{
    return this.http.get<any[]>(this.api + `Meta/GetMetas`);
  }  

  /**
   * Accion: 
   */
  public PostMeta(data: iMeta): Observable<any[]>{
    return this.http.post<any[]>(this.api + `Meta/PostMeta`, data);
  }  

  /**
   * Accion: 
   */
  public PutMeta(data: iMeta): Observable<any[]>{
    return this.http.put<any[]>(this.api + `Meta/PutMeta`, data);
  }  

  /**
   * Accion: 
   */
  public deleteMeta(id: number): Observable<any[]>{
    return this.http.delete<any[]>(this.api + `Meta/DeleteMeta?id=${id}`);
  }  

  /**
   * Accion: 
   */
  public GetTareas(idMeta: number): Observable<any[]>{
    return this.http.get<any[]>(this.api + `Tarea/GetTareas?id=${idMeta}`);
  }

  /**
   * Accion: 
   */
  public PostTarea(data: iTarea): Observable<any[]>{
    return this.http.post<any[]>(this.api + `Tarea/PostTarea`, data);
  }    

  /**
   * Accion: 
   */
  public PutTarea(data: iTarea): Observable<any[]>{
    return this.http.put<any[]>(this.api + `Tarea/PutTarea`, data);
  }    

  /**
   * Accion: 
   */
  public PutTareaCompletar(id: number): Observable<any[]>{
    let idItem = {
      id: id
    }
    return this.http.put<any[]>(this.api + `Tarea/PutTareaCompletar`, idItem);
  } 

  /**
   * Accion: 
   */
  public deleteTarea(id: number): Observable<any[]>{
    return this.http.delete<any[]>(this.api + `Tarea/DeleteTarea?id=${id}`);
  }    
}
