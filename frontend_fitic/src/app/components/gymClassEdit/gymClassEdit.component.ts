import { UserService } from 'src/app/services/User.service';
import { GymClass } from './../../models/GymClass';
import { GymClassService } from './../../services/GymClassService';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-gymClassEdit',
  templateUrl: './gymClassEdit.component.html',
  styleUrls: ['./gymClassEdit.component.css']
})
export class GymClassEditComponent{

  constructor(private gymClassService : GymClassService, private userService: UserService) { }

users : User[] = [];

  @Input() gymClass: GymClass = new GymClass('','', '', '', 0,''); 
  @Output() onSave = new EventEmitter<GymClass>();
  @Output() onCancel = new EventEmitter<void>();
  minDateTime: string="";

  ngOnInit() {
    this.loadInstructors();
    this.minDateTime = this.getCurrentDateTime();
    const formattedDate = this.convertToISOFormat(this.gymClass.reservationDate);
    let localDate = formattedDate.substring(0, 16); 
   
    this.gymClass.reservationDate = localDate;
    console.log(localDate); 
  }

  getCurrentDateTime(): string {
    const now = new Date();
    return now.toISOString().substring(0, 16); 
  }

  convertToISOFormat(dateStr: string) {
    const [datePart, timePart] = dateStr.split(' ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes] = timePart.split(':').map(Number);
    
    const isoDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
    return isoDate.toISOString();
  }


  padZero(value: number): string {
    return value.toString().padStart(2, '0');
  }

  save() {
    this.onSave.emit(this.gymClass);
  }
  loadInstructors() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users.filter(user => user.isAdmin === true);
    });

    
  }

  cancel() {
    this.onCancel.emit();
  }

}


