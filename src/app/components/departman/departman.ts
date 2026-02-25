import { Component, OnInit, ViewChild } from '@angular/core';

import { Departman } from '../../models/departman';
import { DepartmanService } from '../../services/departman/departman';
import { Fakultet } from '../../models/fakultet';
import { FakultetService } from '../../services/fakultet/fakultet';
import { DepartmanDialogComponent } from './departman-dialog/departman-dialog';

import { MaterialModule } from '../../material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-departman',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './departman.html',
  styleUrls: ['./departman.css']
})

export class DepartmanComponent implements OnInit {

  fakulteti: Fakultet[] = [];
  selectedFakultetId: number | null = null;

  dataSource = new MatTableDataSource<Departman>();
  displayedColumns: string[] = ['id', 'naziv', 'oznaka','fakultet','actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private departmanService: DepartmanService, private fakultetService: FakultetService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.fakultetService.getAll().subscribe(data => {
      this.fakulteti = data;
    });
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData(){
    this.departmanService.getAll().subscribe( data => {
      this.dataSource = new MatTableDataSource(data);

      // pretraga po nazivu stranog kljuca
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const accumulator = (currentTerm: string, key: string) => {
          return key === 'fakultet' ? currentTerm + data.fakultet.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data:any, property) =>{
        switch(property){
          case 'id': return data[property];
          case 'naziv': return data[property];
          case 'oznaka': return data[property];
          case 'fakultet': return data.fakultet.naziv;
          default: return data[property].toLocaleLowerCase();
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
    this.departmanService.delete(id).subscribe(() => {
      this.loadData();
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(DepartmanDialogComponent, {
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData();
    });
  }

  openUpdateDialog(row: Departman): void {
    const dialogRef = this.dialog.open(DepartmanDialogComponent, {
      data: { mode: 'update', departman: row }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData();
    });
  }

  confirmDelete(row: Departman): void {
    const ok = confirm(`Delete departman "${row.naziv}"?`);
    if (!ok) return;

    this.departmanService.delete(row.id).subscribe({
      next: () => this.loadData(),
      error: (err) => console.error(err)
    });
  }

  filterBySelector(): void {
    if (!this.selectedFakultetId) {
      this.loadData();
      return;
    }

    this.departmanService
        .getDepartmanSaFakulteta(this.selectedFakultetId)
        .subscribe(data => {
          this.dataSource.data = data;
        });
  }

  clearFilter(){
    this.selectedFakultetId = null;
    this.loadData();
  }
}