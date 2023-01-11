import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewleaderboardComponent } from './viewleaderboard.component';

describe('ViewleaderboardComponent', () => {
  let component: ViewleaderboardComponent;
  let fixture: ComponentFixture<ViewleaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewleaderboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewleaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
