var mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;


var schema = new Schema({
    username: {type: String, unique: true, require: true},
    password: { type: String, required: true, bcrypt: true },
});

schema.pre('save', function(next) {
  if(this.isModified('password')){
    this.password = bcrypt.hashSync(this.password);
  }
  next();
});

schema.methods.verifyPassword = function(password, cb){
  cb(bcrypt.compareSync(password, this.password));
};

module.exports = mongoose.model('User', schema);
