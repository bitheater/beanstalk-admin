var React = require('react');

var Alert = require('react-bootstrap/Alert');
var ConnectionStore = require('../stores/ConnectionStore');
var ConnectionOptions = require('./ConnectionOptions.react');
var Nav = require('react-bootstrap/Nav');
var NavItem = require('react-bootstrap/NavItem');
var Grid = require('react-bootstrap/Grid');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var ConnectionActionCreators = require('../actions/ConnectionActionCreators');

var interval = null;

var AdminApp = React.createClass({
    getInitialState: function () {
        return {
            data: ConnectionStore.getAll(),
            secondsRemaining: 10
        };
    },

    componentDidMount: function () {
        ConnectionStore.addChangeListener(this._onChange);
    },
    
    componentWillUnmount: function () {
        ConnectionStore.removeChangeListener(this._onChange);
    },

    _changeTimeRemaining: function () {
        if (this.state.secondsRemaining == 0) {
            this.setState({
                secondsRemaining: 10
            });

            return;
        }

        this.setState({
            secondsRemaining: this.state.secondsRemaining - 1
        });
    },

    _onChange: function () {
        if (interval != null) {
            clearInterval(interval);
        }

        interval = setInterval(this._changeTimeRemaining, 1000);

        this.setState({
            data: ConnectionStore.getAll(),
            secondsRemaining: 10
        });
    },

    handleSelect: function (selectedKey) {
        ConnectionActionCreators.clickConnection(selectedKey);

        this.setState({
            activeKey: selectedKey
        });
    },

    render: function () {
        var options = this.state.data.map(function (server) {
            return (
                <NavItem eventKey={server.realName}>{server.name}</NavItem>
            );
        });

        var component;

        if (!ConnectionStore.isConnectionSelected()) {
            component = (
                <Alert bsStyle="warning">
                    Please select a connection
                </Alert>
            );
        } else {
            component = (
                <span>
                    <p>
                        <em className="pull-right">
                            <img src="//cdnjs.cloudflare.com/ajax/libs/file-uploader/3.7.0/loading.gif" />
                            &nbsp; Refreshing data in {this.state.secondsRemaining} seconds
                        </em>
                    </p>
                    <ConnectionOptions />
                </span>
            );
        }

        return (
            <Grid>
                <Row>
                    <Col md={3}>
                        <Nav activeKey={this.state.activeKey} bsStyle="pills" stacked onSelect={this.handleSelect}>
                            {options}
                        </Nav>
                    </Col>
                    <Col md={9}>
                        {component}
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = AdminApp;
