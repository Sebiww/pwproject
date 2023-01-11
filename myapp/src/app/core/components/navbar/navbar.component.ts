import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToViewGuides(){
    this.router.navigate(['/home/view-guides']);
}
  goToViewLeaderboard(){
  this.router.navigate(['/home/view-leaderboard']);
}
  goToLatestPatch(){
  this.router.navigate(['/home/latest-patch']);
}
  goToLinkAccount(){
  this.router.navigate(['/home/link-account']);
}
  goToCheckStats(){
  this.router.navigate(['/home/check-stats']);
}
goToCompareAccounts(){
  this.router.navigate(['/home/compare-accounts']);
}
goToHome(){
  this.router.navigate(['/home']);
}

goToLogin(){
  this.router.navigate(['/authentication'])
}
}
