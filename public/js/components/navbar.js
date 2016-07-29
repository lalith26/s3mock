var React = require('react');

var NavBar = React.createClass({
    getInitialState: function getInitialState() {
        return {

        }
    },

    render: function render() {
		return (
			<div className="navbar-container">
                File System from S3
			</div>
		)
    }
});

module.exports = NavBar;
