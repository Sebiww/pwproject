import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './core/components/authentication/authentication.component';
import { CheckstatsComponent } from './core/components/checkstats/checkstats.component';
import { CompareaccountsComponent } from './core/components/compareaccounts/compareaccounts.component';
import { HomeComponent } from './core/components/home/home.component';
import { LatestpatchComponent } from './core/components/latestpatch/latestpatch.component';
import { LinkaccountComponent } from './core/components/linkaccount/linkaccount.component';
import { ViewguidesComponent } from './core/components/viewguides/viewguides.component';
import { ViewleaderboardComponent } from './core/components/viewleaderboard/viewleaderboard.component';

const routes: Routes = [
  {
    path: 'authentication',
    component: AuthenticationComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'home/view-guides',
    component: ViewguidesComponent
  },
  {
    path: 'home/view-leaderboard',
    component: ViewleaderboardComponent
  },
  {
    path: 'home/latest-patch',
    component: LatestpatchComponent  
  },
  {
    path: 'home/link-account',
    component: LinkaccountComponent
  },
  {
    path: 'home/check-stats',
    component: CheckstatsComponent
  },
  {
    path: 'home/compare-accounts',
    component: CompareaccountsComponent
  },
  {
    path: "**",
    redirectTo: '/authentication'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
