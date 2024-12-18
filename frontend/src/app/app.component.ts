import { Component, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuNavBarComponent } from "./menu-nav-bar/menu-nav-bar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuNavBarComponent, FormsModule, ReactiveFormsModule],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ecommerce_webapp';
  constructor() {
    console.log('AppComponent.constructor()');
  }
  ngOnDestroy(): void {
    console.log('AppComponent.ngOnDestroy()');
  }
  ngOnInit(): void {
    
    
    console.log('AppComponent.ngOnInit()');
    
    
  }
  
}
