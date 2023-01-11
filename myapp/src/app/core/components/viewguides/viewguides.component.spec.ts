import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewguidesComponent } from './viewguides.component';


describe('ViewguidesComponent', () => {
  let component: ViewguidesComponent;
  let fixture: ComponentFixture<ViewguidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewguidesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewguidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
