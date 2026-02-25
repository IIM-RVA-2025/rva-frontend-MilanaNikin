import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Departman } from '../../../models/departman';
import { DepartmanService } from '../../../services/departman/departman';
import { Fakultet } from '../../../models/fakultet';
import { FakultetService } from '../../../services/fakultet/fakultet';

import { MaterialModule } from '../../../material.module';


type DialogData = {
  mode: 'add' | 'update';
  departman?: Departman;
};

@Component({
  selector: 'app-departman-dialog',
  imports: [
    MaterialModule
],
  templateUrl: './departman-dialog.html',
  styleUrl: './departman-dialog.css',
})
export class DepartmanDialogComponent implements OnInit{

  departman: Departman = {} as Departman;

  fakulteti: Fakultet[] = [];

  constructor(
    public dialogRef: MatDialogRef<DepartmanDialogComponent>,
    public departmanService: DepartmanService,
    public fakultetService: FakultetService,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    ) { }

  ngOnInit(): void {
    if (this.data.mode === 'update' && this.data.departman) {
      this.departman = { ...this.data.departman };
    }
    this.fakultetService.getAll().subscribe(fakulteti =>
      this.fakulteti = fakulteti)
  }

  create(): void {
    this.departmanService.create(this.departman).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  update(): void {
    this.departmanService.update(this.departman).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  cancel(): void {
      this.dialogRef.close();
  }
  compareTo(a: any, b: any) {
      return a.id === b.id;
  }

}
