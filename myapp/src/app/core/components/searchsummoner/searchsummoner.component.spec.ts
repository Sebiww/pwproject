import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchsummonerComponent } from './searchsummoner.component';

describe('SearchsummonerComponent', () => {
  let component: SearchsummonerComponent;
  let fixture: ComponentFixture<SearchsummonerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchsummonerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchsummonerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
