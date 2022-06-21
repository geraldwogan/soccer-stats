import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  teamStatsAdmin: any = [];
  constructor(service: GlobalService) {
    service.getAdmin() //using '../services/global.service';
      .subscribe(response => {
      //console.log(response);
      this.teamStatsAdmin = response;
   })
  }

  ngOnInit(): void {
  }

}
