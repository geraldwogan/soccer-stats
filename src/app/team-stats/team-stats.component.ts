import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-team-stats',
  templateUrl: './team-stats.component.html',
  styleUrls: ['./team-stats.component.css']
})
export class TeamStatsComponent implements OnInit {

  teamstats: any = [];
  constructor(service: GlobalService) { 
    //GET Data [Version 3 Team Service] (from Tommy's Videos -> Plugin + REST API/Content/Angular/Week 6 - HTTP Services)
    service.getTeamStats() //using '../services/global.service';
      .subscribe(response => {
      //console.log(response);
      this.teamstats = response;
      })
  }  


  ngOnInit(): void {
  }

}
