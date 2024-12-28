import { Routes } from '@angular/router';
import { UsersListPageComponent } from './users-list-page/users-list-page.component';
import {LoginPageComponent } from './login-page/login-page.component';
import {RegisterPageComponent } from './register-page/register-page.component';
import { LoginOrRegisterComponent } from './login-or-register/login-or-register.component';
import { ProductPageComponent } from './products/products.component';
import { ProductDetailsComponent } from './detailed-product/detailed-product.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfilePageComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';


export const routes: Routes = [
    {path: 'users', component: UsersListPageComponent},
    {path: 'login-page', component: LoginPageComponent},
    {path: 'register-page', component: RegisterPageComponent},
    {path: 'login-or-register', component: LoginOrRegisterComponent },
    {path: 'products', component: ProductPageComponent },
    {path: 'detailed-product/:id', component: ProductDetailsComponent },
    {path: 'home', component: HomepageComponent },
    {path: '', component: AppComponent},
    {path: 'profile/:id', component: ProfilePageComponent },
];
