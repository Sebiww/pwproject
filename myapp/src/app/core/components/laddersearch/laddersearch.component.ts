import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-laddersearch',
  templateUrl: './laddersearch.component.html',
  styleUrls: ['./laddersearch.component.scss']
})
export class LaddersearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  enteredSearchValue: string = '';

  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  onSearchTextChanged(){
    this.searchTextChanged.emit(this.enteredSearchValue);
  }

}
