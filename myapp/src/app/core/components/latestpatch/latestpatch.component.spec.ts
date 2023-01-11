import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestpatchComponent } from './latestpatch.component';

describe('LatestpatchComponent', () => {
  let component: LatestpatchComponent;
  let fixture: ComponentFixture<LatestpatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestpatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestpatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
