import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-team-admin',
  templateUrl: './team-admin.component.html',
  styleUrls: ['./team-admin.component.css']
})
export class TeamAdminComponent implements OnInit {

  service;
  team:any = [];
  constructor(service: GlobalService, private activatedRoute: ActivatedRoute) {
    //console.log(this.activatedRoute.snapshot.params.teamcode)
    service.getTeamAdmin(this.activatedRoute.snapshot.params.teamcode) //using '../services/global.service';
      .subscribe(response => {
      //console.log(response[0].team);
      //console.log(response);
      this.team = response;
      })
      this.service=service;
   }

   // This methods runs when a button on the form is clicked.
  onSubmit(f){

    //console.log(f);
    //console.log(f.value);
    //console.log(f.value.hGoalsFor);

    // check if form is valid.
    // all inputs that have the keyword required added to them, also set min to 0
    // this means they need not null values for the form to be valid.
    if (f.valid) {

      // print confirmation message
      //console.log("Form Is Valid");
      //console.log(typeof f.value);
      //console.log(f.value);
      
      let teamAdminData = [
        {
        hGoalsFor: f.value.hGoalsFor,
        hGoalsAgainst: f.value.hGoalsAgainst,
        aGoalsFor: f.value.aGoalsFor,
        aGoalsAgainst: f.value.aGoalsAgainst,
        "teamcode" : this.activatedRoute.snapshot.params.teamcode
        }
      ];

       //console.log(teamAdminData);
       this.service.putTeamAdmin(this.activatedRoute.snapshot.params.teamcode, teamAdminData) //using '../services/global.service';
       .subscribe(response => {
       //console.log(response);
       })

      // // clear the values of the form.
      // f.reset(); 

    }
    else // print that the form is not valid
    {
      console.log("Form Is Not Valid");
    }


  }

  ngOnInit(): void {
  }

}
