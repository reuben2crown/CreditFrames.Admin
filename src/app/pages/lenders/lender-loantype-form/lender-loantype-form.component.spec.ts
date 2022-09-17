import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LenderLoantypeFormComponent } from './lender-loantype-form.component';

describe('LenderLoantypeFormComponent', () => {
  let component: LenderLoantypeFormComponent;
  let fixture: ComponentFixture<LenderLoantypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LenderLoantypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LenderLoantypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
