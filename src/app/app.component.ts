import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from './services/app.service';
import { Subscription } from 'rxjs';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  public isLoggedIn: boolean = false;

  private observableService$: Subscription = Subscription.EMPTY;

  constructor(
    private appService: AppService, 
    private router: Router
  ){
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}