const AddFullTeam = require('../models/addTeam.model')
const processResultsService = require('../services/matchResults.services')

const processResults = async(req,res) => {

    try {

        AddFullTeam.find({}, async function returnData(error, result) {
            if(error) {
                res.send({ status: 400, success: false, msg: error.message});
            }
            else {
                for(var i=0; i<result.length;i++) {
                    
                    var battingPoints = await processResultsService.processResult(result[i])
                    var bowlingPoints = await processResultsService.processResult1(result[i])
                    var fieldingPoints = await processResultsService.processResult2(result[i])
                    var totalPoints =  battingPoints + bowlingPoints + fieldingPoints
                    console.log(totalPoints +" - total")
                    var savePoints = await processResultsService.processResult3(result[i],totalPoints)
                    console.log("*****************************************************************************")
                } 
                res.send({ status: 200, success: true, msg: result});
            }
        })
        
    }
    catch(error) {
        res.send({ status: 400, success: false, msg: error.message});
    }
}


module.exports = {
    processResults
}
