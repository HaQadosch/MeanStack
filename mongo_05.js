'use strict';
const mongoose = require('mongoose');
const schema = require('./schema');

mongoose.connect('mongodb://localhost:27017/test');

//Parameters are model name, schema, collection name.
const User = mongoose.model('User', schema, 'users');

const user = new User({
    'name' : 'John Smith'
  , 'email' : 'john@smith.io'
});

user.save(function userSaved(error){
  if (error) {
    console.log('userSaved: '+error);
    process.exit(1);
  } else {
    User.find({'email':'john@smith.io'}, function userFound(error, docs){
      if (error) {
        console.log('userFound: '+error);
        process.exit(1);
      } else {
        console.log('userFound: '+require('util', {'colors':true}).inspect(docs));
        process.exit(0);
      }
    })
  }
});
