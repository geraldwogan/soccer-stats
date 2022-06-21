import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-shots',
  templateUrl: './shots.component.html',
  styleUrls: ['./shots.component.css']
})
export class ShotsComponent implements OnInit {

  shots: any = [];
  constructor(service: GlobalService) {
    service.getShots() //using '../services/global.service';
      .subscribe(response => {
      //console.log(response);
      this.shots = response;
   })
  }

  ngOnInit(): void {
  }

}
