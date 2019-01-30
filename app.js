var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('./config/database'); //database
const jwt = require('jsonwebtoken');

//require routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

//run express
var app = express();
// set jwt secret token
app.set('secretKey', 'xxtecgurussuperseguroxx');
//set express
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', indexRouter);
app.use('/auth', authRouter); //ruta publica
app.use('/users', usersRouter); //ruta publica

//middlewares

function validateUser(req, res, next){
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded){
        if(err){
            res.json({status: "error", message: err.message, data:null});
        }else{
            req.body.userId = decoded.id;
            next();
        }

    })
}

//error 404
app.use(function(req,res,next){
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//handle errors
app.use(function(err, req, res,next){
    console.log(err);
    if(err.status == 404)
        res.status(404).json({message: "Not found"});
    else
        res.status(500).json({message:"Something looks worng :( !!"});
});

//connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '));

module.exports = app;
