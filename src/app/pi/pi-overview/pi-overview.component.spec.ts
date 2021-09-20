import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiOverviewComponent } from './pi-overview.component';

describe('PiOverviewComponent', () => {
  let component: PiOverviewComponent;
  let fixture: ComponentFixture<PiOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
