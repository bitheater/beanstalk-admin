var ConnectionServerActionCreators = require('../actions/ConnectionServerActionCreators');
var TubeServerActionCreators = require('../actions/TubeServerActionCreators');
var request = require('superagent');

var ApiUtils = {
    getAllConnections: function () {
        request.get('/instances', function (res) {
            ConnectionServerActionCreators.receiveConnections(res.body.data);
        });
    },

    getConnectionInfo: function (conn) {
        request.get('/instances/' + conn + '/stats', function (res) {
            ConnectionServerActionCreators.receiveConnectionStats(res.body.data);
        });
    },

    getTubes: function (conn) {
        request.get('/instances/' + conn + '/tubes', function (res) {
            TubeServerActionCreators.receiveTubes(res.body.data);
        });
    },

    getTubeInfoByConnection: function (conn, tube) {
        var url = '/instances/' + conn + '/tubes/' + tube + '/stats';
        request.get(url, function (res) {
            TubeServerActionCreators.receiveTubeStats(res.body.data);
        });
    },

    getTubeJobsByConnection: function (conn, tube) {
        var url = '/instances/' + conn + '/tubes/' + tube + '/jobs';
        request.get(url, function (res) {
            TubeServerActionCreators.receiveTubeJobs(res.body.data);
        });
    }
};

module.exports = ApiUtils;
