import { MatTableDataSource } from '@angular/material/table';
import { GymClassReservation } from '../../models/ClassReservation';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';// user-edit.component.ts
import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { InvoiceUser } from 'src/app/models/InvoiceUser';
import { User } from 'src/app/models/User';
import { InvoiceUserService } from 'src/app/services/InvoiceUser.service';
import { GymClassReservationService } from '../../services/ClassReservationService';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/services/User.service';


@Component({
  selector: 'app-user-mangement',
  templateUrl: './user-mangement.component.html',
  styleUrls: ['./user-mangement.component.css']
})
export class UserMangementComponent implements OnInit {
  @Input() user: User = new User('', '', '', '', '', '', false, 0, 0);
  displayedColumnsInvoices: string[] = ['membership', 'state', 'dateIssue', 'price'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columnNamesInvoices: { [key: string]: string } = {
    membership: 'Membresia',
    state: 'Estado',
    dateIssue: 'Fecha de emision',

    price: 'Precio'
  };



  invoices: MatTableDataSource<InvoiceUser> = new MatTableDataSource<InvoiceUser>();
  gymClassReservations: MatTableDataSource<GymClassReservation> = new MatTableDataSource<GymClassReservation>();
  displayedColumnsReservations: string[] = ['instructorName', 'userName', 'gymClassName', 'gymClassDate'];
  columnNamesReservations: { [key: string]: string } = {
    instructorName: 'Instructor',
    userName: 'Usuario',
    gymClassName: 'Clase',
    gymClassDate: 'Fecha de la clase',


  };
  invoicesTest: InvoiceUser[] = [];

  @Output() onSave = new EventEmitter<User>();
  @Output() onCancel = new EventEmitter<void>();
  constructor(private invoiceUserService: InvoiceUserService, private gymClassReservationService: GymClassReservationService, private userService: UserService) { }

  ngOnInit() {
    console.log(this.user);
    this.user.password = '';

    this.loadInvoices(this.user._id);
    this.loadGymClassesReservations(this.user._id);
  }

  save() {
    this.onSave.emit(this.user);
  }

  cancel() {
    this.onCancel.emit();
  }
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }




  loadInvoices(clientId: string) {

    this.invoiceUserService.getUserInvoices(clientId).subscribe(
      (data) => {

        this.invoices.data = data;
        this.invoicesTest = data;

        this.invoicesTest.forEach(invoice => {
          invoice.dateIssue = this.formatDate(invoice.dateIssue);
          if (invoice.state == 'notpayed') {

            invoice.state = "Pendiente";
          }
          else {
            invoice.state = "Pagado";
          }
        }
        );


        console.log('Facturas del cliente:', this.invoicesTest);
      },
      (error) => {
        console.error('Error al obtener las facturas:', error);
      }
    );
  }

  loadGymClassesReservations(clientId: string) {
    this.gymClassReservationService.getGymClassById(clientId).subscribe((gymClassesReservations: GymClassReservation[]) => {

      console.log(this.invoices);
      this.gymClassReservations.data = gymClassesReservations;
      console.log('Reservas del cliente:', this.gymClassReservations);

      this.gymClassReservations.data.forEach(reservation => {
        reservation.gymClassDate = this.formatDate(reservation.gymClassDate);

      }
      );

    });
  }

}