var AdminApp = require('./components/AdminApp.react');
var ApiUtils = require('./utils/ApiUtils');
var React = require('react');
window.React = React;

ApiUtils.getAllConnections();

React.render(<AdminApp />,
    document.getElementById('react')
);
