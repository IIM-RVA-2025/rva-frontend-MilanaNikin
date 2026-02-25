import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Status } from '../../../models/status';
import { StatusService } from '../../../services/status/status';

import { MaterialModule } from '../../../material.module';

type DialogData = {
  mode: 'add' | 'update';
  status?: Status;
};

@Component({
  selector: 'app-status-dialog',
  standalone: true,
  templateUrl: './status-dialog.html',
  imports: [
    MaterialModule
  ]
})
export class StatusDialogComponent implements OnInit{

  status: Status = {} as Status;

  constructor(
    public dialogRef: MatDialogRef<StatusDialogComponent>,
    public statusService: StatusService,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    ) { }

  ngOnInit(): void {
    if (this.data.mode === 'update' && this.data.status) {
      this.status = { ...this.data.status };
    }
  }

  create(): void {
    this.statusService.create(this.status).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  update(): void {
    this.statusService.update(this.status).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  cancel(): void {
      this.dialogRef.close();
    }
  }
