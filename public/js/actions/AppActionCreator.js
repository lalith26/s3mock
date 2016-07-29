'use strict';

var appDispatcher = require('../dispatcher/AppDispatcher');

module.exports = {
    fetchingFileDataInProgress: function() {
        appDispatcher.dispatch({
            type: 'loading'
        });
    },
    fetchingFileDataSuccess: function(data) {
        appDispatcher.dispatch({
            type: 'success',
            data: data
        });
    }
};
