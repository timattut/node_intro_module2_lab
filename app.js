
//
// app.js
//


// Imports

const express = require('express');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');

// Instantiations

let app = express();

// Configurations
// -

// Middleware

app.use(bodyParser.json());
if(process.env.NODE_ENV !== 'test') app.use(logger('dev'));
app.use(errorhandler());

// Routes

require('./routes')(app);

// Error handlers
// -

// Server bootup or server export

module.exports = app;
