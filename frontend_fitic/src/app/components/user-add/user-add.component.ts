import { Component, EventEmitter, Output } from '@angular/core';
import { User } from 'src/app/models/User';
import { InvoiceUser } from 'src/app/models/InvoiceUser';
import { AuthService } from 'src/app/services/AuthService';
import { InvoiceUserService } from 'src/app/services/InvoiceUser.service';


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent  {
  user: User = new User('','','','','','',false,0,0); 
  error: string = '';
  
  @Output() onCancel = new EventEmitter<void>();
  isRepeatUserName: boolean = false;
  isRepeatEmail: boolean = false;
  

  constructor(private authService: AuthService, private invoiceUserService: InvoiceUserService) { }

  

  register() {

    if (this.user.username == '' || this.user.password == '' || this.user.email == '' || this.user.name == '' || this.user.lastname == '') {
      this.error = 'No puede haber campos vacios';
      setTimeout(() => {
        this.error = '';
      }, 1000);
      return;
    }

    if (!this.user.email.includes('@')) {
      this.error = 'El correo electrónico debe tener un formato válido';
      setTimeout(() => {
        this.error = ''; 
      }, 1000);
      return;
    }


    this.authService.register(this.user).subscribe(
      (data) => {
        console.log('Registro exitoso:', data);
        //this.isReservationAdd = true;
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

  checkEmailExists(email: string) {
    this.authService.checkEmailExists(email).subscribe(
      response => {
        this.isRepeatEmail = response.exists;
      },
      error => {
        console.error('Error al verificar el correo electrónico', error);
      }
    );
  }



  checkUsernameExists(username: string) {
    this.authService.checkUsernameExists(username).subscribe(
      response => {
        this.isRepeatUserName = response.exists;
      },
      error => {
        console.error('Error al verificar el nombre de usuario', error);
      }
    );
  }

  cancel() {
    this.onCancel.emit();
  }

}
