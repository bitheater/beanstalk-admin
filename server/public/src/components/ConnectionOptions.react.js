var React = require('react');

var Nav = require('react-bootstrap/Nav');
var NavItem = require('react-bootstrap/NavItem');
var Alert = require('react-bootstrap/Alert');
var Col = require('react-bootstrap/Col');

var ConnectionActionCreators = require('../actions/ConnectionActionCreators');
var ConnectionStore = require('../stores/ConnectionStore');
var ConnectionStatsTable = require('./ConnectionStatsTable.react');
var ConnectionTubes = require('./ConnectionTubes.react');

var STATS_TAB = "stats";

var ConnectionOptions = React.createClass({
    getInitialState: function () {
        return {
            activeKey: STATS_TAB
        };
    },

    handleSelect: function (selectedKey) {
        ConnectionActionCreators.clickTab(selectedKey);

        this.setState({
            activeKey: selectedKey
        });
    },

    render: function () {
        var component = null;

        if (ConnectionStore.getCurrentTabSelected() == STATS_TAB) {
            component = (
                <ConnectionStatsTable />
            );
        } else {
            component = (
                <ConnectionTubes />
            );
        }

        return (
            <Col md={12}>
                <Nav bsStyle="tabs" onSelect={this.handleSelect} activeKey={this.state.activeKey}>
                    <NavItem eventKey="stats">Stats</NavItem>
                    <NavItem eventKey="tubes">Tubes</NavItem>
                </Nav>
                <br />
                {component}
            </Col>
        );
    }
});

module.exports = ConnectionOptions;
