import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckstatsComponent } from './checkstats.component';

describe('CheckstatsComponent', () => {
  let component: CheckstatsComponent;
  let fixture: ComponentFixture<CheckstatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckstatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
