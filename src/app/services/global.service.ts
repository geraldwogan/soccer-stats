import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../teams/team';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor( private httpClient: HttpClient) { }
  
  getSummary(){
    return this.httpClient.get('http://localhost:3000/summary');
  }

  getTeams(){
    return this.httpClient.get<Team[]>('http://localhost:3000/teams/');
  }

  getTeamStatsTeam(teamcode: string){
     return this.httpClient.get(`http://localhost:3000/teamstats/${teamcode}`);
  }
  
  getTeam(teamcode: string){
    return this.httpClient.get(`http://localhost:3000/teams/${teamcode}`);
  }

  getTeamWinPercs(teamName: string){
    return this.httpClient.get(`http://localhost:3000/teamWins/${teamName}`);
  }

  getTeamStats(){
    return this.httpClient.get('http://localhost:3000/teamstats/');
  }

  getMatches(){
    return this.httpClient.get(`http://localhost:3000/matches/`);
  }

  getSeasons(){
    return this.httpClient.get(`http://localhost:3000/seasons/`);
  }

  getSeasonsTeam(teamName:string){
    return this.httpClient.get(`http://localhost:3000/seasons/${teamName}`);
  }

  getShots(){
    return this.httpClient.get(`http://localhost:3000/shots/`);
  }

  getAdmin(){
    return this.httpClient.get(`http://localhost:3000/admin/`);
  }

  getTeamAdmin(teamcode: string){
    return this.httpClient.get(`http://localhost:3000/teamAdmin/${teamcode}`);
  }

  putTeamAdmin(teamcode: string, values: any){
    return this.httpClient.put(`http://localhost:3000/teamAdmin/${teamcode}`, {params:values});
  }
}
