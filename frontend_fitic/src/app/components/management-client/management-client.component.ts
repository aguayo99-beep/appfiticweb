// management-client.component.ts
import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from '../../services/User.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-management-client',
  templateUrl: './management-client.component.html',
  styleUrls: ['./management-client.component.css'], 
  
})
export class ManagementClientComponent implements OnInit, AfterViewInit {
  users: MatTableDataSource<User> = new MatTableDataSource<User>();
  usersList : User[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  displayedColumns: string[] = [ 'username','email','acciones']; 
  searchTerm: string = '';
  isEditionForm: boolean = false;
  isAddForm: boolean = false;
  selectedUser: User = new User('','', '', '', '', '',false, 0, 0);
  pageSize: number = 10; 
  pageIndex: number = 0; 
  totalUsers: number = 0;
  columnNames: { [key: string]: string } = {
   
    username: 'Nombre de usuario',
    email: 'Correo electrónico',
    acciones: 'Acciones'
  };

  constructor(private userService: UserService) {}

  
  private searchTerms = new Subject<string>();
  ngOnInit() {
    this.loadUsers();
    this.applyFilter();
    this.searchTerms.pipe(
      debounceTime(300) 
    ).subscribe((term) => {
      this.searchTerm = term;
      this.applyFilter();
    });

  }
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngAfterViewInit() {
    this.users.paginator = this.paginator;
    this.users.sort = this.sort;
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users.data = users;
      this.usersList= users;
    });
  }
  applyFilter() {
    this.users.data = this.usersList;
    this.users.filter = this.searchTerm.trim().toLowerCase();
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
  
  
  
  
 navigation () {

  console.log("Navegando");
  this.isAddForm = false;
  this.isEditionForm = false;
  this.loadUsers();
  this.applyFilter();
  this.searchTerm = "";
  this.users.paginator = this.paginator;
  this.users.sort = this.sort;

}

  addUser() {
    this.isAddForm = true;
    this.isEditionForm = false;
   
  }

  editUser(user: User) {
    this.isEditionForm = true;
    this.isAddForm = false;

    this.selectedUser = { ...user };
  }

  cancelEdit() {
    this.isEditionForm = false;
    this.selectedUser = new User('','', '', '', '', '', false,0, 0);
  }

  cancelAdd() {
    this.isAddForm = false;
  }

  saveUser(user: User) {
    this.userService.updateUserProfile(user).subscribe(() => {
      this.loadUsers();
      this.cancelEdit();
    });
  }

  deleteUser(user: User) {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${user.name} ${user.lastname}?`)) {
      this.userService.deleteAccount(user.username).subscribe(() => {
        this.loadUsers();
      });
    }
  }
}
