import { Component,OnInit, OnDestroy,NgModule } from '@angular/core';
import {RouterLink, RouterModule,Router} from '@angular/router';
import {NgbTooltip} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {NgIf} from '@angular/common';
import {UserSettingsService} from '../user-settings.service';


export interface LessonPackage {
  title: string;
  description: string;
  category: string;
  level: number;
  prerequisite: string[];
  tags: string[];
  copyright: string;
}


@Component({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgbTooltip,
    FormsModule,
    NgIf,
    RouterModule,
  ],
  selector: 'app-lesson-edit-form',
  standalone: true,
  styleUrl: './lesson-edit-form.component.css',
  templateUrl: './lesson-edit-form.component.html'



})

export class LessonEditFormComponent implements OnInit, OnDestroy {
   
  
  lessonForm: FormGroup;

  constructor(formBuilder: FormBuilder,private router: Router, private userSettingsService: UserSettingsService) {
    this.lessonForm = formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category:[''],
      level:[''],
      prerequisite: [''],
      tags: [''],
      copyright: ['']
    })
    console.log('LessonEditFormComponent.constructor()');
  }

  ngOnDestroy(): void {
        console.log('LessonEditFormComponent.ngOnDestroy()');
    }

  ngOnInit(): void {
        console.log('LessonEditFormComponent.ngOnInit()');
    }
  OnSubmit() {
    if (this.lessonForm.valid) {
      const formData = this.lessonForm.value;
      console.log('form data submited',formData);

    }else {
      console.log('invalid form data submited');
    }
    // this.OnClickSubmit();
  }

  title: string ='';
  description: string='';
  category: string ='';
  level: number =1 ;
  copyright: string = '';
  prerequisite: string[]=[];
  tags: string[]=[];

  model: LessonPackage = { title: '', description: '', category: '', level:
      1, prerequisite: [], tags: [], copyright: ''};
  
  onClick() {
    this.router.navigate(['/lesson',1234]).then(() => {});
  }
  
  /* OnClickSubmit() {
    this.userSettingsService.lastLessonId = 1234;
    console.log('form values to save to server', this.model);
    this.router.navigate(['/lesson-list']).then(() => {});
  } */
}