import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeStats: any = [];
  constructor(service: GlobalService) { 
    service.getSummary() //using '../services/global.service';
      .subscribe(response => {
      //console.log(response);
      this.homeStats = response;
   })
  }

  ngOnInit(): void {
  }

}
