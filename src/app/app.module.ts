import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TeamsComponent } from './teams/teams.component';
import { HeaderComponent } from './header/header.component';
import { GlobalService } from './services/global.service';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamStatsComponent } from './team-stats/team-stats.component';
import { TeamComponent } from './team/team.component';
import { MatchesComponent } from './matches/matches.component';
import { SeasonsComponent } from './seasons/seasons.component';
import { ShotsComponent } from './shots/shots.component';
import { AdminComponent } from './admin/admin.component';
import { TeamAdminComponent } from './team-admin/team-admin.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    TeamsComponent,
    TeamStatsComponent,
    TeamComponent,
    MatchesComponent,
    SeasonsComponent,
    ShotsComponent,
    AdminComponent,
    TeamAdminComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '', //localhost:4200
        component: HomeComponent
      },
      {
        path: 'teams', //localhost:4200/teams
        component: TeamsComponent
      },
      {
        path: 'team/:teamcode', //localhost:4200/team/?teamcode
        component: TeamComponent
      },
      {
        path: 'teamstats', //localhost:4200/teamstats
        component: TeamStatsComponent
      },
      {
        path: 'matches', //localhost:4200/matches
        component: MatchesComponent
      },
      {
        path: 'seasons', //localhost:4200/seasons
        component: SeasonsComponent
      },
      {
        path: 'shots', //localhost:4200/shots
        component: ShotsComponent
      },
      {
        path: 'admin', //localhost:4200/admin
        component: AdminComponent
      },
      {
        path: 'teamAdmin/:teamcode', //localhost:4200/teamAdmin/:teamcode?
        component: TeamAdminComponent
      },
      {
        path: '**', //404 error - bad route
        component: HomeComponent //could write an error page.
      }
    ])
    
  ],

  providers: [GlobalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
