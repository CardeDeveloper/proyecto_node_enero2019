var express = require('express');
var router = express.Router();
const userModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  userModel.find({}, function(err, users){
    if(err){
      next(err)
    }else{
      res.json({ status: 'success' ,message: "users Found!!" , data : {users: users}});
    }
  });
  
});

router.post('/register', function(req,res,next){
   userModel.create({name: req.body.name, email: req.body.email, password: req.body.password, level: req.body.level}), function(err, result){
      if(err)
      next(err);
      else
        res.json({status: "success", message: "User added successfully!!", data: null});
   }
});

router.put('/:id', function(req, res, next){
  userModel.findByIdAndUpdate(req.params.id, {name: req.body.name, email: req.body.email, level: req.body.level}, function(err, userInfo){
    if(err)
      next(err);
    else{
      res.json({status:"success", message: "User updated successfully", data: null});
    }
  });
});

router.delete('/:id', function(req, res, next){
  userModel.findByIdAndRemove(req.params.id, function(err, userInfo){
    if(err)
      next(err);
    else{
      res.json({status:"success", message: "User deleted successfully", data: null});
    }
  });
});





module.exports = router;
