var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {
    clickConnection: function (key) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.CLICK_CONNECTION,
            key: key
        });
    },
    clickTab: function (key) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.CLICK_TAB,
            key: key
        });
    }
};
