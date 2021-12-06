const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema(뼈대)
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  username: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },
});

const User = mongoose.model('User', UserSchema);

User.getUserById = function(id, callback) {
  User.findById(id, callback);
};

User.getUserByUsername = function(username, callback) {
  const query = { username: username };
  User.findOne(query, callback);
};

User.addUser = function(newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

User.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
    if(err) throw err;
    callback(null, isMatch);
  });
}

// Return all user list
User.getAll = function (callback) {
  User.find(callback);
};

//비밀번호와 이메일 수정 
User.updateUser= function(username, edituser, callback ){
  const query = {username: username};
  
  bcrypt.genSalt(10, (err,salt) => {
      bcrypt.hash(edituser.password, salt, (err,hash) => {
          if(err) throw err;
          const update = {
              email: edituser.email,
              password: hash,
      
          };
          User.findOneAndUpdate(query,update,{ new: true, useFindAndModify: false },callback);
          
  });
  });
  
  
  

  


};

module.exports = User;