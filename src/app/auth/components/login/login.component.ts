import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginRequest, Empresa } from '../../interfaces/login';

import { TokenService } from '../../services/token.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApiLoginService } from '../../services/api-login.service';
import { TokenResponse } from '../../interfaces/token-response';

import { AppService } from './../../../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent  {
  public cboEmpresaData: Empresa[] = [];
  public awaitingRequest: boolean = false;

  public formLogin: FormGroup = this.fb.group({
    cboEmpresa: [null, Validators.required],
    txtUsuario: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    txtPassword: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])]
  });





  public loginRequest: LoginRequest = <LoginRequest>{};

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private router: Router,
    private LoginService: ApiLoginService
    ) {
      this.cboEmpresaData.push({id: "CFA", nombre:"Cofiasa"});
      this.cboEmpresaData.push({id: "PDA", nombre:"Pradesa"});
      this.formLogin.controls["cboEmpresa"].setValue({id: "CFA", nombre:"Cofiasa"});

      let isLoggedIn: boolean = this.tokenService.isLoggedIn();

      if (isLoggedIn) {
        this.router.navigate(['main/dashboard']);
      }
  }

  ValidaAcceso(): void {
    this.awaitingRequest = true;
    this.loginRequest.UserName = this.formLogin.controls["txtUsuario"].value;
    this.loginRequest.Password = this.formLogin.controls["txtPassword"].value;
    this.loginRequest.Empresa = this.formLogin.controls["cboEmpresa"].value.id;

    this.LoginService.postLogin(this.loginRequest).subscribe({
      next: (Respuesta: TokenResponse[]) => {
        this.tokenService.saveSession(Respuesta);
        //this.appService.templateLoginState = true;
        window.location.reload();
        //window.location.reload();
        //this.router.navigate(['/main/dashboard']);
      },
      error: () => {
        this.awaitingRequest = false;
      }
    });    
    
/*     this.LoginService.postLogin(this.loginRequest).subscribe(respuesta => {
      if (respuesta.userId != null){
        this.tokenService.saveSession(respuesta);
        this.isLoggedIn = true;
        this.reloadPage();
      }
      else{
        this.error.error = respuesta.accessToken;
        this.isLoggedIn = false;
      }
    }); */
  }

  get form(){
    return this.formLogin.controls;
  }   
}