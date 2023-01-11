import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SummonerID } from 'src/app/models/summoner-id';
import { SummonerSTATS } from 'src/app/models/summoner-stats';
import { CompareaccountService } from 'src/app/services/compareaccount.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-compareaccounts',
  templateUrl: './compareaccounts.component.html',
  styleUrls: ['./compareaccounts.component.scss']
})
export class CompareaccountsComponent implements OnInit{

public selectedOption: string = '';
public selectedOption2: string = '';
public ok: number = 0;
public ok2: number = 0;
public inputValue: string = ''
public summonerName: string = ''
public summonerName2: string = ''
public checkselection: boolean = false;
public summonerIdHardcoded: string = '';
public forSummonerId: SummonerID = {} as SummonerID;
public forSummonerStats: SummonerSTATS[] = {} as SummonerSTATS[];
public forSummonerStats2: SummonerSTATS[] = {} as SummonerSTATS[];
//public auxStats: SummonerSTATS = {} as SummonerSTATS;
public auxStats: SummonerSTATS[] = {} as SummonerSTATS[];
public testShowStats: boolean = false;
public testShowStats2: boolean = false;

public summonerWinRate: number = 0;

public rowClass = 'table-row'
public headerClass = 'table-header'

public rowClass2 = 'table-row'
public headerClass2 = 'table-header'

public summonerExists:boolean = false;
public summonerExists2:boolean = false;

tiers = [
  'IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER'
]

ranks = [
  'I', 'II', 'III', 'IV'
]
options = [
  { label: 'EU North East', value: 'EUN1' },
  { label: 'EU West', value: 'EUW1' },
  { label: 'North America', value: 'NA1' },
  { label: 'Brasil', value: 'BR1' },
  { label: 'Korea', value: 'KR' },
  { label: 'Japan', value: 'JP1' }
];

  constructor(private myService: CompareaccountService, private http: HttpClient) { }

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

  jsonPlayer1 = {
    "wins": 0,
    "losses": 0,
    "winrate": 0,
    "leaguePoints": 0,
    "tier": "caca",
    "rank": "nuconteaza"
  }

  jsonPlayer2 = {
    "wins": 0,
    "losses": 0,
    "winrate": 0,
    "leaguePoints": 0,
    "tier": "caca",
    "rank": "nuconteaza"
  }

  ngOnInit(): void {
    this.selectedOption = 'Select a region for player 1';
    this.selectedOption2 = 'Select a region for player 2';
  }
 
  public onCheckStats(checkStatsForm: NgForm):void{
    this.rowClass = 'table-row';
      this.headerClass = 'table-header';
      this.rowClass2 = 'table-row';
      this.headerClass2 = 'table-header';
    this.getSummonerIdDetails(checkStatsForm);
    //console.log(this.summonerIdHardcoded)
  }

  public onCheckStats2(checkStatsForm2: NgForm):void{
    this.rowClass = 'table-row';
      this.headerClass = 'table-header';
      this.rowClass2 = 'table-row';
      this.headerClass2 = 'table-header';
    console.log(this.selectedOption2);
    this.getSummonerIdDetails2(checkStatsForm2);
    //console.log(this.summonerIdHardcoded)
  }

  public testSelection():boolean{
    if(this.selectedOption != 'Select a region for player 1')
      return true;
      else return false;
  }

  public testSelection2():boolean{
    if(this.selectedOption2 != 'Select a region for player 2')
      return true;
      else return false;
  }

  public getSummonerNameDetails(summonerId: string):void{
    this.myService.getDataForSummonerId(this.selectedOption, summonerId).subscribe(
      (response: SummonerSTATS[]) => {
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

        this.jsonPlayer1.losses = response[0].losses;
        this.jsonPlayer1.leaguePoints = response[0].leaguePoints;
        this.jsonPlayer1.rank = response[0].rank;
        this.jsonPlayer1.tier = response[0].tier;
        this.jsonPlayer1.wins = response[0].wins;

        //console.log(this.jsonPlayer1);
      
        this.summonerExists = false;
        this.forSummonerStats = response;
        this.testShowStats = true;
      },
      (error: HttpErrorResponse) => {
        console.log("eroare44");
        this.testShowStats = false;
      }
    )

    //this.testShowStats = true;
  }

  public getSummonerNameDetails2(summonerId: string):void{
    this.myService.getDataForSummonerId(this.selectedOption2, summonerId).subscribe(
      (response: SummonerSTATS[]) => {
          //console.log(Object.keys(response).length)
          this.ok2 = 0;
          if(Object.keys(response).length === 0){
            response[0] = this.jsonSD;
            response[1] = this.jsonFlex;
            response[2] = this.jsonTft;
          }
          if(Object.keys(response).length === 1){
            this.ok2 = 1;
            if(response[0].queueType === 'RANKED_SOLO_5x5'){
              response[1] = this.jsonFlex;
              response[2] = this.jsonTft;
            }
            if(response[0].queueType === 'RANKED_FLEX_SR'){
              this.auxStats = response;
              response[0] = this.jsonSD;
              response[1] = this.auxStats[0];
              response[2] = this.jsonTft;
            }
            if(response[0].queueType === 'RANKED_TFT_DOUBLE_UP'){
              this.auxStats = response;
              response[0] = this.jsonSD;
              response[1] = this.jsonFlex;
              response[2] = this.auxStats[0];
            }
          }
          if(Object.keys(response).length === 2){
            this.ok2 = 1;
            this.auxStats = response;
            //console.log(this.auxStats.findIndex(x => x.queueType === 'RANKED_SOLO_5x5'));
            response[0] = this.auxStats[this.auxStats.findIndex(x => x.queueType === 'RANKED_SOLO_5x5')];
            response[1] = this.auxStats[this.auxStats.findIndex(x => x.queueType === 'RANKED_FLEX_SR')];
            response[2] = this.jsonTft;
          }
          //console.log(Object.keys(response).length)
          if(Object.keys(response).length === 3 && this.ok2 === 0){
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
        this.jsonPlayer2.losses = response[0].losses;
        this.jsonPlayer2.leaguePoints = response[0].leaguePoints;
        this.jsonPlayer2.rank = response[0].rank;
        this.jsonPlayer2.tier = response[0].tier;
        this.jsonPlayer2.wins = response[0].wins;

        //console.log(this.jsonPlayer2);
        
        this.summonerExists2 = false;
        this.forSummonerStats2 = response;
        this.testShowStats2 = true;
      },
      (error: HttpErrorResponse) => {
        this.testShowStats2 = false;
        console.log("eroare");
      }
    )

    
  }

  public getSummonerIdDetails(checkStatsForm: NgForm):void{
    
    this.myService.getSummonerId(this.selectedOption, checkStatsForm.value.summonerName).subscribe(
      (response: SummonerID) => {
       /* console.log(checkStatsForm.value.summonerName);
        console.log(this.selectedOption);
        console.log(response.id);*/
        this.getSummonerNameDetails(response.id);
        this.summonerName = response.name;
      },
      (error: HttpErrorResponse) =>{
        this.testShowStats = false;
        this.summonerExists = true;
        console.log("eroare");
      }
    )
  
  }

  public getSummonerIdDetails2(checkStatsForm: NgForm):void{
    this.myService.getSummonerId(this.selectedOption2, checkStatsForm.value.summonerName2).subscribe(
      (response: SummonerID) => {
       /* console.log(checkStatsForm.value.summonerName);
        console.log(this.selectedOption);
        console.log(response.id);*/
        this.getSummonerNameDetails2(response.id);
        this.summonerName2 = response.name;
      },
      (error: HttpErrorResponse) =>{
        this.testShowStats2 = false;
        this.summonerExists2 = true;
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

  public validateComparison():void{
    //console.log(this.jsonPlayer1);
    //console.log(this.jsonPlayer2);
    if(this.summonerName === this.summonerName2 || _.isEqual(this.jsonPlayer1, this.jsonPlayer2)){
      this.rowClass = 'table-row';
          this.headerClass = 'table-header';
          this.rowClass2 = 'table-row';
          this.headerClass2 = 'table-header';
    }else{
      //console.log(this.tiers.findIndex(x => x === this.jsonPlayer1.tier))
      //console.log(this.tiers.findIndex(x => x === this.jsonPlayer2.tier))
      if(this.tiers.findIndex(x => x === this.jsonPlayer1.tier) > this.tiers.findIndex(x => x === this.jsonPlayer2.tier)){
        this.rowClass = 'table-row-green';
        this.headerClass = 'table-header-green';
        this.rowClass2 = 'table-row-red';
        this.headerClass2 = 'table-header-red';
      } else if(this.tiers.findIndex(x => x === this.jsonPlayer1.tier) < this.tiers.findIndex(x => x === this.jsonPlayer2.tier)){
        this.rowClass = 'table-row-red';
        this.headerClass = 'table-header-red';
        this.rowClass2 = 'table-row-green';
        this.headerClass2 = 'table-header-green';
      } else{
        if(this.ranks.findIndex(x => x === this.jsonPlayer1.rank) < this.ranks.findIndex(x => x === this.jsonPlayer2.rank)){
          this.rowClass = 'table-row-green';
          this.headerClass = 'table-header-green';
          this.rowClass2 = 'table-row-red';
          this.headerClass2 = 'table-header-red';
        }
        else if(this.ranks.findIndex(x => x === this.jsonPlayer1.rank) > this.ranks.findIndex(x => x === this.jsonPlayer2.rank)){
          this.rowClass = 'table-row-red';
          this.headerClass = 'table-header-red';
          this.rowClass2 = 'table-row-green';
          this.headerClass2 = 'table-header-green';
        } else{
          if(this.jsonPlayer1.leaguePoints > this.jsonPlayer2.leaguePoints){
            this.rowClass = 'table-row-green';
            this.headerClass = 'table-header-green';
            this.rowClass2 = 'table-row-red';
            this.headerClass2 = 'table-header-red';
          } else if(this.jsonPlayer1.leaguePoints < this.jsonPlayer2.leaguePoints){
            this.rowClass = 'table-row-red';
            this.headerClass = 'table-header-red';
            this.rowClass2 = 'table-row-green';
            this.headerClass2 = 'table-header-green';
          } else{
            this.jsonPlayer1.winrate = this.jsonPlayer1.wins * 100 / (this.jsonPlayer1.wins + this.jsonPlayer1.losses);
            this.jsonPlayer2.winrate = this.jsonPlayer2.wins * 100 / (this.jsonPlayer2.wins + this.jsonPlayer2.losses);
  
            if(this.jsonPlayer1.winrate > this.jsonPlayer2.winrate){
              this.rowClass = 'table-row-green';
              this.headerClass = 'table-header-green';
              this.rowClass2 = 'table-row-red';
              this.headerClass2 = 'table-header-red';
            } else {
              this.rowClass = 'table-row-red';
              this.headerClass = 'table-header-red';
              this.rowClass2 = 'table-row-green';
              this.headerClass2 = 'table-header-green';
            }
          }
        }
      }
    } 
    }
   
}
