import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css']
})
export class SeasonsComponent implements OnInit {

  service;
  teamNames: any = [];
  teams: any = [];
  constructor(service: GlobalService) { 
  let teamName: string = "Arsenal";

    service.getTeams() //using '../services/global.service';
      .subscribe(response => {
      //console.log(response);
      this.teamNames = response;
      })

    service.getSeasonsTeam(teamName) //using '../services/global.service';
      .subscribe(response => {
      //console.log(response);
      this.teams = response;
      })

      this.service=service;

  }

  teamFilter(event){

      //console.log(event.target.value)
      let values = [{teamName:event.target.value}]
      this.service.getSeasonsTeam(event.target.value) //using '../services/global.service';
        .subscribe(response => {
        //console.log(response);
        this.teams = response;
        })
  }

  ngOnInit(): void {
  }

}
