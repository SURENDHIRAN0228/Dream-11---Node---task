const express = require('express');
const server = express();
const port = 3000;

//const morgan = require('morgan');
//const bodyParser = require('body-parser')

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
var routes = require('./routes/addTeam.route');

//const cors = require('cors');


mongoose.connect("mongodb://127.0.0.1:27017/nodetask", { useNewUrlParser:true, useUnifiedTopology: true},
function checkDb(error)
{
    if(error)
    { 
        console.log(error);
    }
    else
    {
        console.log("successfully Connected to DB");
    }
});

//server.use(morgan('dev'))
//server.use(bodyParser.urlencoded({extended: true }))
//server.use(bodyParser.json())

//server.use(cors());
server.use(express.json());
//server.use('/uploads', express.static('uploads'))

server.use(routes);

// Endpoints

server.get('/', async (req, res) => {
  res.send('Hello World!');
});

//

server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

//run();

/*
// Database Details
const DB_USER = process.env['DB_USER'];
const DB_PWD = process.env['DB_PWD'];
const DB_URL = process.env['DB_URL'];
const DB_NAME = "task-jeff";
const DB_COLLECTION_NAME = "players";

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://"+DB_USER+":"+DB_PWD+"@"+DB_URL+"/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });

    db = client.db(DB_NAME);
    
    console.log("You successfully connected to MongoDB!");
    
  } finally {
  }
}

// Sample create document
async function sampleCreate() {
  const demo_doc = { 
    "demo": "doc demo",
    "hello": "world"
  };
  const demo_create = await db.collection(DB_COLLECTION_NAME).insertOne(demo_doc);
  
  console.log("Added!")
  console.log(demo_create.insertedId);
}





*/