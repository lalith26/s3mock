var React = require('react');
var File = require('./file');
var Folder = require('./folder');
var Tree = require('./tree');
var $ = require('jquery');

var Folder = React.createClass({
    getInitialState: function getInitialState() {
        return {
			closed: true
        };
    },

	handleContainerClick: function handleContainerClick (event) {
		this.setState({closed: !this.state.closed});
	},

    render: function render() {
		var children = [];
		if (!this.state.closed && this.props.node.children && this.props.node.children.length) {
			children = this.props.node.children.map(function (n) {
				if (n.type === 'FOLDER') {
					return <Folder key={n.data} node={n} />
				} else {
					return <File key={n.data} node={n} />
				}
			});
		}

		return (
			<div className="folder-container">
				<div onClick={this.handleContainerClick}>
					{!this.state.closed ? (
						<i className="fa fa-caret-down caret-icon" aria-hidden="true"></i>
					) : (
						<i className="fa fa-caret-right caret-icon" aria-hidden="true"></i>
					)}

					<i className="fa fa-folder" aria-hidden="true"></i>
					<span className="folder-name">{this.props.node.data}</span>
				</div>
				<div className="child-container" >
					{children}
				</div>
			</div>
		);
    }
});

module.exports = Folder;
