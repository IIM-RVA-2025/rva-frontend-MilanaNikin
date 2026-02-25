import { Component, OnInit, ViewChild } from '@angular/core';
import { Status } from '../../models/status';
import { StatusService } from '../../services/status/status';
import { StatusDialogComponent } from './status-dialog/status-dialog';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-status',
  standalone: true,
  imports: [
    MaterialModule
  ],
  templateUrl: './status.html',
  styleUrls: ['./status.css']
})
export class StatusComponent implements OnInit {

  dataSource = new MatTableDataSource<Status>();
  displayedColumns: string[] = ['id', 'naziv', 'oznaka','actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private statusService: StatusService,private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadData(): void {
    this.statusService.getAll().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: number): void {
    this.statusService.delete(id).subscribe(() => {
      this.loadData();
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData();
    });
  }

  openUpdateDialog(row: Status): void {
    const dialogRef = this.dialog.open(StatusDialogComponent, {
      data: { mode: 'update', status: row }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadData();
    });
  }

  confirmDelete(row: Status): void {
    const ok = confirm(`Delete status "${row.naziv}"?`);
    if (!ok) return;

    this.statusService.delete(row.id).subscribe({
      next: () => this.loadData(),
      error: (err) => console.error(err)
    });
  }
}