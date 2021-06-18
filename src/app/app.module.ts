import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderModule } from "ngx-ui-loader";

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ToastrModule } from 'ngx-toastr';

import { LoginComponent } from './pages/login/component/login.component';
import { CadastroParceiroComponent } from './pages/cadastro-parceiro/component/cadastro-parceiro.component';
import { CadastroEstabelecimentoComponent } from './pages/cadastro-estabelecimento/component/cadastro-estabelecimento.component';
import { CadastroContaComponent } from './pages/cadastro-conta/component/cadastro-conta.component';
import { ResetSenhaComponent } from './pages/reset-senha/component/reset-senha.component';
import { ValidaResetSenhaComponent } from './pages/valida-reset-senha/component/valida-reset-senha.component';
import { UserService } from './app.service';


import {FileUploadModule} from 'primeng/fileupload';
import {ToastModule} from 'primeng/toast';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    NgxUiLoaderModule,
    FileUploadModule,
    DropdownModule,
    ToastModule,
    RadioButtonModule,
    AppRoutingModule,
   
    ToastrModule.forRoot()
  ],
  declarations: [
    LoginComponent,
    CadastroParceiroComponent,
    CadastroEstabelecimentoComponent,
    CadastroContaComponent,
    ResetSenhaComponent,
    ValidaResetSenhaComponent,
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
   
  ],
    
    providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
