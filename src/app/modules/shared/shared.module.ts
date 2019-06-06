import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CamelcasePipe } from '../pipes/camelcase.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    CamelcasePipe
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    CamelcasePipe
  ]
})
export class SharedModule { }
