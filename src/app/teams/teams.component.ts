import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { Team } from './team';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: Team[] = [];
  constructor(service: GlobalService) { 
    //GET Data [Version 3 Team Service] (from Tommy's Videos -> Plugin + REST API/Content/Angular/Week 6 - HTTP Services)
    service.getTeams() //using '../services/global.service';
      .subscribe(response => {
      console.log(response);
      this.teams = response;
      })
  }

  ngOnInit(): void {
  }

}
