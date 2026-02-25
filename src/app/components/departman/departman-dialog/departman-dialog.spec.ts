import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmanDialog } from './departman-dialog';

describe('DepartmanDialog', () => {
  let component: DepartmanDialog;
  let fixture: ComponentFixture<DepartmanDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmanDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmanDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
