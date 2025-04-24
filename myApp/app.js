var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');  // <-- This line is important!
const axios = require('axios'); // Import axios for making HTTP requests

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var valuesRouter = require('./routes/values');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
// Define the /api/Values route to make a call to localhost:8080/api/values/getvalue
app.use('/api/Values', async (req, res, next) => {
  try {
    // Read the service name and port from environment variables
    const serviceName = process.env.DOTNET_APP_SERVICE || 'http://dotnet-api';
    const servicePort = process.env.DOTNET_APP_SERVICE_PORT || '80';

    // Construct the URL dynamically using the environment variables
    const url = `${serviceName}:${servicePort}/api/Values`;

    // Make the HTTP request to the .NET Core service using the dynamic URL
    const response = await axios.get(url);
    
    // Send the response from the .NET Core service back to the client
    res.json(response.data);
  } catch (error) {
    // If an error occurs, send the error response
    console.error('Error fetching from .NET Core service:', error);
    next(createError(500, 'Error fetching data from the external service'));
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(cors()); // This will allow all origins by default


var port = process.env.PORT || 3002;

app.listen(port,()=>{
  console.log(`Serve at http://localhost:${port}`);
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;