var React = require('react');
var AWS = require('aws-sdk');
var Config = require('../config/config');
var AppActionCreator = require('../actions/AppActionCreator');

var File = React.createClass({
    handleClick: function handleClick () {
        AppActionCreator.fetchingFileDataInProgress();
        var bucket;
        bucket = new AWS.S3();
        var params = {
            Bucket: Config.bucket,
            Key: this.props.node.fullPath
        };

        bucket.getObject(params, function(err, data) {
            if (err) console.log(err, err.stack);
            else {
                AppActionCreator.fetchingFileDataSuccess(data.Body.toString('utf-8'));
            }
        });
    },

    render: function render() {
		return (
			<div className="file-container" onClick={this.handleClick}>
				<i className="fa fa-file" aria-hidden="true"></i>
				<span className="file-name">{this.props.node.data}</span>
			</div>
		)
    }
});

module.exports = File;
