import { Routes } from '@angular/router';
import { LessonEditFormComponent } from './lesson-edit-form/lesson-edit-form.component';
import { LessonListPageComponent } from './lesson-list-page/lesson-list-page.component';
import { LessonDetailPageComponent } from './lesson-detail-page/lesson-detail-page.component';
import { TestPage1Component } from './test-page1/test-page1.component';
import { LessonSearchPageComponent } from './lesson-search-page/lesson-search-page.component';
import { LearningpackageListPageComponent } from './learningpackage-list-page/learningpackage-list-page.component';
import { UsersListPageComponent } from './users-list-page/users-list-page.component';
import {LoginPageComponent } from './login-page/login-page.component';
import {RegisterPageComponent } from './register-page/register-page.component';
import { LoginOrRegisterComponent } from './login-or-register/login-or-register.component';
import { ProductPageComponent } from './products/products.component';
import { ProductDetailsComponent } from './detailed-product/detailed-product.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfilePageComponent } from './profile/profile.component';
import { prefix } from '@fortawesome/free-solid-svg-icons';

export const routes: Routes = [
    {path: 'lesson-edit-form', component: LessonEditFormComponent},
    {path: 'lesson-list', component: LessonListPageComponent},
    {path: 'lesson/:id', component: LessonDetailPageComponent},
    {path: 'test-page1', component: TestPage1Component},
    {path: 'lesson-search', component: LessonSearchPageComponent},
    {path:'learningpackage', component: LearningpackageListPageComponent},
    {path: 'users', component: UsersListPageComponent},
    {path: 'login-page', component: LoginPageComponent},
    {path: 'register-page', component: RegisterPageComponent},
    {path: 'login-or-register', component: LoginOrRegisterComponent },
    {path: 'products', component: ProductPageComponent },
    {path: 'detailed-product/:id', component: ProductDetailsComponent },
    {path: '', component: HomepageComponent},
    {path: 'profile', component: ProfilePageComponent },
];
