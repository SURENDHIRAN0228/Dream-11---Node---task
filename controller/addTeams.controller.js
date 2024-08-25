const AddTeams= require('../models/addTeams.model')
const AddFullTeam = require('../models/addTeam.model')

const addTeams = async(req,res) => {
    try {
        var data = req.body;
        
        if(data.teamName != null) {
            
            AddTeams.findOne({teamName: data.teamName}, function returnData(error, result) {
                if(result == null) {
                    var count = 0, bat=0, bowl=0, wk=0, ar=0, team1=0;
                    
                    for(var i=0; i<=10; i++) {
                        var playerName = data.players[i];
                        
                        AddFullTeam.findOne({player: playerName}, function returnData(error, result) {
                            if(!result) {
                                res.send({ status: 400, success: false, msg: "Invalid player name! - "+data.players[count]+ ". Enter valid name or check spilling."});
                            }
                            else {
                                switch(result.role) {
                                    case "BATTER":
                                        bat++;
                                        break
                                    case "ALL-ROUNDER":
                                        ar++;
                                        break
                                    case "BOWLER":
                                        bowl++;
                                        break
                                    case "WICKETKEEPER":
                                        wk++;
                                        break
                                }
                                
                                var nameOfPlayingTeam = result.team
                                
                                switch(nameOfPlayingTeam) {
                                    case "Chennai Super Kings":
                                        team1++;
                                        break
                                }

                                count++;
                                
                                if(count == 11) {
                                    if(bat>=1 && bat <=8 && bowl>=1 && bowl <=8 && ar>=1 && ar <=8 && wk>=1 && wk <=8 && team1<=10 && team1>=1) {
                                        if(data.players.find(item => item == data.caption) && data.players.find(item => item == data.viceCaption)) {
                                            var insertTeam = new AddTeams();

                                            insertTeam.teamName = data.teamName
                                            insertTeam.players = data.players
                                            /*insertTeam.players.player1 = data.players[0]
                                            insertTeam.players.player2 = data.players[1]
                                            insertTeam.players.player3 = data.players[2]
                                            insertTeam.players.player4 = data.players[3]
                                            insertTeam.players.player5 = data.players[4]
                                            insertTeam.players.player6 = data.players[5]
                                            insertTeam.players.player7 = data.players[6]
                                            insertTeam.players.player8 = data.players[7]
                                            insertTeam.players.player9 = data.players[8]
                                            insertTeam.players.player10 = data.players[9]
                                            insertTeam.players.player11 = data.players[10]*/
                                            insertTeam.caption = data.caption
                                            insertTeam.viceCaption = data.viceCaption

                                            insertTeam.save(function resultHandle(error, result) {
                                                if(error) {
                                                    res.send({ status: 400, success: false, msg: error.message});
                                                }
                                                else {
                                                    res.send({ status: 200, success: true, msg: "Your team is successfully inserted!"});
                                                }
                                            });   
                                        }
                                        else {
                                            res.send({ status: 400, success: false, msg: "Please select caption & vice-caption in your selected 11's"});
                                        }              
                                    }
                                    else {
                                        res.send({ status: 400, success: false, msg: "You choose minimum of 1 & maximum of 8 players in every role! and You choose minimum of 1 & maximum of 10 players per team!"});
                                    }
                                }
                            }
                        })   
                    }                    
                }
                else {
                    res.send({ status: 401, success: false, msg: "Team name is already taken. Try another name"});
                }
            });
        }
        else {
            res.send({ status: 401, success: false, msg: "Team name is required"});
        }
    }
    catch(error) {
        res.send({ status: 400, success: false, msg: error.message});
    }
}


module.exports = {
    addTeams
}
