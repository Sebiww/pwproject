import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './core/components/authentication/authentication.component';
import { HomeComponent } from './core/components/home/home.component';
import { ViewguidesComponent } from './core/components/viewguides/viewguides.component';
import { ViewleaderboardComponent } from './core/components/viewleaderboard/viewleaderboard.component';
import { CompareaccountsComponent } from './core/components/compareaccounts/compareaccounts.component';
import { LinkaccountComponent } from './core/components/linkaccount/linkaccount.component';
import { CheckstatsComponent } from './core/components/checkstats/checkstats.component';
import { LatestpatchComponent } from './core/components/latestpatch/latestpatch.component';
import { SearchComponent } from './core/components/search/search.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { SearchsummonerComponent } from './core/components/searchsummoner/searchsummoner.component';
import { LaddersearchComponent } from './core/components/laddersearch/laddersearch.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HomeComponent,
    ViewguidesComponent,
    ViewleaderboardComponent,
    CompareaccountsComponent,
    LinkaccountComponent,
    CheckstatsComponent,
    LatestpatchComponent,
    SearchComponent,
    NavbarComponent,
    SearchsummonerComponent,
    LaddersearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
