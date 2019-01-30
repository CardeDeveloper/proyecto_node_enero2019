const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const saltRounds= 12;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        trim: true,
        required: false

    },
    password:{
        type: String,
        required: true
    },
    level:{
        type: Number,
        required: true,
        min: 0, // 0 banned, 1 admin, 2 waiter, 3 table
        max: 3
    }
});

// hash user password before saving into database
UserSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, saltRounds)
    next()
    });

module.exports = mongoose.model('User', UserSchema);


