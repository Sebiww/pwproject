import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SummonerID } from 'src/app/models/summoner-id';
import { User } from 'src/app/models/user';
import { LinkaccountService } from 'src/app/services/linkaccount.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-linkaccount',
  templateUrl: './linkaccount.component.html',
  styleUrls: ['./linkaccount.component.scss']
})
export class LinkaccountComponent implements OnInit {

  public linkedAcc: boolean = false;
  public newUser: User = {} as User;
  public summonerExists: boolean = false;
  public showErrorText: boolean = false;

  public inputValue: string = '';
  public selectedOption: string = ''
  options = [
    { label: 'EU North East', value: 'eun1' },
    { label: 'EU West', value: 'euw1' },
    { label: 'North America', value: 'na1' },
    { label: 'Brasil', value: 'br1' },
    { label: 'Korea', value: 'kr' },
    { label: 'Japan', value: 'jp1' }
  ];

  constructor(private router: Router, private http: HttpClient, private linkaccountService: LinkaccountService) { }

  /*public getUsers():void{
    this.userService.getAllUsers().subscribe(
      (respone: User[]) => {
        this.users = respone;
      },
      (error: HttpErrorResponse) => {
        console.log("eroare");
      }
    );
  }*/

  public checkForExist():boolean{
    if(this.showErrorText === false)
      return false;
      else
      return true;
  }
  public testSelection():boolean{
    if(this.selectedOption != 'Select a region')
      return true;
      else return false;
  }

  public checkIfSummonerExists():void{
    this.linkaccountService.getSummonerId(this.selectedOption, this.inputValue).subscribe(
      (response: SummonerID) => {
        this.summonerExists = true;
        this.showErrorText = false;
        this.getUser();
      },
      (error: HttpErrorResponse) => {
        console.log("eroare");
        this.summonerExists = false;
        this.showErrorText = true;
      }
    );
  }

  public getUser():void{
    this.linkaccountService.getAllUsers().subscribe(
      (response: User[]) => {
        
        response[response.findIndex(x =>  x.username === environment.usernameglobal)].lolaccount = this.inputValue;
        console.log(response[response.findIndex(x =>  x.username === environment.usernameglobal)].lolaccount);
        this.linkaccountService.updateUser(response[response.findIndex(x =>  x.username === environment.usernameglobal)]).subscribe(
          (response: User) => {
            environment.lolaccountvar = this.inputValue;
            this.linkedAcc = true;
          },
          (error: HttpErrorResponse) =>{
            console.log('error');
          }
        )
      },
      (error: HttpErrorResponse) => {
        console.log('eroare');
      }
    )
  }
  ngOnInit(): void {
    console.log(environment.lolaccountvar);
    console.log(environment.usernameglobal);
    if(environment.lolaccountvar != 'unknown' && environment.lolaccountvar != null)
      this.linkedAcc = true;
    else
      this.linkedAcc = false;
    this.selectedOption = 'Select a region'
  }

}
