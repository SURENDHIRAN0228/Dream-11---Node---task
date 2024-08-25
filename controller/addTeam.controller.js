const { response } = require('express')
const AddFullTeam = require('../models/addTeam.model')

var csv = require('csvtojson');
//var csvParser = require('json2csv').Parser;

const importFiles = async(req,res) => {
    try {
        var addTeamData = [];
        csv()
        .fromFile(req.file.path)
        .then(async(response) => {
            
            for(var x = 0; x < response.length; x++) {
                addTeamData.push({
                    player: response[x].Player,
                    team: response[x].Team,
                    role: response[x].Role,
                    });
            }

            await AddFullTeam.insertMany(addTeamData);
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
