require('dotenv').config({ path: '.env' });
const tracer = require('dd-trace').init({
  DD_ENV:process.env.DD_ENV,
  DD_SERVICE:process.env.DD_SERVICE,
  DD_LOGS_INJECTION:process.env.DD_LOGS_INJECTION
});
var url = require('url')
var express = require('express')
const path = require('path')
global.appRoot = path.resolve(__dirname)
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var session = require('express-session')
var validator = require('express-joi-validation')({
  passError: true // NOTE: this tells the module to pass the error along for you
});
const cron = require("node-cron");

var resModel = {
  meta: {
    Status: false,
    Message: "",
    code: null,
  },
  Data: {}
};
global._validate = validator;
global._pathconst = require('./api/helpers/constantdata/pathconst.js')
var ResHelper = require(_pathconst.FilesPath.ResHelper);
var _dbContaxt = require(_pathconst.FilesPath.DBContaxt);

global.knexSqlDb = _dbContaxt.getContext()
var app = express()

/**
 * Express MiddleWare
 */         //handle multipart requests
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); //handle queryStrings
// app.use(bodyParser.json())        //handle json data
app.use(bodyParser.json({ limit: '50mb' }))
app.use(session({
  secret: 'realtourup',
  rolling: true,
  saveUninitialized: true,
  resave: false
}))                                //handle session


// app.use(express.static(__dirname + '/api'))      //handle static files
/**
 * app.use(express.static(path._makeLong('client')))      //handle static files
 * Root level routing
 */
// app.get('/', function (req, res) {
//   res.sendFile(_pathconst.PagesPath.IndexPage)
// })
// app.get('/apidoc', function (req, res) {
//   res.sendFile(_pathconst.PagesPath.DocPage)
// })


app.use(function (req, res, next) {
  // Mentioning content types
  res.setHeader('Content-Type', 'application/json; charset=UTF-8');
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept,Authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions) 
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


app.use('/v1', require(_pathconst.FilesPath.V1Routes));// For version 1
// app.use('/v2', require(_pathconst.FilesPath.V2Routes));// For version 2

// require(_pathconst.FilesPath.V2Routes)(app, validator)

// require('./server/modules/agent/route/agent-route')(app)
// require('./server/modules/client/route/client-route')(app)
// require('./server/modules/property/route/property-route')(app)
// require('./server/modules/tour/route/tour-route')(app)


// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   res.sendFile(_pathconst.PagesPath.ErrorPage)
// })
// After your routes add a standard express error handler. This will be passed the Joi
// error, plus an extra "type" field so we can tell what type of validation failed
app.use((err, req, res, next) => {
  if (err.error.isJoi) {
    let errDetail = []
    // we had a joi error, let's return a custom 400 json response
    if (err.error.details) {
      err.error.details.map(function (item) {
        var temp = {}
        temp[item.context.key] = item.message
        errDetail.push(temp)
      })
    }

    ResHelper.apiResponse(res, false, "Submitted Information is not valid.", 400, errDetail, "");

  } else {

    ResHelper.apiResponse(res, false, "Error Occured.", 500, "", "");

  }
});

module.exports = app