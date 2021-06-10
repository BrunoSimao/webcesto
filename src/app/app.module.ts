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

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { ToastrModule } from 'ngx-toastr';

import { LoginComponent } from './pages/login/component/login.component';
import { CadastroParceiroComponent } from './pages/cadastro-parceiro/component/cadastro-parceiro.component';
import { CadastroEstabelecimentoComponent } from './pages/cadastro-estabelecimento/component/cadastro-estabelecimento.component';

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
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    LoginComponent,
    CadastroParceiroComponent,
    CadastroEstabelecimentoComponent,
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
