var express = require('express');
const router = express.Router();

const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');

const addTeamController = require('../controller/addTeam.controller')
const addMatchResultsController = require('../controller/addMatchResults.controller')
const addTeamsController = require('../controller/addTeams.controller')
const processResults = require('../controller/matchResults.controller')

router.use(bodyParser.urlencoded({ extended:true }));
router.use(express.static(path.resolve(__dirname,'public')));

var storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./uploads')
    },

    filename: (req,file,cb) => {
        cb(null,file.originalname)
    }
});

var uploads = multer({ storage: storage});

router.post('/addFullTeam', uploads.single('file'), addTeamController.importFiles)

router.post('/addMatchResults', uploads.single('file'), addMatchResultsController.importFiles)

router.post('/addTeams', addTeamsController.addTeams)

router.get('/process-result', processResults.processResults)

module.exports = router;