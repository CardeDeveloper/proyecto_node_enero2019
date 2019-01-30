var express = require('express');
var router = express.Router();
const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', function(req,res,next){
    userModel.findOne({email:req.body.email}, function(err, userInfo){
        if(err){
            next(err);
        }else{
            if(bcrypt.compareSync(req.body.password, userInfo.password)){
                const token = jwt.sign({id: userInfo._id, level: userInfo.level}, req.app.get('secretKey'), {expiresIn: '1h'});
                res.json({status: "succes", message: "user found!!", data: {user: userInfo, token:token}});
            }else{
                res.json({status: "error", message: "Invalid email/password", data: null});
            }
        }
    });
});

module.exports = router;