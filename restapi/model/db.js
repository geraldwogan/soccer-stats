var mysql = require('mysql');

///////////////////////////////////////////////////////////////////////////////////////////

// Setup MySQL connection
// timezone is very NB

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'epl2021',
  timezone : 'utc+0'  
});

connection.connect(function(err){
    console.log(`Attempting to connect to MySQL database epl2021`);

	if(err) throw err;
	console.log(`Successfully connected to MySQL database epl2021`);
});

///////////////////////////////////////////////////////////////////////////////////////////

// GET /summary
// | Seasons | Matches | Teams | Referee |
// | Goals | Gls/Match | Shots | Sts/Match |
// | Cln Sheets | Home Cln (%) | Away Cln (%) |
exports.getSummary = function(req,res){
    //console.log(`${req.params.id}`);
    // (SUM(FTHG) + SUM(FTAG)) / COUNT(*) as glsPerMatch,
    // (SUM(HSHOTS) + SUM(ASHOTS)) / COUNT(*) as shotsPerMatch,
    // COUNT(CASE WHEN FTHG<1 then 1 end) + COUNT(CASE WHEN FTAG <1 then 1 end) as totalClnSheets,
    // (100 / (COUNT(CASE WHEN FTHG<1 then 1 end) + COUNT(CASE WHEN FTAG <1 then 1 end)))* COUNT(CASE WHEN FTAG<1 then 1 end) as hClnSheetsPerc,
    // (100 / (COUNT(CASE WHEN FTHG<1 then 1 end) + COUNT(CASE WHEN FTAG <1 then 1 end)))* COUNT(CASE WHEN FTHG<1 then 1 end) as aClnSheetsPerc

    connection.query(`SELECT     
    COUNT(*) as noOfMatches, 
    COUNT(DISTINCT season) as noOfSeasons, 
    COUNT(DISTINCT HomeTeam) as noOfTeams, 
    COUNT(DISTINCT referee) as noOfReferees, 
    SUM(FTHG) + SUM(FTAG) as goalsScored, 
    SUM(HSHOTS) + SUM(ASHOTS) as totalShotsFor,
    COUNT(CASE WHEN FTHG<1 then 1 end) as awayCleanSheets,
    COUNT(CASE WHEN FTAG<1 then 1 end) as homeCleanSheets
    FROM matches`, function(err, rows, fields) {
        if (err) throw err;

        res.status(200);  // OK
        res.send(JSON.stringify(rows));	  
    });	
}

// GET /teams
exports.getTeams = function(req,res){
    connection.query(`SELECT * FROM teams ORDER BY name ASC`, function(err, rows, fields) {
        if (err) throw err;

        res.status(200);  // OK
        res.send(JSON.stringify(rows));	  
    });	
}

// GET /team/teamcode
exports.getTeam = function(req,res){
    //console.log(req.params.teamcode);
    connection.query(`SELECT * FROM teams WHERE teamCode='${req.params.teamcode}'`, function(err, rows, fields) {
        if (err) throw err;
        res.status(200);  // OK
        res.send(JSON.stringify(rows));	  
    });
}

// GET teamStats
// Name | Played | Won | Drawn | Lost | Win% | Gls for | Gls Agt | Gls Dif
exports.getTeamStats = function(req,res){
    connection.query(`SELECT *
                    FROM teamstats
                    ORDER BY team ASC`, function(err, rows, fields) {
      res.status(200);  // OK
      res.send(JSON.stringify(rows));	  
  });	
}

// GET /teamstats/teamcode
exports.getTeamStatsTeam = function(req,res){
    //console.log(req.params.teamcode);
    connection.query(`SELECT * FROM teamstats WHERE teamCode='${req.params.teamcode}'`, function(err, rows, fields) {
        if (err) throw err;
        res.status(200);  // OK
        res.send(JSON.stringify(rows));	  
    });
}

// GET /teamWins/teamName
exports.getTeamWinPercs = function(req,res){
    //console.log(req.params.teamName);
    let teamName = req.params.teamName;
    connection.query(`SELECT season,
    COUNT(CASE WHEN HomeTeamCode='${teamName}' OR AwayTeamCode='${teamName}' then 1 end) as played,
    COUNT(CASE WHEN (FTHG>FTAG AND HomeTeamCode='${teamName}') OR ( FTAG>FTHG AND AwayTeamCode='${teamName}') then 1 end) as wins,
    (100/COUNT(CASE WHEN HomeTeamCode='${teamName}' OR AwayTeamCode='${teamName}' then 1 end))*COUNT(CASE WHEN (FTHG>FTAG AND HomeTeamCode='${teamName}') OR ( FTAG>FTHG AND AwayTeamCode='${teamName}') then 1 end) as winPerc
    FROM matches GROUP BY season`, function(err, rows, fields) {
        if (err) throw err;
        res.status(200);  // OK
        res.send(JSON.stringify(rows));	  
    });
}

// GET /matches
// Season | Date | Home Team | Home Score | - | Away Score | Away Team | Referee
exports.getMatches = function(req,res){
    connection.query(`SELECT season, date,
                    HomeTeam, HomeTeamCode, AwayTeam, AwayTeamCode,
                    FTHG, FTAG, FTR, HTHG, HTAG, HTR, referee,
                    HSHOTS, ASHOTS, HST, AST, HF, AF, HC, AC, HY, AY, HR, AR, B365H, B365D, B365A
                    FROM matches ORDER BY date, HomeTeam ASC `, function(err, rows, fields) {
        if (err) throw err;
        res.status(200);  // OK
        res.send(JSON.stringify(rows));	  
    });	
}

// GET mseasons
exports.getSeasons = function(req,res){
    connection.query(`SELECT DISTINCT season
    FROM matches ORDER by season ASC`, function(err, rows, fields) {
        if (err) throw err;
        res.status(200);  // OK
        res.send(JSON.stringify(rows));	  
    });	
}

// GET mseasons/teamname
// Team:| Arsenal |V|
// | Season | Played | Pts | W | D | L | GF | GA | GDIFF |
exports.getSeasonsTeam = function(req,res){
    //console.log("GetSeasonsTeam");
    //console.log(req.body);
    teamName = req.params.teamName;
    connection.query(`SELECT season,
    COUNT(CASE WHEN HomeTeam='${teamName}' OR AwayTeam='${teamName}' then 1 end) as played,
    COUNT(CASE WHEN (FTHG>FTAG AND HomeTeam='${teamName}') OR ( FTAG>FTHG AND AwayTeam='${teamName}') then 1 end) as wins,
    COUNT(CASE WHEN FTHG=FTAG AND (HomeTeam='${teamName}' OR AwayTeam='${teamName}') then 1 end) as draws,
    COUNT(CASE WHEN (FTHG<FTAG AND HomeTeam='${teamName}') OR ( FTAG<FTHG AND AwayTeam='${teamName}') then 1 end) as losses,
    SUM(CASE WHEN HomeTeam='${teamName}' then FTHG end) + SUM(CASE WHEN AwayTeam='${teamName}' then FTAG end) as gf,
    SUM(CASE WHEN HomeTeam='${teamName}' then FTAG end) + SUM(CASE WHEN AwayTeam='${teamName}' then FTHG end) as ga
    FROM matches GROUP BY season ORDER by season ASC`, function(err, rows, fields) {
        if (err) throw err;
        res.status(200);  // OK
        res.send(JSON.stringify(rows));	  
    });	
}

// GET /shots
// | Team | Played | GF/M | GA/M | GDIFF/M | SF/M | SA/M | SDIFF/M | SOTF/M | SOTA/M | SOTDIFF/M
exports.getShots = function(req,res){
    connection.query(`SELECT teamCode, team, played, 
                    totalGoalsFor, totalGoalsAgainst, totalGoalsNet,
                    totalShotsFor, totalShotsAgainst, totalShotsNet,
                    totalShotsOnTargetFor, totalShotsOnTargetAgainst, totalShotsOnTargetNet
                    FROM teamstats 
                    ORDER BY team `, function(err, rows, fields) {
        if (err) throw err;
        res.status(200);  // OK
        res.send(JSON.stringify(rows));	  
    });	
}

// GET /admin
// | (teamCode)Team | HomeGoalsFor | HomeGoalsAgs | AwayGoalsFor | AwayGoalsAgs | link(teamCode) |
exports.getAdmin = function(req,res){
    connection.query(`SELECT teamCode, team, hGoalsFor, hGoalsAgainst, aGoalsFor, aGoalsAgainst
                    FROM teamstats 
                    ORDER BY team `, function(err, rows, fields) {
        if (err) throw err;
        res.status(200);  // OK
        res.send(JSON.stringify(rows));	  
    });	
}

// GET /teamAdmin/:teamcode?
exports.getTeamAdmin = function(req,res){
    connection.query(`SELECT teamCode, team, hGoalsFor, hGoalsAgainst, aGoalsFor, aGoalsAgainst
                    FROM teamstats 
                    WHERE teamCode = '${req.params.teamcode}'`, function(err, rows, fields) {
        if (err) throw err;
        res.status(200);  // OK
        res.send(JSON.stringify(rows));	  
    });	
}

// PUT /teamAdmin/:teamcode?
exports.putTeamAdmin = function(req,res){
    //console.log(req.body.params);
    connection.query(`UPDATE teamstats 
                SET hgoalsFor = '${req.body.params[0].hGoalsFor}', 
                hGoalsAgainst = '${req.body.params[0].hGoalsAgainst}', 
                aGoalsFor = '${req.body.params[0].aGoalsFor}', 
                aGoalsAgainst = '${req.body.params[0].aGoalsAgainst}'
                WHERE teamCode = '${req.body.params[0].teamcode}'`,
                       function(err, rows, fields) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
            return;
        }
        res.status(201);  // OK
        //return; // Fixes Error code: 'ERR_HTTP_HEADERS_SENT'

        res.send(JSON.stringify(rows));	  
    });	
}


