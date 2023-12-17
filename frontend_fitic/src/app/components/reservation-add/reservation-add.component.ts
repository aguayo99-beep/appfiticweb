import { UserService } from './../../services/User.service';
import { GymClassService } from './../../services/GymClassService';
import { GymClassReservationService } from './../../services/ClassReservationService';

import { GymClass } from './../../models/GymClass';
import { Component, EventEmitter, Output, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/AuthService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-reservation-add',
  templateUrl: './reservation-add.component.html',
  styleUrls: ['./reservation-add.component.css']
})




export class GymClassReservationAddComponent implements OnInit {
  gymClass: GymClass = new GymClass('', '', '', '', 0, '');
  gymClasses: GymClass[] = [];
  users: MatTableDataSource<User> = new MatTableDataSource<User>();
  userList: User[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  totalUsers: number = 0;
  private searchTermsUser = new Subject<string>();
  isReservationAdd: boolean = false;

  error: string = "";
  selectedUser: User = new User('', '', '', '', '', '', false, 0, 0);
  displayedColumns: string[] = ['name', 'lastname', 'acciones'];
  columnNames: { [key: string]: string } = {
    name: 'Nombre',
    lastname: 'Apellidos',

    acciones: 'Acciones',

  };

  userSelect: boolean = false;

  searchTermUser: string = '';
  pageSize: number = 10;
  pageIndex: number = 0;
  selectedGymClass: string = "";

  @Output() onCancel = new EventEmitter<void>();

  ngOnInit() {
    this.loadUsers();
    this.loadGymClasses();
    this.applyFilter();
    this.searchTermsUser.pipe(
      debounceTime(300)
    ).subscribe((term) => {
      this.searchTermUser = term;
      this.applyFilter();
    });

  }
  search(term: string): void {
    this.searchTermsUser.next(term);
    console.log("term ", term);


  }
  constructor(private authService: AuthService, private gymClassService: GymClassService, private userService: UserService, private gymClassReservationService: GymClassReservationService) { }

  ngAfterViewInit() {
    this.users.paginator = this.paginator;
    this.users.sort = this.sort;
  }

  loadGymClasses() {
    this.gymClassService.getAllGymClasses().subscribe(gymClasses => {
      console.log(gymClasses);
      this.gymClasses = gymClasses;
    });
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users.data = users;
      this.userList = users;
    });
  }

  applyFilter() {
    if (this.searchTermUser == "") {
      this.users.data = [];
    }
    else {
      this.users.data = this.userList;
    }

    if (this.userSelect) {
      this.users.data = [this.selectedUser];

      console.log("usersss", this.users.data);
    }
    else {
      this.users.data = this.userList;
    }





    this.users.filter = this.searchTermUser.trim().toLowerCase();
    this.totalUsers = this.users.filteredData.length;

    this.pageSize = Math.max(1, this.pageSize);

    let startIndex = this.pageIndex * this.pageSize;

    if (startIndex >= this.totalUsers) {
      startIndex = Math.max(0, this.totalUsers - this.pageSize);
      this.pageIndex = Math.floor(startIndex / this.pageSize);
    }

    const endIndex = Math.min(startIndex + this.pageSize, this.totalUsers);

    console.log(startIndex + " " + endIndex + " " + this.pageSize);
    this.users.data = this.users.filteredData.slice(startIndex, endIndex);
  }



  cancel() {
    this.onCancel.emit();
  }

  addGymClassReservation() {
    if (this.selectedGymClass == '' || this.selectedUser == null) {
      this.error = 'Es obligatorio seleccionar un usuario y una clase';
      setTimeout(() => {
        this.error = '';
      }, 1000);
      return;
    }

    console.log("Clase ENVIADO: ", this.selectedGymClass);
    console.log("usuario ENVIADO: ", this.selectedUser);
    this.gymClassReservationService.addGymClass(this.selectedGymClass, this.selectedUser._id).subscribe(
      (data) => {
        console.log('Registro exitoso:', data);
        this.isReservationAdd = true;
        this.cancel();
      },
      (error) => {
        console.error('Error durante el registro:', error.error.error);
        this.error = error.error.error;
        setTimeout(() => {
          this.error = '';
        }, 1000);
      }
    );
  }


  selectUser(user: User) {
    this.selectedUser = user;
    if (!this.userSelect) {
      this.userSelect = true;
    }
    else {
      this.userSelect = false;
    }
    this.applyFilter();
    console.log("usuario seleccionado", this.selectedUser);
  }



}
