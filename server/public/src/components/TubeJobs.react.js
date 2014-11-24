var React = require('react');

var Table = require('react-bootstrap/Table');
var ConnectionStore = require('../stores/ConnectionStore');
var TubeStore = require('../stores/TubeStore');

var TubeJobs = React.createClass({
    getInitialState: function () {
        return {
            data: TubeStore.getCurrentTubeJobsByConnection(
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
            data: TubeStore.getCurrentTubeJobsByConnection(
                ConnectionStore.getCurrentConnectionKey()
            )
        });
    },

    render: function () {
        var jobs = this.state.data.map(function (job) {
            return (
                <tr>
                    <td>
                        <code>{job}</code>
                    </td>
                </tr>
            );
        });

        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>Job body</th>
                    </tr>
                </thead>
                <tbody>{jobs}</tbody>
            </Table>
        );
    }
});

module.exports = TubeJobs;
