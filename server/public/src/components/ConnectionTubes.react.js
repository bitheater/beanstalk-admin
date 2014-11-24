var React = require('react');

var TubeStatsTable = require('./TubeStatsTable.react');
var TubeJobs = require('./TubeJobs.react');
var Alert = require('react-bootstrap/Alert');
var Nav = require('react-bootstrap/Nav');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var NavItem = require('react-bootstrap/NavItem');
var ConnectionStore = require('../stores/ConnectionStore');
var TubeStore = require('../stores/TubeStore');
var TubeActionCreators = require('../actions/TubeActionCreators');

var ConnectionTubes = React.createClass({
    getInitialState: function () {
        return {
            data: TubeStore.getTubesByConnection(
                ConnectionStore.getCurrentConnectionKey()
            )
        };
    },

    componentDidMount: function () {
        ConnectionStore.addChangeListener(this._onChange);
        TubeStore.addChangeListener(this._onChangeTubeStore);
    },

    componentWillUnmount: function () {
        ConnectionStore.removeChangeListener(this._onChange);
        TubeStore.removeChangeListener(this._onChangeTubeStore);
    },

    _onChange: function () {
        this.setState({activeKey: null});

        this.setState({
            data: TubeStore.getTubesByConnection(
                ConnectionStore.getCurrentConnectionKey()
            )
        });
    },

    _onChangeTubeStore: function () {
        this.setState({
            data: TubeStore.getTubesByConnection(
                ConnectionStore.getCurrentConnectionKey()
            )
        });
    },

    handleSelect: function (selectedKey) {
        TubeActionCreators.clickTube(selectedKey);

        this.setState({
            activeKey: selectedKey
        });
    },

    render: function () {
        var tubes = this.state.data.map(function (tube) {
            return (
                <NavItem eventKey={tube}>{tube.toUpperCase()}</NavItem>
            );
        });

        var component = null;

        if (TubeStore.isTubeSelected()) {
            component = (
                <Row>
                    <Col md={5}>
                        <TubeStatsTable />
                    </Col>
                    <Col md={7}>
                        <TubeJobs />
                    </Col>
                </Row>
            );
        } else {
            component = (
                <Row>
                    <Alert bsStyle="warning">
                        Please select a tube
                    </Alert>
                </Row>
            );
        }

        return (
            <Row>
                <Nav bsStyle="pills" activeKey={this.state.activeKey} onSelect={this.handleSelect}>
                  {tubes}
                </Nav>
                <br />
                {component}
            </Row>
        );
    }
});

module.exports = ConnectionTubes;
