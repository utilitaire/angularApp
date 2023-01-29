import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReparationModalComponent } from './add-reparation-modal.component';

describe('AddReparationModalComponent', () => {
  let component: AddReparationModalComponent;
  let fixture: ComponentFixture<AddReparationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddReparationModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddReparationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
