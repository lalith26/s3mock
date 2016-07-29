/**
 * This is a singelton dispatcher.
 * i.e. `require`'ing this file multiple times returns the same
 * instance of the dispatcher.
 */
'use strict';

var Dispatcher = require('flux').Dispatcher;

// Always return the same instance of the dispatcher
module.exports = new Dispatcher();
