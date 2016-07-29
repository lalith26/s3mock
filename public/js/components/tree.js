var React = require('react');
var File = require('./file');
var Folder = require('./folder');

var Tree = React.createClass({
    render: function render() {
        if (this.props.tree) {
            var node = this.props.tree;
            if (node.type === 'FOLDER') {
                return (
                    <div className="tree-container">
                        <Folder key={node.data} node={node} />
                    </div>
                );
            }
        }
        return (
            <div className="tree-container">
            </div>
        )
    }
});

module.exports = Tree;
