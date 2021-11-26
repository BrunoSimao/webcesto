import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/component/user-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {RatingModule} from 'primeng/rating';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
// import { ToastrModule } from 'ngx-toastr';

import {AvatarModule} from 'primeng/avatar';
import {PasswordModule} from 'primeng/password';
import {DialogModule} from 'primeng/dialog';
import {ToolbarModule} from 'primeng/toolbar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputMaskModule} from 'primeng/inputmask';
import {MultiSelectModule} from 'primeng/multiselect';
import {ChartModule} from 'primeng/chart';
import { MeusDadosComponent } from 'src/app/pages/meus-dados/meus-dados.component';
import { AlterarCadastroEstComponent } from 'src/app/pages/alterar-dados-restaurante/component/alterar-cadastro-estabelecimento.component';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AlterarDadosBancarioComponent } from 'src/app/pages/alterar-dados-bancario/component/alterar-dados-bancario.component';
import { CadastroCardapioComponent } from 'src/app/pages/cadastro-cardapio/component/cadastro-cardapio.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    TableModule,
    ButtonModule,
    NgxUiLoaderModule,
    ChartModule,
    RatingModule,
    FileUploadModule,
    InputSwitchModule,
    DropdownModule,
    MultiSelectModule,
    RadioButtonModule,
    InputMaskModule,
    ToolbarModule,
    DialogModule,
    AvatarModule,
    PasswordModule,
    Ng2SearchPipeModule,
    SelectButtonModule,
    InputNumberModule,
    ClipboardModule,
    NgMultiSelectDropDownModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    AlterarCadastroEstComponent,
    AlterarDadosBancarioComponent,
    MeusDadosComponent,
    IconsComponent,
    CadastroCardapioComponent,
    MapsComponent
    
  ]
})

export class AdminLayoutModule {}
