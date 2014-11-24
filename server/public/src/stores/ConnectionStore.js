var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ApiUtils = require('../utils/ApiUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';
var CHANGE_TAB_EVENT = 'change_tab';

var _connections = [];
var _connectionsStats = {};
var _currentConnection = null;
var _currentTabSelection = "stats";

var ConnectionStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    addTabChangeListener: function (callback) {
        this.on(CHANGE_TAB_EVENT, callback);
    },

    removeTabChangeListener: function (callback) {
        this.removeListener(CHANGE_TAB_EVENT, callback);
    },

    getCurrentConnectionKey: function () {
        return _currentConnection;
    },

    isConnectionSelected: function () {
        return _currentConnection != null;
    },

    getAll: function() {
        return _connections;
    },

    getCurrentConnectionInfo: function () {
        if (_currentConnection in _connectionsStats) {
            return _connectionsStats[_currentConnection];
        }

        ApiUtils.getConnectionInfo(_currentConnection);

        return [];
    },

    isTabSelected: function () {
        return _currentTabSelection != null;
    },

    getCurrentTabSelected: function () {
        return _currentTabSelection;
    }
});

ConnectionStore.dispatchToken = AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.type) {
        case ActionTypes.RECEIVE_CONNECTIONS:
            _connections = action.data;
            ConnectionStore.emitChange();
            break;

        case ActionTypes.RECEIVE_CONNECTION_STATS:
            _connectionsStats[_currentConnection] = action.data;
            ConnectionStore.emitChange();
            break;

        case ActionTypes.CLICK_CONNECTION:
            _currentConnection = action.key;
            ConnectionStore.emitChange();
            break;

        case ActionTypes.CLICK_TAB:
            _currentTabSelection = action.key;
            ConnectionStore.emitChange();
            break;

        default:
    }
});

module.exports = ConnectionStore;
