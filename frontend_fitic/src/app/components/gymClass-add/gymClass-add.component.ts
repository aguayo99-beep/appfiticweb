import { UserService } from './../../services/User.service';
import { GymClassService } from './../../services/GymClassService';
import { GymClass } from './../../models/GymClass';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/AuthService';

@Component({
  selector: 'app-gymClass-add',
  templateUrl: './gymClass-add.component.html',
  styleUrls: ['./gymClass-add.component.css']
})



export class GymClassAddComponent implements OnInit {
  gymClass: GymClass = new GymClass('','', '',  '', 0,''); 
  error : string = "";
  users : User[] = [];
  selectedInstructor: string = "";

  @Output() onCancel = new EventEmitter<void>();
  
  ngOnInit(){
    this.loadInstructors();
  }

  constructor(private authService: AuthService, private gymClassService : GymClassService, private userService: UserService ) { }

  loadInstructors() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users.filter(user => user.isAdmin === true);
    });
  }

  cancel() {
    this.onCancel.emit();
  }

  addGymClass() {
    this.gymClass.instructor = this.selectedInstructor;
    if (this.gymClass.name == '' || this.gymClass.description == '' ||   this.gymClass.instructor == '' || this.gymClass.maxParticipants == 0 || this.gymClass.reservationDate == '') {
      console.log("Validando campos vacios: ", this.gymClass);
      this.error = 'No puede haber campos vacios';
      setTimeout(() => {
        this.error = ''; 
      }, 1000);
      return;
    }

    this.gymClassService.addGymClass(this.gymClass).subscribe(
      (data) => {
        console.log('Registro exitoso:', data);
        this.cancel();
      },
      (error) => {
        console.error('Error durante el registro:', error);
        this.error = error.error.error;
        setTimeout(() => {
          this.error = '';
        }, 1000);


      }
    );
  }



}
