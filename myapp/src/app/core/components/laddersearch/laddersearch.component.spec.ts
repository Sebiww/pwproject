import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaddersearchComponent } from './laddersearch.component';

describe('LaddersearchComponent', () => {
  let component: LaddersearchComponent;
  let fixture: ComponentFixture<LaddersearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaddersearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaddersearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
