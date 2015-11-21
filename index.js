
var us = require('underscore');
us.each([1, 2, 3], function(v){
  console.log(v);
  return v;
});

var ld = require('lodash');
ld.each([1, 2, 3], (x =>
  console.log(x)
));

([1, 2, 3]).map(x => console.log(x));
