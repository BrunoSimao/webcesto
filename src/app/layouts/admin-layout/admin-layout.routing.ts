import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { PedidosComponent } from '../../pages/pedidos/component/pedidos.component';
import {CardapioComponent} from '../../pages/cardapio/component/cardapio.component';
import { AuthGuard } from 'src/app/AuthGuard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent,  canActivate: [AuthGuard] },
    { path: 'user-profile',   component: UserProfileComponent,  canActivate: [AuthGuard] },
    { path: 'tables',         component: PedidosComponent,  canActivate: [AuthGuard] },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'cardapio',       component: CardapioComponent,  canActivate: [AuthGuard] }
];
