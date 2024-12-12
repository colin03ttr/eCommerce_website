import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgbDropdown, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, FontAwesomeModule],
  templateUrl: './menu-nav-bar.component.html',
  styleUrl: './menu-nav-bar.component.css'
})
export class MenuNavBarComponent implements OnInit, OnDestroy {
  faHome = faHome;
  constructor() {
    console.log('MenuNavBarComponent.constructor()');
  }
  ngOnDestroy(): void {
    console.log('MenuNavBarComponent.ngOnDestroy()');
  }
  ngOnInit(): void {
    console.log('MenuNavBarComponent.ngOnInit()');
  }
}