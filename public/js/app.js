var ReactDOM = require('react-dom');
var React = require('react');
var AWS = require('aws-sdk');
var TreeStructure = require('./core/tree');
var UiTree = require('./components/tree');
var NavBar = require('./components/navbar');
var Utils = require('./utils/utils');
var RightPane = require('./components/rightpane');
var Config = require('./config/config');

var Root = React.createClass({

    tree: null,

    getInitialState: function getInitialState () {
        return {
            isDataLoading: true
        };
    },

    componentDidMount: function componentDidMount () {
        var bucket,
            self = this;
        AWS.config.update({accessKeyId: Config.accessKeyId, secretAccessKey: Config.secretAccessKey, region: Config.region});
        bucket = new AWS.S3({params: {Bucket: Config.bucket}});
        this.tree = new TreeStructure.createTree('/', 'FOLDER');
        bucket.listObjects(function(err, data) {
            if (err) {
                console.log('error in listing objects');
                console.log(err);
            } else {
                Utils.convertAWSResponseToTree(data, self.tree);
                self.setState({isDataLoading: false});
            }
        });
    },

    render: function render () {
        if (this.state.isDataLoading) {
            return (
                <div className="loading-container">
                    <div className="loader"></div>
                </div>
            );
        }
        return (
            <div className="app-container">
                <NavBar />
                <div className="clearfix app-grid-container">
                    <div className="col col-3 app-col-container">
                        <UiTree tree={this.tree}/>
                    </div>
                    <div className="col col-9 app-col-container">
                        <RightPane />
                    </div>
                </div>
            </div>
        );
    }
});

ReactDOM.render(<Root />, document.getElementById('container'));
