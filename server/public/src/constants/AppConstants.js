var keyMirror = require('keymirror');

module.exports = {
    ActionTypes: keyMirror({
        CLICK_CONNECTION: null,
        CLICK_TAB: null,
        CLICK_TUBE: null,
        RECEIVE_CONNECTIONS: null,
        RECEIVE_CONNECTION_STATS: null,
        RECEIVE_TUBES: null,
        RECEIVE_TUBE_STATS: null,
        RECEIVE_TUBE_JOBS: null
    }),

    PayloadSources: keyMirror({
        VIEW_ACTION: null
    })
};
