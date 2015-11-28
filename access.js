'use strict';

const mongoose = require('mongoose');
const productSchema = require('./user');

const User = mongoose.model('User', productSchema);
const u = new User({
  'profile': {
    'username': 'vkarpov15'
  }
});

function modifyUserProfile(user, profile, callback){
  user.profile = profile;
  user.save(function saved(error, user){
    // handle result.
  });
};

modifyUserProfile(u, {
  'picture': 'http://pbs.twimg.com/profile_images/550304223036854272/Wwmwuh2t.png'
});
