import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/material';
import {trigger, state, transition, style, animate} from "@angular/animations"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  squareState : string;
  private darkTheme = false;
  constructor(private oc: OverlayContainer){

  }
  switchTheme(dark : boolean){
    this.darkTheme = dark;
    this.oc.themeClass = dark? 'myapp-dark-theme' : null;
  }
  
}
