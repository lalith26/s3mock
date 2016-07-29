'use strict';
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var appDispatcher = require('../dispatcher/AppDispatcher');
var fileData = '';

var appStore = assign({}, EventEmitter.prototype, {
    emitEvent: function emitEvent (changeEventName) {
        this.emit(changeEventName);
    },

    addListener: function addListener (eventName, callback) {
        this.on(eventName, callback);
    },

    removeListener: function removeListener (eventName, callback) {
        this.removeListener(eventName, callback);
    },

    getFileData: function getFileData () {
        return fileData;
    }
});


appStore.dispatchToken = appDispatcher.register (function(action) {
    switch (action.type) {
        case 'loading':
            appStore.emitEvent('loading');
            break;
        case 'success':
            fileData = action.data;
            console.log('printing fileData');
            console.log(fileData);
            appStore.emitEvent('success');
            break;
        default:
            break;
    }
});

module.exports = appStore;
