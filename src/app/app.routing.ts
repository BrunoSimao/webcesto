import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import {LoginComponent} from './pages/login/component/login.component';
import { CadastroParceiroComponent } from './pages/cadastro-parceiro/component/cadastro-parceiro.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CadastroEstabelecimentoComponent } from './pages/cadastro-estabelecimento/component/cadastro-estabelecimento.component';
import { EnderecoEstabelecimentoComponent } from './pages/endereco-estabelecimento/component/endereco-estabelecimento.component';
import { CadastroContaComponent } from './pages/cadastro-conta/component/cadastro-conta.component';
import { ResetSenhaComponent } from './pages/reset-senha/component/reset-senha.component';
import { ValidaResetSenhaComponent } from './pages/valida-reset-senha/component/valida-reset-senha.component';
import { ModalDetalhePedidoComponent } from './pages/modal/modal-detalhe-pedido.component';
import { PoliticaPrivacidadeComponent } from './pages/politica-privacidade/politica-privacidade.component';
import { CardapioComponent } from './pages/cardapio/component/cardapio.component';
import { DetalheCardapioComponent } from './pages/detalhe-cardapio/component/detalhe-cardapio.component';
import { AuthGuard } from './AuthGuard';
import { CadastroCardapioComponent } from './pages/cadastro-cardapio/component/cadastro-cardapio.component';
import { MeusDadosComponent } from './pages/meus-dados/meus-dados.component';
import { AlterarCadastroEstComponent } from './pages/alterar-dados-restaurante/component/alterar-cadastro-estabelecimento.component';
import { AlterarEnderecoEstComponent } from './pages/alterar-endereco-estabelecimento/component/alterar-endereco-estabelecimento.component';
import { AlterarDadosBancarioComponent } from './pages/alterar-dados-bancario/component/alterar-dados-bancario.component';

const routes: Routes =[
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  {
    path: 'login',
    component: LoginComponent
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
    canActivate: [AuthGuard]
  },{
    path: 'cadastro-parceiro',
    component: CadastroParceiroComponent
   
   // pathMatch: 'full',
  }, {
    path: 'cadastro-estabelecimento',
    component: CadastroEstabelecimentoComponent
   
   // pathMatch: 'full',
  },{
    path: 'endereco-estabelecimento',
    component: EnderecoEstabelecimentoComponent
   
   // pathMatch: 'full',
  },{
    path: 'cadastro-conta',
    component: CadastroContaComponent
   
   // pathMatch: 'full',
  },{
    path: 'reset-senha',
    component: ResetSenhaComponent
    
  }, {
    path: 'valida-reset-senha',
    component: ValidaResetSenhaComponent
  
  },
  {
    path: 'modal-detalhe-pedido',
    component: ModalDetalhePedidoComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'politica-privacidade',
    component: PoliticaPrivacidadeComponent
   
  }, {
    path: 'cardapio',
    component: CardapioComponent,
    canActivate: [AuthGuard]
  },  {
    path: 'detalhe-cardapio/:id',
    component: DetalheCardapioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastro-cardapio',
    component: CadastroCardapioComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'meus-dados',
    component: MeusDadosComponent,
    canActivate: [AuthGuard]
  },  {
    path: 'alterar-cadastro-estabelecimento',
    component: AlterarCadastroEstComponent,
    canActivate: [AuthGuard]
  },  {
    path: 'alterar-endereco-estabelecimento',
    component: AlterarEnderecoEstComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'alterar-dados-bancario',
    component: AlterarDadosBancarioComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
