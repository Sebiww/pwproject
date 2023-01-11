import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareaccountsComponent } from './compareaccounts.component';

describe('CompareaccountsComponent', () => {
  let component: CompareaccountsComponent;
  let fixture: ComponentFixture<CompareaccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareaccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
