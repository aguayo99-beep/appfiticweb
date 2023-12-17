import { GymClassReservation } from './../../models/ClassReservation';
import { GymClass } from './../../models/GymClass';
import { GymClassService } from './../../services/GymClassService';
import { GymClassReservationService } from './../../services/ClassReservationService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-management-reservations',
  templateUrl: './management-reservations.component.html',
  styleUrls: ['./management-reservations.component.css']
})


export class ManagementGymclassReservationComponent implements OnInit {
  gymClassesReservations: MatTableDataSource<GymClassReservation> = new MatTableDataSource<GymClassReservation>();
  gymClassesReservationList: GymClassReservation[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private searchTerms = new Subject<string>();


  displayedColumns: string[] = ['instructorName', 'userName', 'gymClassName', 'gymClassDate', 'acciones'];
  columnNames: { [key: string]: string } = {
    instructorName: 'Instructor',
    userName: 'Usuario',
    gymClassName: 'Clase',
    gymClassDate: 'Fecha',
    acciones: 'Acciones',

  };
  searchTerm: string = '';
  isEditionForm: boolean = false;
  isAddForm: boolean = false;
  selectedGymClassReservation: GymClassReservation = new GymClassReservation('', '', '', '', '', '', '', '');
  pageSize: number = 10;
  pageIndex: number = 0;
  totalGymClasses: number = 0;

  constructor(private gymClassReservationService: GymClassReservationService) { }



  ngOnInit() {
    this.loadGymClassesReservations();

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

  loadGymClassesReservations() {
    this.gymClassReservationService.getAllGymClasses().subscribe((gymClassesReservations: GymClassReservation[]) => {
      console.log(this.gymClassesReservations);

      this.gymClassesReservations.data = gymClassesReservations;
      this.gymClassesReservationList = gymClassesReservations;

      this.gymClassesReservationList.forEach((gymClassReservation) => {
        gymClassReservation.gymClassDate = this.formatDate(gymClassReservation.gymClassDate);
      }
      );
    });
  }

  ngAfterViewInit() {
    this.gymClassesReservations.paginator = this.paginator;
    this.gymClassesReservations.sort = this.sort;
  }
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }

  applyFilter() {
    this.gymClassesReservations.data = this.gymClassesReservationList;
    this.gymClassesReservations.filter = this.searchTerm.trim().toLowerCase();
    this.totalGymClasses = this.gymClassesReservations.filteredData.length;

    this.pageSize = Math.max(1, this.pageSize);

    let startIndex = this.pageIndex * this.pageSize;

    if (startIndex >= this.totalGymClasses) {
      startIndex = Math.max(0, this.totalGymClasses - this.pageSize);
      this.pageIndex = Math.floor(startIndex / this.pageSize);
    }

    const endIndex = Math.min(startIndex + this.pageSize, this.totalGymClasses);

    console.log(startIndex + " " + endIndex + " " + this.pageSize);
    this.gymClassesReservations.data = this.gymClassesReservations.filteredData.slice(startIndex, endIndex);
  }

  navigationToReservations() {

    console.log("Navegando");
    this.isAddForm = false;
    this.isEditionForm = false;
    this.loadGymClassesReservations();
    this.applyFilter();
    this.searchTerm = "";
    this.gymClassesReservations.paginator = this.paginator;
    this.gymClassesReservations.sort = this.sort;

  }

  addGymClassReservation() {
    this.isAddForm = true;
  }

  cancelAdd() {
    this.isAddForm = false;
    this.loadGymClassesReservations();
  }



  cancelEdit() {
    this.isEditionForm = false;
    this.selectedGymClassReservation = new GymClassReservation('', '', '', '', '', '', '', '');
  }

  saveGymClassReservation(gymClassReservation: GymClassReservation) {
    console.log("Actualizando clase..");
    this.gymClassReservationService.updateGymClass(gymClassReservation).subscribe(() => {
      this.loadGymClassesReservations();
      this.cancelEdit();
    });
  }

  deleteGymClassReservation(gymClassReservation: GymClassReservation) {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${gymClassReservation.gymClassName} ?`)) {
      this.gymClassReservationService.deleteGymClass(gymClassReservation._id).subscribe(() => {
        this.loadGymClassesReservations();
      });
    }
  }

}







