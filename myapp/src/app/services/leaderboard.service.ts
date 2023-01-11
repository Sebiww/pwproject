import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ladder } from '../models/ladder';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {


  constructor(private http: HttpClient) { }

  getLeaderboard(Region: string):Observable<Ladder[]>{
    return this.http.get<Ladder[]>(
      'https://'+Region+'.api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page=1&api_key=RGAPI-726045fe-ac06-4ce6-91e8-6b90e825ca29'
    )
  }
}
