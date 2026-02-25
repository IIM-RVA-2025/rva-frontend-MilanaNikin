import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDialog } from './student-dialog';

describe('StudentDialog', () => {
  let component: StudentDialog;
  let fixture: ComponentFixture<StudentDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
