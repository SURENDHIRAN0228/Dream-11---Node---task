const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fullTeamSchema = new Schema ({
    player: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: false,
        default: 0
    }

}, {timestamps: true})

const AddFullTeam = mongoose.model('fullteams',fullTeamSchema)

module.exports = AddFullTeam