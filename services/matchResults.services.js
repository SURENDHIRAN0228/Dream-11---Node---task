const AddMatchResultsTeam = require('../models/addMatchResult.model')
const AddFullTeam = require('../models/addTeam.model')

module.exports.processResult =(data) => {
    //handling all the urls
    return new Promise(async function teamResult(resolve, reject) {
        //console.log(data)
        var battingPoints=0, bowlingPoints=0, fieldingPoints=0, totalPoints = 0;
            AddMatchResultsTeam.find({batter: data.player}, function returnIsBatter(error, result1) {
                if(error) {
                    reject(false);
                }
                else {
                    if(!result1.length == 0) {
                        var boundaryBonus=0,sixerBonus=0,runs=0
                        for(var j=0; j<result1.length; j++) {
                            runs+=result1[j].batsman_run
                            if(result1[j].batsman_run == 4 || result1[j].batsman_run == 5) {
                                boundaryBonus+=1
                            }
                            if(result1[j].batsman_run == 6) {
                                sixerBonus+=2
                            }
                        }
                        if(runs==0) {
                            battingPoints-=2
                        } else {
                            battingPoints += (runs>100? runs+16: (runs>50?runs+8 : (runs>30? runs+4: runs)))+boundaryBonus+sixerBonus
                            //console.log(battingPoints)
                        }
                        console.log(battingPoints +" - batting point")
                        resolve(battingPoints);
                    }
                    else {
                        battingPoints=0
                        console.log(battingPoints +" - batting point")
                        resolve(battingPoints);
                        //console.log("he is not played batting")
                    } 
                      
                }
            })
        
    })
}
module.exports.processResult1 =(data) => {
    //handling all the urls
    return new Promise(async function teamResult(resolve, reject) {
        //console.log(data)
        var battingPoints=0, bowlingPoints=0, fieldingPoints=0, totalPoints = 0;
        AddMatchResultsTeam.find({bowler: data.player}, function returnIsBowler(error, result2) {
            if(error) {
                reject(false);
            }
            else {
                if(!result2.length == 0) {
                    var noOfWickets=0, bonusPoints=0, overs = [], overNum = 0, overNumbers = [], ballno = 0
                    for(var j=0; j<result2.length; j++) {
                        if (!overs.includes(result2[j].overs)) {
                            overs.push(result2[j].overs);
                            overNumbers[overNum++]=[]
                            ballno = 0
                        }
                        overNumbers[overs.length-1][ballno++] = result2[j].total_run
                        if(result2[j].isWicketDelivery == 1 && result2[j].kind != 'Run Out') {
                            noOfWickets++
                            if(result2[j].kind == 'bowled' || result2[j].kind == 'lbw' || result2[j].kind == 'caught and bowled') {
                                bonusPoints+=8
                            }
                        }
                    }
                    var runsInOver=0, maiden=0
                    for(var a=0; a<overs.length; a++) {
                        for(var b=0; b<overNumbers[a].length; b++) {
                            runsInOver += overNumbers[a][b]
                        }
                        if(runsInOver == 0) {
                            maiden++
                        }
                        //console.log(runsInOver) //16,4,5,3
                        runsInOver=0
                    }
                    bowlingPoints = (noOfWickets>=5? noOfWickets*25+16 : (noOfWickets>=4? noOfWickets*25+8 : (noOfWickets>=3? noOfWickets*25+4 : noOfWickets*25))) + maiden*12 + bonusPoints
                    console.log(bowlingPoints +" - bowling point")
                    resolve(bowlingPoints);
                }
                else {
                    bowlingPoints=0
                    console.log(bowlingPoints +" - bowling Points")
                    resolve(bowlingPoints);
                    //console.log("He is not bowled!")
                }
        //resolve(result);
            }
        })
        
    })
}

module.exports.processResult2 =(data) => {
    //handling all the urls
    return new Promise(async function teamResult(resolve, reject) {
        //console.log(data)
        var battingPoints=0, bowlingPoints=0, fieldingPoints=0, totalPoints = 0;
        AddMatchResultsTeam.find({fielders_involved: data.player}, async function returnIsBowler(error, result3) {
            if(error) {
                reject(false);
            }
            else {
                if(!result3.length == 0) {
                    var caught=0,stumping=0,runout=0
                    for(var k=0; k<result3.length; k++) {
                        switch(result3[k].kind) {
                            case 'stumping':
                                stumping++
                                break
                            case 'caught':
                                caught++
                                break
                            case 'runout':
                                runout++
                                break
                        }
                    }
                    fieldingPoints = stumping*12 + runout*6 + (caught>2? caught*8+4 : caught*8)
                    console.log(fieldingPoints +" - Fielding points")
                    resolve(fieldingPoints);
                   

                }
                else {
                    fieldingPoints=0
                    console.log(fieldingPoints+" - Fielding points")
                    resolve(fieldingPoints);
                   
                }
            }
        })
        
    })
}

module.exports.processResult3 =(data,totalPoints) => {
    //handling all the urls
    return new Promise(async function teamResult(resolve, reject) {
        console.log(data.player)
            var data1 = {
                points : totalPoints
            }
            console.log(data1)
            AddFullTeam.findOneAndUpdate(data._id,data1, function returnData1(error, result) {
                if(error) {
                    //reject(false); 
                    console.log(error)
                }
                else {
                    resolve(result);
                    //console.log()
                }
            });
        })
}

/*module.exports.processResult =(data) => {
    //handling all the urls
    return new Promise(async function teamResult(resolve, reject) {
        //console.log(data)
        var battingPoints=0, bowlingPoints=0, fieldingPoints=0, totalPoints = 0;
        for(var i=0; i<1; i++) {
            await AddMatchResultsTeam.find({batter: data.player}, function returnIsBatter(error, result1) {
                if(error) {
                    reject(false);
                }
                else {
                    if(!result1.length == 0) {
                        var boundaryBonus=0,sixerBonus=0,runs=0
                        for(var j=0; j<result1.length; j++) {
                            runs+=result1[j].batsman_run
                            if(result1[j].batsman_run == 4 || result1[j].batsman_run == 5) {
                                boundaryBonus+=1
                            }
                            if(result1[j].batsman_run == 6) {
                                sixerBonus+=2
                            }
                        }
                        if(runs==0) {
                            battingPoints-=2
                        } else {
                            battingPoints += (runs>100? runs+16: (runs>50?runs+8 : (runs>30? runs+4: runs)))+boundaryBonus+sixerBonus
                            //console.log(battingPoints)
                        }
                        console.log(battingPoints +" - batting point")
                    }
                    else {
                        battingPoints=0
                        console.log(battingPoints +" - batting point")
                        //console.log("he is not played batting")
                    } 
                      
                }
            })
            await AddMatchResultsTeam.find({bowler: data._id}, function returnIsBowler(error, result2) {
                if(error) {
                    reject(false);
                }
                else {
                    if(!result2.length == 0) {
                        var noOfWickets=0, bonusPoints=0, overs = [], overNum = 0, overNumbers = [], ballno = 0
                        for(var j=0; j<result2.length; j++) {
                            if (!overs.includes(result2[j].overs)) {
                                overs.push(result2[j].overs);
                                overNumbers[overNum++]=[]
                                ballno = 0
                            }
                            overNumbers[overs.length-1][ballno++] = result2[j].total_run
                            if(result2[j].isWicketDelivery == 1 && result2[j].kind != 'Run Out') {
                                noOfWickets++
                                if(result2[j].kind == 'bowled' || result2[j].kind == 'lbw' || result2[j].kind == 'caught and bowled') {
                                    bonusPoints+=8
                                }
                            }
                        }
                        var runsInOver=0, maiden=0
                        for(var a=0; a<overs.length; a++) {
                            for(var b=0; b<overNumbers[a].length; b++) {
                                runsInOver += overNumbers[a][b]
                            }
                            if(runsInOver == 0) {
                                maiden++
                            }
                            //console.log(runsInOver) //16,4,5,3
                            runsInOver=0
                        }
                        bowlingPoints = (noOfWickets>=5? noOfWickets*25+16 : (noOfWickets>=4? noOfWickets*25+8 : (noOfWickets>=3? noOfWickets*25+4 : noOfWickets*25))) + maiden*12 + bonusPoints
                        //console.log(bowlingPoints)
                    }
                    else {
                        bowlingPoints=0
                        //console.log("He is not bowled!")
                    }
            //resolve(result);
                }
            })
            AddMatchResultsTeam.find({fielders_involved: data.player}, async function returnIsBowler(error, result3) {
                if(error) {
                    reject(false);
                }
                else {
                    if(!result3.length == 0) {
                        var caught=0,stumping=0,runout=0
                        for(var k=0; k<result3.length; k++) {
                            switch(result3[k].kind) {
                                case 'stumping':
                                    stumping++
                                    break
                                case 'caught':
                                    caught++
                                    break
                                case 'runout':
                                    runout++
                                    break
                            }
                        }
                        fieldingPoints = stumping*12 + runout*6 + (caught>2? caught*8+4 : caught*8)
                        //console.log(fieldingPoints)
                        totalPoints = battingPoints + bowlingPoints + fieldingPoints
                        console.log(totalPoints+" - "+ result3[0].fielders_involved)
                        resolve(totalPoints);
                        /*var data1 = {
                            points: totalPoints
                        }
                        
                        await AddFullTeam.findOneAndUpdate(data.player,data1, function returnData1(error, results1) {
                            if(error) {
                                reject(false);
                            }
                            else {
                                resolve(results1);
                                //console.log()
                            }
                        });*

                    }
                    else {
                        fieldingPoints=0
                        totalPoints = battingPoints + bowlingPoints + fieldingPoints;
                        console.log(totalPoints+" - "+data.player)
                        resolve(totalPoints);
                       /* var data1 = {
                            points: totalPoints
                        }
                        
                        await AddFullTeam.findByIdAndUpdate(data._id,data1, async function returnData2(error, results2) {
                            if(error) {
                                reject(false);
                            }
                            else {
                                await resolve(results2);
                                //console.log()
                            }
                        });* /
                    }
                }
            })
            //resolve(true);
            
        }
        //totalPoints = battingPoints + bowlingPoints + fieldingPoints
        //console.log(totalPoints)

    });
}
/*
var data = {
    points: totalPoints
}

AddFullTeam.findOneAndUpdate(data.player,data, function returnData(error, result) {
    if(error) {
        reject(false);
    }
    else {
        resolve(result);
    }
});

/*async function processResult(data) {

    try {
        //console.log(data.players)
        for(var i=0; i<1; i++) {
            await AddMatchResultsTeam.find({batter: data.players[i]}, function returnIsBatter(error, result) {
                if(error) {
                    console.log(error.message)
                    return false
                    //res.send({ status: 400, success: false, msg: error.message});
                }
                else {
                    var runs = result
                        console.log(runs)
                    
                }
            })
        }

    }
    catch(error) {
        console.log(error)
    }

}


module.exports = {
    processResult
}


/*
const AddTeams= require('../models/addTeams.model')
const AddMatchResultsTeam = require('../models/addMatchResult.model')

module.exports.processResult =(data) => {
    //handling all the urls
    return new Promise(function teamResult(resolve, reject) {
        var battingPoints=0, bowlingPoints=0, fieldingPoints=0, totalPoints = 0;
        for(var i=0; i<11; i++) {
            AddMatchResultsTeam.find({batter: data.players[i]}, function returnIsBatter(error, result1) {
                if(error) {
                    reject(false);
                }
                else {
                    if(!result1.length == 0) {
                        var boundaryBonus=0,sixerBonus=0,runs=0
                        for(var j=0; j<result1.length; j++) {
                            runs+=result1[j].batsman_run
                            if(result1[j].batsman_run == 4 || result1[j].batsman_run == 5) {
                                boundaryBonus+=1
                            }
                            if(result1[j].batsman_run == 6) {
                                sixerBonus+=2
                            }
                        }
                        if(runs==0) {
                            battingPoints-=2
                        } else {
                            battingPoints = (runs>100? runs+16: (runs>50?runs+8 : (runs>30? runs+4: runs)))
                            //console.log(battingPoints)
                            battingPoints+=boundaryBonus+sixerBonus
                        }
                        //console.log(battingPoints)
                    }
                    else {
                        battingPoints=0
                        //console.log("he is not played batting")
                    } 
                      
                }
            })
            AddMatchResultsTeam.find({bowler: data.players[i]}, function returnIsBowler(error, result2) {
                if(error) {
                    reject(false);
                }
                else {
                    if(!result2.length == 0) {
                        var noOfWickets=0, bonusPoints=0, overs = [], overNum = 0, overNumbers = [], ballno = 0
                        for(var j=0; j<result2.length; j++) {
                            if (!overs.includes(result2[j].overs)) {
                                overs.push(result2[j].overs);
                                overNumbers[overNum++]=[]
                                ballno = 0
                            }
                            overNumbers[overs.length-1][ballno++] = result2[j].total_run
                            if(result2[j].isWicketDelivery == 1 && result2[j].kind != 'Run Out') {
                                noOfWickets++
                                if(result2[j].kind == 'bowled' || result2[j].kind == 'lbw' || result2[j].kind == 'caught and bowled') {
                                    bonusPoints+=8
                                }
                            }
                        }
                        var runsInOver=0, maiden=0
                        for(var a=0; a<overs.length; a++) {
                            for(var b=0; b<overNumbers[a].length; b++) {
                                runsInOver += overNumbers[a][b]
                            }
                            if(runsInOver == 0) {
                                maiden++
                            }
                            //console.log(runsInOver) //16,4,5,3
                            runsInOver=0
                        }
                        bowlingPoints = (noOfWickets>=5? noOfWickets*25+16 : (noOfWickets>=4? noOfWickets*25+8 : (noOfWickets>=3? noOfWickets*25+4 : noOfWickets*25))) + maiden*12 + bonusPoints
                        //console.log(bowlingPoints)
                    }
                    else {
                        bowlingPoints=0
                        //console.log("He is not bowled!")
                    }
            //resolve(result);
                }
            })
            AddMatchResultsTeam.find({fielders_involved: data.players[i]}, function returnIsBowler(error, result3) {
                if(error) {
                    reject(false);
                }
                else {
                    if(!result3.length == 0) {
                        var caught=0,stumping=0,runout=0
                        for(var k=0; k<result3.length; k++) {
                            switch(result3[k].kind) {
                                case 'stumping':
                                    stumping++
                                    break
                                case 'caught':
                                    caught++
                                    break
                                case 'runout':
                                    runout++
                                    break
                            }
                        }
                        fieldingPoints = stumping*12 + runout*6 + (caught>2? caught*8+4 : caught*8)
                        //console.log(fieldingPoints)
                        totalPoints = battingPoints + bowlingPoints + fieldingPoints
                        console.log(totalPoints+" - "+ result3[0].fielders_involved)
                    }
                    else {
                        fieldingPoints=0
                        totalPoints = battingPoints + bowlingPoints + fieldingPoints
                        console.log(totalPoints)
                    }
                }
            })
             
            
        }
        //totalPoints = battingPoints + bowlingPoints + fieldingPoints
        //console.log(totalPoints)

    });
}
*/