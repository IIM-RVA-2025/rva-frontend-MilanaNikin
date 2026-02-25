import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmanComponent } from './departman';

describe('Departman', () => {
  let component: DepartmanComponent;
  let fixture: ComponentFixture<DepartmanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartmanComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
