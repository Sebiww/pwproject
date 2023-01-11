import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Ladder } from 'src/app/models/ladder';
import { LeaderboardService } from 'src/app/services/leaderboard.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-viewleaderboard',
  templateUrl: './viewleaderboard.component.html',
  styleUrls: ['./viewleaderboard.component.scss']
})
export class ViewleaderboardComponent implements OnInit {
  public searchText: string = ''
  public ladder: Ladder[] = {} as Ladder[];
  selectedOption: string = '';
  public showTable: boolean = false;
  options = [
    { label: 'EU North East', value: 'EUN1' },
    { label: 'EU West', value: 'EUW1' },
    { label: 'North America', value: 'NA1' },
    { label: 'Brasil', value: 'BR1' },
    { label: 'Korea', value: 'KR' },
    { label: 'Japan', value: 'JP1' }
  ];
  constructor(private http: HttpClient, private ladderService: LeaderboardService) {}

  ngOnInit(): void {
    this.selectedOption = 'Select a region'
  }

  public onShowLadder(){
    this.getLeaderboard(this.selectedOption);
  }
  public getLeaderboard(region: string):void{
    this.ladderService.getLeaderboard(region).subscribe(
      (response: Ladder[]) => {
          this.ladder = response;
      },
      (error: HttpErrorResponse) => {
        console.log("eroare");
      }
    )
  }
  
  public testTabel():boolean{
    if(this.ladder.length > 0){
      this.showTable = true;
    }
    else{
      this.showTable = false;
    }

    return this.showTable;
  }

  onSearchTextEntered(searchvalue: string){
    this.searchText = searchvalue;
    //console.log(this.searchText);
  }
 /* public getUsers():void{
    this.userService.getAllUsers().subscribe(
      (respone: User[]) => {
        this.users = respone;
      },
      (error: HttpErrorResponse) => {
        console.log("eroare");
      }
    );
  }*/
}
