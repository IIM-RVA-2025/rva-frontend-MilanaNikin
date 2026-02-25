import { Component, OnInit, ViewChild } from '@angular/core';

import { Student } from '../../models/student';
import { StudentService } from '../../services/student/student';
import { Departman } from '../../models/departman';
import { DepartmanService } from '../../services/departman/departman';
import { StudentDialogComponent } from './student-dialog/student-dialog';

import { MaterialModule } from '../../material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './student.html',
  styleUrls: ['./student.css']
})

export class StudentComponent implements OnInit {

  // fakulteti: Fakultet[] = [];
  // selectedFakultetId: number | null = null;

  depertmani: Departman[] = [];
  selectedDepartmanId: number | null = null;

  dataSource = new MatTableDataSource<Student>();
  displayedColumns: string[] = ['id', 'ime', 'prezime','brojIndeksa','status', 'departman', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private departmanService: DepartmanService,
    private studentService: StudentService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this.departmanService.getAll().subscribe(data => {
      this.depertmani = data;
    });
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData() {
    this.studentService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);

      this.dataSource.filterPredicate = (student: any, filter: string) => {

        const search = filter.trim().toLowerCase();

        const statusNaziv = student.status?.naziv?.toLowerCase() || '';
        const departmanNaziv = student.departman?.naziv?.toLowerCase() || '';

        const normalFields = (
          student.id +
          student.ime +
          student.prezime +
          student.brojIndeksa
        ).toString().toLowerCase();

        const combined =
          normalFields + " " +
          statusNaziv + " " +
          departmanNaziv;

        return combined.includes(search);
      };
      this.dataSource.sortingDataAccessor = (student: any, property) => {

        switch (property) {
          case 'status':
            return student.status?.naziv?.toLowerCase() || '';
          case 'departman':
            return student.departman?.naziv?.toLowerCase() || '';
          default:
            return student[property];
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number): void {
    this.studentService.delete(id).subscribe(() => {
      this.loadData();
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(StudentDialogComponent, {
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData();
    });
  }

  openUpdateDialog(row: Student): void {
    const dialogRef = this.dialog.open(StudentDialogComponent, {
      data: { mode: 'update', student: row }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData();
    });
  }

  confirmDelete(row: Student): void {
    const ok = confirm(`Delete student "${row.ime},${row.prezime},${row.brojIndeksa}"?`);
    if (!ok) return;

    this.studentService.delete(row.id).subscribe({
      next: () => this.loadData(),
      error: (err) => console.error(err)
    });
  }

  filterBySelector(): void {
    if (!this.selectedDepartmanId) {
      this.loadData();
      return;
    }

    this.studentService
        .getStudentSaDepartmana(this.selectedDepartmanId)
        .subscribe(data => {
          this.dataSource.data = data;
        });
  }

  clearFilter(){
    this.selectedDepartmanId = null;
    this.loadData();
  }
}