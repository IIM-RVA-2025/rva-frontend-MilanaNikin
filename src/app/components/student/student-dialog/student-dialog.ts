import { Component, Inject,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Student } from '../../../models/student';
import { StudentService } from '../../../services/student/student';
import { Departman } from '../../../models/departman';
import { DepartmanService } from '../../../services/departman/departman';
import { Status } from '../../../models/status';
import { StatusService } from '../../../services/status/status';

import { MaterialModule } from '../../../material.module';


type DialogData = {
  mode: 'add' | 'update';
  student?: Student;
};

@Component({
  selector: 'app-student-dialog',
  imports: [
    MaterialModule
],
  templateUrl: './student-dialog.html',
  styleUrl: './student-dialog.css',
})
export class StudentDialogComponent implements OnInit{

  student: Student = {} as Student;

  departmani: Departman[] = [];
  statusi: Status[] = [];

  constructor(
    public dialogRef: MatDialogRef<StudentDialogComponent>,
    public departmanService: DepartmanService,
    public statusService: StatusService,
    public studentService: StudentService,
    @Inject(MAT_DIALOG_DATA)
    public data: DialogData,
    ) { }

  ngOnInit(): void {
    if (this.data.mode === 'update' && this.data.student) {
      this.student = { ...this.data.student };
    }
    this.departmanService.getAll().subscribe(departmani =>
      this.departmani = departmani)
    this.statusService.getAll().subscribe(statusi =>
      this.statusi = statusi)
  }

  create(): void {
    this.studentService.create(this.student).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  update(): void {
    this.studentService.update(this.student).subscribe(() => {
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
