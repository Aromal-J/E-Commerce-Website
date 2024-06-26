const express = require("express");
const ErrorHandler = require('./Middleware/Error.js')
const bodyParser = require('body-parser') 
const cookieParser= require('cookie-parser')
const cors = require('cors')

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/', express.static('uploads'))
app.use(bodyParser.urlencoded({extended:true}))

//for routes import
const user = require('./Controllers/User')
app.use('/api/v2', user)

//for errorhandling
app.use(ErrorHandler)

module.exports = app;
