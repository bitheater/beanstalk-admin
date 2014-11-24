var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ApiUtils = require('../utils/ApiUtils');
var ConnectionStore = require('./ConnectionStore');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _tubesData = {};
var _currentTube = null;

var TubeStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getTubesByConnection: function (connection) {
        if (connection in _tubesData) {
            return Object.keys(_tubesData[connection]);
        }

        ApiUtils.getTubes(connection);

        return [];
    },

    isTubeSelected: function () {
        return _currentTube != null;
    },

    getCurrentTubeInfoByConnection: function (connection) {
        if ('stats' in _tubesData[connection][_currentTube]) {
            return _tubesData[connection][_currentTube]['stats'];
        }

        ApiUtils.getTubeInfoByConnection(connection, _currentTube);

        return [];
    },

    getCurrentTubeJobsByConnection: function (connection) {
        if ('jobs' in _tubesData[connection][_currentTube]) {
            return _tubesData[connection][_currentTube]['jobs'];
        }

        ApiUtils.getTubeJobsByConnection(connection, _currentTube);

        return [];
    }
});

TubeStore.dispatchToken = AppDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.type) {
        case ActionTypes.CLICK_TUBE:
            _currentTube = action.key;
            TubeStore.emitChange();
            break;

        case ActionTypes.CLICK_CONNECTION:
            _currentTube = null;
            break;

        case ActionTypes.RECEIVE_TUBES:
            action.data.forEach(function(tube) {
                var currentKey = ConnectionStore.getCurrentConnectionKey();
                _tubesData[currentKey] = {};
                _tubesData[currentKey][tube] = {};
            });
            TubeStore.emitChange();
            break;

        case ActionTypes.RECEIVE_TUBE_STATS:
            var currentKey = ConnectionStore.getCurrentConnectionKey();
            _tubesData[currentKey][_currentTube]['stats'] = action.data;
            TubeStore.emitChange();
            break;

        case ActionTypes.RECEIVE_TUBE_JOBS:
            var currentKey = ConnectionStore.getCurrentConnectionKey();
            _tubesData[currentKey][_currentTube]['jobs'] = action.data;
            TubeStore.emitChange();
            break;

        default:
    }
});

module.exports = TubeStore;
