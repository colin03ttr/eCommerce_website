import { Component, OnDestroy, OnInit, inject} from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MenuNavBarComponent } from "./menu-nav-bar/menu-nav-bar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuNavBarComponent, FormsModule, ReactiveFormsModule, CommonModule, NgIf],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ecommerce_webapp';
  constructor(private router: Router) {
    console.log('AppComponent.constructor()');
  }
  ngOnDestroy(): void {
    console.log('AppComponent.ngOnDestroy()');
  }
  ngOnInit(): void {
    console.log('AppComponent.ngOnInit()');
  }
  
}
