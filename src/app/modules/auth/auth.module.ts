import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatSnackBarModule } from '@angular/material';


@NgModule({
  declarations: [
    RegisterComponent, LoginComponent, LandingComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule, HttpClientModule, MatSnackBarModule,
    AuthRoutingModule
  ],
  exports: [
    LandingComponent
  ]
})
export class AuthModule { }
