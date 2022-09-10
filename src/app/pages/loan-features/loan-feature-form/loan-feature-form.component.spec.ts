import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanFeatureFormComponent } from './loan-feature-form.component';

describe('LoanFeatureFormComponent', () => {
  let component: LoanFeatureFormComponent;
  let fixture: ComponentFixture<LoanFeatureFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanFeatureFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanFeatureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
