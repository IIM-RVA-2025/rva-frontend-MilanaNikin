import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Fakultet } from '../../../models/fakultet';
import { FakultetService } from '../../../services/fakultet/fakultet';

import { MaterialModule } from '../../../material.module';

type DialogData = {
  mode: 'add' | 'update';
  fakultet?: Fakultet;
};

@Component({
  selector: 'app-fakultet-dialog',
  standalone: true,
  templateUrl: './fakultet-dialog.html',
  imports: [
    MaterialModule
  ]
})
export class FakultetDialogComponent implements OnInit{

  fakultet: Fakultet = {} as Fakultet;

  constructor(
    public dialogRef: MatDialogRef<FakultetDialogComponent>,
    public fakultetService: FakultetService,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    ) { }

  ngOnInit(): void {
    if (this.data.mode === 'update' && this.data.fakultet) {
      this.fakultet = { ...this.data.fakultet };
    }
  }

  create(): void {
    this.fakultetService.create(this.fakultet).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  update(): void {
    this.fakultetService.update(this.fakultet).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  cancel(): void {
      this.dialogRef.close();
    }
  }
