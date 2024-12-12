import { Component, OnDestroy, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuNavBarComponent } from "./menu-nav-bar/menu-nav-bar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LearningpackageService } from './learningpackage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuNavBarComponent, FormsModule, ReactiveFormsModule],
  providers: [LearningpackageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'mini-site_ng18';
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
