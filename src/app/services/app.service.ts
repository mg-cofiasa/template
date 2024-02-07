import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})

export class AppService{
  private templateLogin = new BehaviorSubject<boolean>(true);
  public getTemplateLogin$: Observable<boolean> = this.templateLogin.asObservable();

  constructor(){}

  get templateLoginState(): Observable<boolean> {
    return this.getTemplateLogin$;
  }

  set templateLoginState(state: boolean){
    this.templateLogin.next(state);
  }
}