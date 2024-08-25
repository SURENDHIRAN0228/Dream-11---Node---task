const { response } = require('express')
const AddMatchResultsTeam = require('../models/addMatchResult.model')

var csv = require('csvtojson');
//var csvParser = require('json2csv').Parser;

const importFiles = async(req,res) => {
    try {
        var addMatchResultsData = [];
        csv()
        .fromFile(req.file.path)
        .then(async(response) => {
            
            for(var x = 0; x < response.length; x++) {
                addMatchResultsData.push({
                    ID: response[x].ID,
                    innings: response[x].innings,
                    overs: response[x].overs,
                    ballnumber: response[x].ballnumber,
                    batter: response[x].batter,
                    bowler: response[x].bowler,
                    nonStriker: response[x].nonStriker,
                    extra_type: response[x].extra_type,
                    batsman_run: response[x].batsman_run,
                    extras_run: response[x].extras_run,
                    total_run: response[x].total_run,
                    non_boundary: response[x].non_boundary,
                    isWicketDelivery: response[x].isWicketDelivery,
                    player_out: response[x].player_out,
                    kind: response[x].kind,
                    fielders_involved: response[x].fielders_involved,
                    BattingTeam: response[x].BattingTeam,
                    });
                    
            }

            await AddMatchResultsTeam.insertMany(addMatchResultsData);
        });

        res.send({ status: 200, success: true, msg: 'CSV imported'});
    }
    catch(error) {
        res.send({ status: 400, success: false, msg: error.message});
    }
}


module.exports = {
    importFiles
}
