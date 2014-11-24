var React = require('react');
var Table = require('react-bootstrap/Table');
var ConnectionStore = require('../stores/ConnectionStore');
var ConnectionServerActionCreators = require('../actions/ConnectionServerActionCreators');

var ConnectionStatsTable = React.createClass({
    getInitialState: function () {
        return {
            data: ConnectionStore.getCurrentConnectionInfo()
        };
    },

    componentDidMount: function () {
        ConnectionStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        ConnectionStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({
            data: ConnectionStore.getCurrentConnectionInfo()
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
                <tbody>{stats}</tbody>
            </Table>
        );
    }
});

module.exports = ConnectionStatsTable;
