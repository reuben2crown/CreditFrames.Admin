import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanFeaturesComponent } from './loan-features.component';

describe('LoanFeaturesComponent', () => {
  let component: LoanFeaturesComponent;
  let fixture: ComponentFixture<LoanFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanFeaturesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoanFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
