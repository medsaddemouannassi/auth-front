import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './components/admin/admin.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {Error403Component} from './components/error403/error403.component';
import {Error404Component} from './components/error404/error404.component';
import {AuthenticationGuard} from "./helpers/authentication.guard";
import {RoleGuard} from "./helpers/role.guard";
import {HomeComponent} from "./components/home/home.component";
import {AuthGuard} from "./helpers/auth.guard";
import {ReservationsComponent} from "./components/reservations/reservations.component";

const routes: Routes = [
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {
    path: '', component: AdminComponent, children: [
      {path: 'index', component: HomeComponent}
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthenticationGuard, RoleGuard],
    data: {role: 'ADMIN'},
    children: [
      {path: 'allreservation', component: ReservationsComponent},
    ]
  },
  {path: 'page-register', component: RegisterComponent, canActivate:  [AuthGuard]},
  {path: 'page-login', component: LoginComponent, canActivate:  [AuthGuard]},
  {path: 'page-error-403', component: Error403Component},
  {path: 'page-error-404', component: Error404Component},
  {path: '**', component: Error404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
