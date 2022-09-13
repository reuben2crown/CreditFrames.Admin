import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchHistoriesComponent } from './search-histories.component';

describe('SearchHistoriesComponent', () => {
  let component: SearchHistoriesComponent;
  let fixture: ComponentFixture<SearchHistoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchHistoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchHistoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
