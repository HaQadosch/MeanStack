'use strict';
const fn = require('./myfile.js');

fn();

const otherFn = require('./test').other; // require('./test') is equivalent to require('./test/index.js')
otherFn();
