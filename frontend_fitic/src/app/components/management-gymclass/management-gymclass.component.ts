import { GymClassReservation } from './../../models/ClassReservation';
import { GymClass } from './../../models/GymClass';
import { GymClassService } from './../../services/GymClassService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-management-gymclass',
  templateUrl: './management-gymclass.component.html',
  styleUrls: ['./management-gymclass.component.css']
})
export class ManagementGymclassComponent implements OnInit {
  gymClasses: MatTableDataSource<GymClass> = new MatTableDataSource<GymClass>();
  gymClassesToEdit: MatTableDataSource<GymClass> = new MatTableDataSource<GymClass>();
  gymClasesEdit: GymClass[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  gymClassList: GymClass[] = [];
  private searchTerms = new Subject<string>();

  dateReservation: Date = new Date();
  formatedDate: string = "";

  selectedGymClassEdit: GymClass = new GymClass('', '', '', '', 0, '');


  displayedColumns: string[] = ['name', 'instructor', 'reservationDate', 'acciones'];
  columnNames: { [key: string]: string } = {
    name: 'Nombre',
    instructor: 'Instructor',
    reservationDate: 'Fecha',

    acciones: 'Acciones'
  };
  error: string = "";

  searchTerm: string = '';
  isEditionForm: boolean = false;
  isAddForm: boolean = false;
  selectedGymClass: GymClass = new GymClass('', '', '', '', 0, '');
  pageSize: number = 10;
  pageIndex: number = 0;
  totalGymClasses: number = 0;





  constructor(private gymClassService: GymClassService) { }


  ngOnInit() {
    this.loadGymClasses();
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
  loadGymClasses() {
    this.gymClassService.getAllGymClasses().subscribe(gymClasses => {
      console.log(gymClasses);
      this.gymClassesToEdit.data = { ...gymClasses }
      this.gymClasses.data = gymClasses;
      console.log("Las clases de gimnasio", this.gymClasses.data);
      this.gymClasesEdit = gymClasses;
      this.gymClasesEdit.forEach(element => {
        element.reservationDate = this.formatDate(element.reservationDate);
      }
      );

    }
    );

  }

  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
  ngAfterViewInit() {
    this.gymClasses.paginator = this.paginator;
    this.gymClasses.sort = this.sort;
  }

  applyFilter() {
    this.gymClasses.data = this.gymClassList;
    this.gymClasses.filter = this.searchTerm.trim().toLowerCase();
    this.totalGymClasses = this.gymClasses.filteredData.length;

    this.pageSize = Math.max(1, this.pageSize);

    let startIndex = this.pageIndex * this.pageSize;

    if (startIndex >= this.totalGymClasses) {
      startIndex = Math.max(0, this.totalGymClasses - this.pageSize);
      this.pageIndex = Math.floor(startIndex / this.pageSize);
    }

    const endIndex = Math.min(startIndex + this.pageSize, this.totalGymClasses);

    console.log(startIndex + " " + endIndex + " " + this.pageSize);
    this.gymClasses.data = this.gymClasses.filteredData.slice(startIndex, endIndex);
  }

  addGymClass() {
    this.isAddForm = true;
    this.isEditionForm = false;
  }

  cancelAdd() {
    this.isAddForm = false;
    this.loadGymClasses();
  }

  editGymClass(gymClass: GymClass) {

    this.isEditionForm = true;
    this.isAddForm = false;
    this.selectedGymClass = { ...gymClass };
    console.log("Fecha en seleccion recibida por paramentro: ", this.selectedGymClass.reservationDate);

    this.selectedGymClassEdit = this.selectedGymClass;
    this.selectedGymClassEdit.reservationDate = this.selectedGymClass.reservationDate;


    console.log("Fecha en seleccion para editar: ", this.selectedGymClassEdit.reservationDate);

  }

  navigationToClasses() {

    console.log("Navegando");
    this.isAddForm = false;
    this.isEditionForm = false;
    this.loadGymClasses();
    this.applyFilter();
    this.searchTerm = "";
    this.gymClasses.paginator = this.paginator;
    this.gymClasses.sort = this.sort;

  }


  cancelEdit() {
    this.isEditionForm = false;
    this.selectedGymClass = new GymClass('', '', '', '', 0, '');
  }

  saveGymClass(gymClass: GymClass) {
    console.log("Actualizando clase..");
    this.gymClassService.updateGymClass(gymClass).subscribe(() => {
      this.loadGymClasses();
      this.cancelEdit();
    });
  }

  deleteGymClass(gymClass: GymClass) {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${gymClass.name} ?`)) {
      this.gymClassService.deleteGymClass(gymClass._id).subscribe(
        () => {
          this.loadGymClasses();
        },
        (error) => {
          this.error = error.error.error;

          console.error("Error al eliminar la clase de gimnasio:", error);
          setTimeout(() => {
            this.error = '';
          }, 1000);
        }
      );
    }
  }


}
