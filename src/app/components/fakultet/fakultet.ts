import { Component, OnInit, ViewChild } from '@angular/core';
import { Fakultet } from '../../models/fakultet';
import { FakultetService } from '../../services/fakultet/fakultet';
import { FakultetDialogComponent } from './fakultet-dialog/fakultet-dialog';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-fakultet',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './fakultet.html',
  styleUrls: ['./fakultet.css']
})
export class FakultetComponent implements OnInit {

  dataSource = new MatTableDataSource<Fakultet>();
  displayedColumns: string[] = ['id', 'naziv', 'sediste','actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fakultetService: FakultetService,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData(): void {
    this.fakultetService.getAll().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // delete(id: number): void {
  //   this.fakultetService.delete(id).subscribe(() => {
  //     this.loadData();
  //   });
  // }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(FakultetDialogComponent, {
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData();
    });
  }

  openUpdateDialog(row: Fakultet): void {
    const dialogRef = this.dialog.open(FakultetDialogComponent, {
      data: { mode: 'update', fakultet: row }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData();
    });
  }

  confirmDelete(row: Fakultet): void {
    const ok = confirm(`Delete fakultet "${row.naziv}"?`);
    if (!ok) return;

    this.fakultetService.delete(row.id).subscribe({
      next: () => this.loadData(),
      error: (err) => console.error(err)
    });
  }
  searchByNaziv(naziv: string): void {
    if (!naziv) {
      this.loadData();
      return;
    }

    this.fakultetService.getByNaziv(naziv).subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error(err)
    });
  }
  searchBySediste(sediste: string): void {
    if (!sediste) {
      this.loadData();
      return;
    }

    this.fakultetService.getBySediste(sediste).subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => console.error(err)
    });
  }
  clearFilter(nazivInput: HTMLInputElement, sedistInput: HTMLInputElement){
    nazivInput.value = '' ; 
    sedistInput.value = '' ; 
    this.loadData();
  }
}