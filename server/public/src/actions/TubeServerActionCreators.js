var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ConnectionStore = require('../stores/ConnectionStore');
var ActionTypes = AppConstants.ActionTypes;

module.exports = {
    receiveTubes: function (tubes) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_TUBES,
            data: tubes
        });
    },

    receiveTubeStats: function (stats) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_TUBE_STATS,
            data: stats
        });
    },

    receiveTubeJobs: function (jobs) {
        AppDispatcher.handleServerAction({
            type: ActionTypes.RECEIVE_TUBE_JOBS,
            data: jobs
        });
    }
};
