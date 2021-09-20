import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsOverviewComponent } from './charts-overview.component';

describe('ChartsOverviewComponent', () => {
  let component: ChartsOverviewComponent;
  let fixture: ComponentFixture<ChartsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
