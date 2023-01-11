import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { empty, Observable, pipe, tap } from 'rxjs';
import { SummonerID } from 'src/app/models/summoner-id';
import { SummonerSTATS } from 'src/app/models/summoner-stats';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-checkstats',
  templateUrl: './checkstats.component.html',
  styleUrls: ['./checkstats.component.scss']
})
export class CheckstatsComponent implements OnInit {

public inputValue: string = ''

public checkselection: boolean = false;
public summonerIdHardcoded: string = '';
public forSummonerId: SummonerID = {} as SummonerID;
public forSummonerStats: SummonerSTATS[] = {} as SummonerSTATS[];
public testShowStats: boolean = false;
public auxStats: SummonerSTATS[] = {} as SummonerSTATS[];
public ok: number = 0;
public summonerExists:boolean = false;
public summonerWinRate: number = 0;

public selectedOption: string = '';

options = [
  { label: 'EU North East', value: 'eun1' },
  { label: 'EU West', value: 'euw1' },
  { label: 'North America', value: 'na1' },
  { label: 'Brasil', value: 'br1' },
  { label: 'Korea', value: 'kr' },
  { label: 'Japan', value: 'jp1' }
];
  
  constructor(private myStatsService: StatsService, private http: HttpClient) { }

  jsonSD = {
    "queueType": "RANKED_SOLO_5x5",
    "tier": "UNRANKED",
    "rank": "",
    "leaguePoints": 0,
    "wins": 0,
    "losses": 0,
};

  jsonFlex = {
    "queueType": "RANKED_FLEX_SR",
    "tier": "UNRANKED",
    "rank": "",
    "leaguePoints": 0,
    "wins": 0,
    "losses": 0,
};

jsonTft = {
"queueType": "RANKED_TFT_DOUBLE_UP",
    "tier": "UNRANKED",
    "rank": "",
    "leaguePoints": 0,
    "wins": 0,
    "losses": 0,
};

  ngOnInit(): void {
    this.selectedOption = 'Select a region';
  }

  public onCheckStats(checkStatsForm: NgForm):void{
    this.getSummonerIdDetails(checkStatsForm);
    //console.log(this.summonerIdHardcoded)
  }

  public testSelection():boolean{
    if(this.selectedOption != 'Select a region')
      return true;
      else return false;
  }

  public getSummonerNameDetails(summonerId: string):void{
    this.myStatsService.getDataForSummonerName(this.selectedOption, summonerId).subscribe(
      (response: SummonerSTATS[]) => {
          //console.log(Object.keys(response).length)
        this.ok = 0;
        if(Object.keys(response).length === 0){
          response[0] = this.jsonSD;
          response[1] = this.jsonFlex;
          response[2] = this.jsonTft;
        }
        if(Object.keys(response).length === 1){
          this.ok = 1;
          if(response[0].queueType === 'RANKED_SOLO_5x5'){
            response[1] = this.jsonFlex;
            response[2] = this.jsonTft;
          }
          if(response[0].queueType === 'RANKED_FLEX_SR'){
            this.auxStats = response;
            const x = this.auxStats[0];
            response[0] = this.jsonSD;
            response[1] = x;
            response[2] = this.jsonTft;
          }
          if(response[0].queueType === 'RANKED_TFT_DOUBLE_UP'){
            this.auxStats = response;
            const x = this.auxStats[0];
            response[0] = this.jsonSD;
            response[1] = this.jsonFlex;
            response[2] = x;
          }
        }
        if(Object.keys(response).length === 2){
          this.ok = 1;
          this.auxStats = response;
          //console.log(this.auxStats.findIndex(x => x.queueType === 'RANKED_SOLO_5x5'));
          const x = this.auxStats[this.auxStats.findIndex(x => x.queueType === 'RANKED_SOLO_5x5')];
          const y = this.auxStats[this.auxStats.findIndex(x => x.queueType === 'RANKED_FLEX_SR')];
          response[0] = x;
          response[1] = y;
          response[2] = this.jsonTft;
        }
        //console.log(Object.keys(response).length)
        if(Object.keys(response).length === 3 && this.ok === 0){
          this.auxStats = response;
          const x = this.auxStats[this.auxStats.findIndex(x => x.queueType === 'RANKED_SOLO_5x5')];
          const y = this.auxStats[this.auxStats.findIndex(x => x.queueType === 'RANKED_FLEX_SR')];
          const z = this.auxStats[this.auxStats.findIndex(x => x.queueType === 'RANKED_TFT_DOUBLE_UP')];
          response[0] = x;
          response[1] = y;
          response[2] = z;
          //response[1] = this.auxStats[this.auxStats.findIndex(x => x.queueType === "RANKED_FLEX_SR")];
          //response[2] = this.auxStats[this.auxStats.findIndex(x => x.queueType === 'RANKED_TFT_DOUBLE_UP')];
        }

        this.testShowStats = true;
        this.summonerExists = false;
        this.forSummonerStats = response;
      },
      (error: HttpErrorResponse) => {
        console.log("eroare");
      }
    )

  }

  public getSummonerIdDetails(checkStatsForm: NgForm):void{
    this.myStatsService.getDataForSummonerId(this.selectedOption, checkStatsForm.value.summonerName).subscribe(
      (response: SummonerID) => {
       /* console.log(checkStatsForm.value.summonerName);
        console.log(this.selectedOption);
        console.log(response.id);*/
        this.getSummonerNameDetails(response.id);
      },
      (error: HttpErrorResponse) =>{
        this.summonerExists = true;
        this.testShowStats = false;
        console.log("eroare");
      }
    )
  
  }

  public getQueueType(queueType: string):string{
    if(queueType === 'RANKED_FLEX_SR')
      return 'RANKED FLEX';
    else if(queueType === 'RANKED_SOLO_5x5')
      return 'RANKED SOLO DUO';
      else return 'RANKED TFT';
  }

  public getWinRate(val1: number, val2: number):string{
    if(val1 === 0 && val2 === 0) return '0';
    if(val2 === 0) return '100';
    this.summonerWinRate = val1 * 100 / (val1+val2)
    return this.summonerWinRate.toFixed(2);
  }
  /* public getLeaderboard(region: string):void{
    this.ladderService.getLeaderboard(region).subscribe(
      (response: Ladder[]) => {
          this.ladder = response;
      },
      (error: HttpErrorResponse) => {
        console.log("eroare");
      }
    )
  } */
}

