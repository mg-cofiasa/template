import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { breadcrum } from '../interfaces/shared';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private opcionMenu$ = new BehaviorSubject<breadcrum>(<breadcrum>{});
  public opcionSeleccionada$: Observable<breadcrum> = this.opcionMenu$.asObservable();

  constructor() { }

  public setOpcionSeleccionada(breadcrum: breadcrum) {
    this.opcionMenu$.next(breadcrum);
  }
}
