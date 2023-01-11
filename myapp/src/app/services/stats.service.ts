import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegionGroups } from 'twisted/dist/constants';
import { SummonerID } from '../models/summoner-id';
import { SummonerSTATS } from '../models/summoner-stats';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  APIKey: string = 'RGAPI-726045fe-ac06-4ce6-91e8-6b90e825ca29';
  
  constructor(private http: HttpClient) { }

  getDataForSummonerId(Region:string, SummonerName:string):Observable<SummonerID>{
    return this.http.get<SummonerID>(
      'https://'+Region+'.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+SummonerName+'?api_key=RGAPI-726045fe-ac06-4ce6-91e8-6b90e825ca29'
    )
  }

  getDataForSummonerName(Region:string, SummonerId:string):Observable<SummonerSTATS[]>{
    //console.log('https://'+Region+'.api.riotgames.com/lol/league/v4/entries/by-summoner/'+SummonerId+'?api_key=RGAPI-726045fe-ac06-4ce6-91e8-6b90e825ca29');
    return this.http.get<SummonerSTATS[]>(
      'https://'+Region+'.api.riotgames.com/lol/league/v4/entries/by-summoner/'+SummonerId+'?api_key=RGAPI-726045fe-ac06-4ce6-91e8-6b90e825ca29'
    )
  }

}
