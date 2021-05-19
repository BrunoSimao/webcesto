import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import {LoginComponent} from './pages/login/login.component';
import { CadastroParceiroComponent } from './pages/cadastro-parceiro/cadastro-parceiro.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CadastroEstabelecimentoComponent } from './pages/cadastro-estabelecimento/cadastro-estabelecimento.component';
import { EnderecoEstabelecimentoComponent } from './pages/endereco-estabelecimento/endereco-estabelecimento.component';
import { CadastroContaComponent } from './pages/cadastro-conta/cadastro-conta.component';
import { ResetSenhaComponent } from './pages/reset-senha/reset-senha.component';
import { ValidaResetSenhaComponent } from './pages/valida-reset-senha/valida-reset-senha.component';
import { ModalDetalhePedidoComponent } from './pages/modal/modal-detalhe-pedido.component';
import { PoliticaPrivacidadeComponent } from './pages/politica-privacidade/politica-privacidade.component';
import { CardapioComponent } from './pages/cardapio/cardapio.component';
import { DetalheCardapioComponent } from './pages/detalhe-cardapio/detalhe-cardapio.component';

const routes: Routes =[
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  }, {
    path: 'dashboard',
    component: DashboardComponent,
  },{
    path: 'cadastro-parceiro',
    component: CadastroParceiroComponent,
   // pathMatch: 'full',
  }, {
    path: 'cadastro-estabelecimento',
    component: CadastroEstabelecimentoComponent,
   // pathMatch: 'full',
  },{
    path: 'endereco-estabelecimento',
    component: EnderecoEstabelecimentoComponent,
   // pathMatch: 'full',
  },{
    path: 'cadastro-conta',
    component: CadastroContaComponent,
   // pathMatch: 'full',
  },{
    path: 'reset-senha',
    component: ResetSenhaComponent,
  }, {
    path: 'valida-reset-senha',
    component: ValidaResetSenhaComponent,
  },
  {
    path: 'modal-detalhe-pedido',
    component: ModalDetalhePedidoComponent,
  }, {
    path: 'politica-privacidade',
    component: PoliticaPrivacidadeComponent,
  }, {
    path: 'cardapio',
    component: CardapioComponent,
  },  {
    path: 'detalhe-cardapio',
    component: DetalheCardapioComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
