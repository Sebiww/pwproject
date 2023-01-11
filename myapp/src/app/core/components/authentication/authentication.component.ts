import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app//models/user';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  public users: User[] = {} as User[];
  public emailExists: boolean = false;
  public userExists: boolean = false;
  public userindex: number = 1;
  public emailindex: number = 1;
  public createExists: boolean = false;

  public passindex: number = 1;
  public vermailindex: number = 1;
  public validare: boolean = false;

  constructor(private router: Router, private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  goToHome(){
    this.router.navigate(['/home']);
}

public getUsers():void{
  this.userService.getAllUsers().subscribe(
    (respone: User[]) => {
      this.users = respone;
    },
    (error: HttpErrorResponse) => {
      console.log("eroare");
    }
  );
}

public onRegister(registerForm: NgForm): void{
  this.userindex = 1;
  this.emailindex = 1;
  this.userExists = false;
  this.emailExists = false;
  this.createExists = false;

  for(let i = 0; i < this.users.length; i++){
    if(this.users[i].username == registerForm.value.username){
      this.userindex = 0;
    }
      
    if(this.users[i].email == registerForm.value.email){
      this.emailindex = 0;
    }
  }
  //console.log(registerForm.value.username);
  //console.log(registerForm.value.email);
  //console.log(this.userindex);
  //console.log(this.emailindex);
  if(this.userindex > 0  && this.emailindex > 0){
    this.userService.addUser(registerForm.value).subscribe(
    (response: User) => {
      //console.log(response);
      this.getUsers();
      this.userExists = false;
      this.emailExists = false;
      this.createExists = true;
      
    },
    (erroor: HttpErrorResponse) => {
      console.log("eroare");
    }
  )
  } else{
    if(this.userindex == 0){
      this.userExists = true;
    } else{
      this.userExists = false;
    }
    if(this.emailindex == 0){
      this.emailExists = true;
    } else{
      this.emailExists = false;
    }
  }
}

public onLogin(loginForm: NgForm){
  this.passindex = 1;
  this.vermailindex = 1;
  this.validare = false;
  
  for(let i = 0; i < this.users.length; i++){
    if(this.users[i].email == loginForm.value.email){
      this.vermailindex = 0;
      if(this.users[i].password == loginForm.value.password){
        this.passindex = 0;
        environment.usernameglobal = this.users[i].username;
        environment.lolaccountvar = this.users[i].lolaccount;
      }
    }
  }

  if(this.passindex > 0 || this.vermailindex > 0){
    this.validare = true;
  } else if(this.passindex == 0 && this.vermailindex == 0){
      this.goToHome();
  }
  
}
}


