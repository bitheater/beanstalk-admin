var React = require('react');

var Table = require('react-bootstrap/Table');
var Alert = require('react-bootstrap/Alert');
var ConnectionStore = require('../stores/ConnectionStore');
var TubeStore = require('../stores/TubeStore');

var TubeStatsTable = React.createClass({
    getInitialState: function () {
        return {
            data: TubeStore.getCurrentTubeInfoByConnection(
                ConnectionStore.getCurrentConnectionKey()
            )
        };
    },

    componentDidMount: function () {
        TubeStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        TubeStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({
            data: TubeStore.getCurrentTubeInfoByConnection(
                ConnectionStore.getCurrentConnectionKey()
            )
        });
    },

    render: function () {
        var stats = this.state.data.map(function (stat) {
            return (
                <tr>
                    <td>{stat.name}</td>
                    <td>{stat.value}</td>
                </tr>
            );
        });

        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>Property</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
            {stats}
                </tbody>
            </Table>
        );
    }
});

module.exports = TubeStatsTable;
