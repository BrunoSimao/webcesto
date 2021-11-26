import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/AuthGuard';

import { LoginComponent } from '../../pages/login//component/login.component';
import { RegisterComponent } from '../../pages/register/register.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent,  pathMatch: 'full', },
    { path: 'register',       component: RegisterComponent,  canActivate: [AuthGuard] }
];
