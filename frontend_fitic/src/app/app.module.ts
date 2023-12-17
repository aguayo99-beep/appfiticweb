import { ManagementClientComponent } from './components/management-client/management-client.component';
import { ManagementGymclassComponent } from './components/management-gymclass/management-gymclass.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { HttpClientModule } from '@angular/common/http';
import { PanelAdminComponent } from './components/panel-admin/panel-admin.component';

import { NavigationComponent } from './components/navigation/navigation.component';
import { DatePipe } from '@angular/common';


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ManagementGymclassReservationComponent } from './components/management-reservations/management-reservations.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserMangementComponent } from './components/userManagement/user-mangement.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { MatTableModule } from '@angular/material/table';
import { GymClassAddComponent } from './components/gymClass-add/gymClass-add.component';
import { GymClassEditComponent } from './components/gymClassEdit/gymClassEdit.component';
import { GymClassReservationAddComponent } from './components/reservation-add/reservation-add.component';



@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    LoginComponent,
  
    PanelAdminComponent,
    NavigationComponent,
    ManagementGymclassComponent,
    ManagementClientComponent,
    ManagementGymclassReservationComponent,
    UserMangementComponent,
    UserAddComponent,
    GymClassAddComponent,
    GymClassEditComponent,
    GymClassReservationAddComponent
  ],
  imports: [
    MatPaginatorModule,
    MatSortModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule, NgbModule, BrowserAnimationsModule,MatTableModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
