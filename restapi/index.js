var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var model = require('./model/db.js');  //
const { values } = require("underscore");

var app = express();
app.use(cors());

// serves files in public folder
app.use(express.static('public'));

// NB:: this must be included to get JSON content sent with requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

////////////////////////////////////////////////////////////////////////////////////////////

// REST API / GET route
app.route('/summary')
.get(function (req, res) {  
  model.getSummary(req, res);
})

// REST API /teams GET route
app.route('/teams/')
.get(function (req, res) {  
  model.getTeams(req, res);
})

// REST API /team/teamcode GET route 
app.route('/teams/:teamcode?')
.get(function (req, res) {  
  model.getTeam(req, res);
})

// REST API /teamStats GET route
app.route('/teamstats/')
.get(function (req, res) {  
  model.getTeamStats(req, res);
});

// REST API /teamstats/teamcode GET route 
app.route('/teamstats/:teamcode?')
.get(function (req, res) {  
  model.getTeamStatsTeam(req, res);
})

// REST API /teamWins/teamName GET route 
app.route('/teamWins/:teamName?')
.get(function (req, res) {  
  model.getTeamWinPercs(req, res);
})

// REST API /Matches GET route
app.route('/matches/')
.get(function (req, res) {  
  model.getMatches(req, res);
});

// REST API /seasons GET route
app.route('/seasons/')
.get(function (req, res) {  
  model.getSeasons(req, res);
});

// REST API /seasons GET route
app.route('/seasons/:teamName?')
.get(function (req, res) {  
  model.getSeasonsTeam(req, res);
});

// REST API /shots GET route
app.route('/shots?')
.get(function (req, res) {  
  model.getShots(req, res);
});

// REST API /admin GET route
app.route('/admin?')
.get(function (req, res) {  
  model.getAdmin(req, res);
});

// REST API /teamAdmin GET route
app.route('/teamAdmin/:teamcode?')
.get(function (req, res) {  
  model.getTeamAdmin(req, res);
});

// REST API /teamAdmin PUT route
app.route('/teamAdmin/:teamcode?')
.put(function (req, res) { // edit
  model.putTeamAdmin(req, res);
})

///////////////////////////////////////////////////////////////////////////////////////////
var myServer = app.listen(3000, function() {
  console.log("epl2021 Server listening on port 3000");
});
