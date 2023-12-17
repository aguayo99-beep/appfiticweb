import { authGuardAdmin } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { ManagementGymclassComponent } from './components/management-gymclass/management-gymclass.component';
import { ManagementClientComponent } from './components/management-client/management-client.component';
import { ManagementGymclassReservationComponent } from './components/management-reservations/management-reservations.component';
import { PanelAdminComponent } from './components/panel-admin/panel-admin.component';



const routes: Routes = [
  { path: '', redirectTo: '/authentication', pathMatch: 'full' },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'admin', component: PanelAdminComponent, canActivate: [authGuardAdmin] }, 

];


/**
 * Routes for the admin section of the application.
 */
const adminRoutes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
 
  { path: 'admin/gestion-clases', component: ManagementGymclassComponent },
  { path: 'admin/gestion-clientes', component: ManagementClientComponent },
  { path: 'admin/gestion-reservas', component: ManagementGymclassReservationComponent }


];
@NgModule({
  imports: [RouterModule.forRoot(routes),RouterModule.forRoot(adminRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
