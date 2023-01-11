import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SummonerID } from '../models/summoner-id';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LinkaccountService {

  private apiServerUrl = environment.apiBaseUrl;
  
  constructor(private http: HttpClient) { }

  public getAllUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
  }

  public updateUser(user: User): Observable<User>{
    return this.http.put<User>(`${this.apiServerUrl}/user/update`, user);
  }

  getSummonerId(Region:string, SummonerName:string):Observable<SummonerID>{
    return this.http.get<SummonerID>(
      'https://'+Region+'.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+SummonerName+'?api_key=RGAPI-726045fe-ac06-4ce6-91e8-6b90e825ca29'
    )
  }
}
