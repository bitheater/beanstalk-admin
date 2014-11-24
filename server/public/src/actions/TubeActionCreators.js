var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {
    clickTube: function (key) {
        AppDispatcher.handleViewAction({
            type: ActionTypes.CLICK_TUBE,
            key: key
        });
    }
};
