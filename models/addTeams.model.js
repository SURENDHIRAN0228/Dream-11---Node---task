const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addTeamSchema = new Schema ({
    teamName: {
        type: String,
        required: true
    },
    players: [{
        type: String,
        required: true
    }],
    /*players: {
        player1: {
            type: String,
            required: true
        },
        player2: {
            type: String,
            required: true
        },
        player3: {
            type: String,
            required: true
        },
        player4: {
            type: String,
            required: true
        },
        player5: {
            type: String,
            required: true
        },
        player6: {
            type: String,
            required: true
        },
        player7: {
            type: String,
            required: true
        },
        player8: {
            type: String,
            required: true
        },
        player9: {
            type: String,
            required: true
        },
        player10: {
            type: String,
            required: true
        },
        player11: {
            type: String,
            required: true
        }
    },*/
    caption: {
        type: String,
        required: true
    },
    viceCaption: {
        type: String,
        required: true
    }

}, {timestamps: true})

const addTeams = mongoose.model('AddTeams',addTeamSchema)

module.exports = addTeams


