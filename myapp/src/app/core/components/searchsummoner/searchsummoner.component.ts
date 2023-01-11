import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-searchsummoner',
  templateUrl: './searchsummoner.component.html',
  styleUrls: ['./searchsummoner.component.scss']
})
export class SearchsummonerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  enteredSummonerName: string = '';

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchTextChanged(){
    this.searchTextChanged.emit(this.enteredSummonerName);
  }

}
