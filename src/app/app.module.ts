import { FormsModule } from '@angular/forms';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import {InputSwitchModule} from 'primeng/inputswitch';

import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {RatingModule} from 'primeng/rating';
import { EnderecoEstabelecimentoComponent } from './pages/endereco-estabelecimento/component/endereco-estabelecimento.component';
import { PedidosComponent } from './pages/pedidos/component/pedidos.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import { DetalheCardapioComponent } from './pages/detalhe-cardapio/component/detalhe-cardapio.component';
import { AuthGuard } from './AuthGuard';
import { InputNumberModule } from 'primeng/inputnumber';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { NgxPaginationModule } from 'ngx-pagination';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { CadastroCardapioComponent } from './pages/cadastro-cardapio/component/cadastro-cardapio.component';


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
    ButtonModule,
    RatingModule,
    TableModule,
    SelectButtonModule,
    InputSwitchModule,
    InputNumberModule,
    InputTextModule,
    CheckboxModule,
    InputTextareaModule,
    CurrencyMaskModule,
    DialogModule,
    NgxPaginationModule,
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
    EnderecoEstabelecimentoComponent,
    PedidosComponent,
    AppComponent,
    DetalheCardapioComponent,
    CadastroCardapioComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
   
  ],
    
    providers: [AuthGuard],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
