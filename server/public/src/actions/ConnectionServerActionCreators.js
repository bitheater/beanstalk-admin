var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ConnectionStore = require('../stores/ConnectionStore');
var ActionTypes = AppConstants.ActionTypes;

module.exports = {
    receiveConnections: function (connections) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_CONNECTIONS,
            data: connections
        });
    },

    receiveConnectionStats: function (stats) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_CONNECTION_STATS,
            data: stats
        });
    }
};
