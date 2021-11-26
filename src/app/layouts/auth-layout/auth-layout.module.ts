import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';


import { RegisterComponent } from '../../pages/register/register.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {RatingModule} from 'primeng/rating';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import {InputNumberModule} from 'primeng/inputnumber';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    RatingModule,
    NgxUiLoaderModule,
    InputNumberModule,
    NgMultiSelectDropDownModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule
  ],
  declarations: [
    RegisterComponent
  ]
})
export class AuthLayoutModule { }
