// env variables
require('dotenv').config();

const express = require('express')
global.__basedir = process.env.BASEDIR;


const PORT = process.env.PORT || 5000

const app = express();

// json and form data
app.use(express.json())
app.use(express.urlencoded({extended : false}));


// routes
app.use(require('./routes'));


// db
const {db} = require('./models');

db.sync({force : true}).then(()=>{
    // starting the server
    app.listen(PORT,()=>{
        console.log(`server listening on port ${PORT}`);
    });
})

