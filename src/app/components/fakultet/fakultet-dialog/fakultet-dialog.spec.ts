import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakultetDialog } from './fakultet-dialog';

describe('FakultetDialog', () => {
  let component: FakultetDialog;
  let fixture: ComponentFixture<FakultetDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FakultetDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakultetDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
