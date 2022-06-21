import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  teamWinPercs:any = [];
  team:any = [
    {teamCode : "ARS"}
  ];
  constructor(service: GlobalService, private activatedRoute: ActivatedRoute) {
    //console.log(this.activatedRoute.snapshot.params.teamcode)
    service.getTeamStatsTeam(this.activatedRoute.snapshot.params.teamcode) //using '../services/global.service';
      .subscribe(response => {
      //console.log(response[0].team);
      //console.log(response);
      this.team = response;
      })

    service.getTeamWinPercs(this.activatedRoute.snapshot.params.teamcode) //using '../services/global.service';
      .subscribe(response => {
      //console.log(response);
      this.teamWinPercs = response;
      })
   }

  ngOnInit(): void {
  }

}
