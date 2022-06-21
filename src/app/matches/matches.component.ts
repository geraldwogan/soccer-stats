import { Component, OnInit } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { GlobalService } from '../services/global.service';
import * as _ from 'underscore';

@Component({
	selector: 'app-matches',
	templateUrl: './matches.component.html',
	styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  
	totalMatches: any = []; //all matches from all seasons
	matches: any = []; // for filtered data
	seasons: any = []; // list of seasons
	teamNames: any []; // list of team names
	seasonSel: string = "All";
	teamSel: string = "All";
	constructor(service: GlobalService) 
	{ 
		//GET Data [Version 3 Team Service] (from Tommy's Videos -> Plugin + REST API/Content/Angular/Week 6 - HTTP Services)
		service.getMatches() //using '../services/global.service';
		.subscribe(response => 
		{
			//console.log(response);
			this.totalMatches = response;
			this.matches = response;
			this.seasons = _.uniq(_.pluck(this.totalMatches, 'season'));
			this.teamNames = _.sortBy(_.uniq(_.pluck(this.totalMatches, 'HomeTeam')));
			//console.log(this.seasons)
			//console.log(this.teamNames)
		})
	}  

  	seasonFilter(event)
	{
    	this.seasonSel = event.target.value;
    	this.filtering();
  	}

  	teamFilter(event)
	{
    	this.teamSel = event.target.value;
    	this.filtering();
  	}

	//handles all filtering
	filtering(){
		//console.log("  team: "+this.teamSel) 
		//console.log("season: "+this.seasonSel)

		//Had to use temp variables - I was getting a "Cannot read property 'teamSel' of undefined" error when using this.teamSel or this.seasonSel.
		let tempSeason = this.seasonSel;
		let tempTeam = this.teamSel;

		if(this.seasonSel ==="All" && this.teamSel==="All")
		{
			this.matches=this.totalMatches;
		}
		else if(this.seasonSel ==="All" && this.teamSel!="All")
		{
			//filter for just the matches from x team
			this.matches = _.filter(this.totalMatches, function(match)
			{ 
				{return match.HomeTeam == tempTeam || match.AwayTeam == tempTeam}
			});
			//console.log(this.matches)
		}
		else if(this.seasonSel!="All" && this.teamSel==="All")
		{
			//filter for just the matches from x season
			this.matches = _.filter(this.totalMatches, function(match)
			{ 
				return match.season === tempSeason
			});
			//console.log(this.matches)
		}
		else
		{
			//combinational filter for just the matches from x team from x season
			this.matches = _.filter(this.totalMatches, function(match)
			{ 
				{return match.season === tempSeason && (match.HomeTeam === tempTeam || match.AwayTeam === tempTeam)}
			});
			//console.log(this.matches)
		}
	}

  ngOnInit(): void {
  }

}
