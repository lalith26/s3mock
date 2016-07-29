var React = require('react');
var AppStore = require('../stores/AppStore');

var RightPane = React.createClass({
    getInitialState: function getInitialState () {
        return {
            isLoading: false,
            data: ''
        }
    },

    handleLoading: function handleLoading () {
        console.log('handleLoading called');
        this.setState({isLoading: true});
    },

    handleSuccess: function handleSuccess () {
        console.log('handleSuccess called');
        this.setState({isLoading: false, data: AppStore.getFileData()});
    },

    componentDidMount: function componentDidMount () {
        var self = this;
        AppStore.addListener('loading', this.handleLoading);
        AppStore.addListener('success', this.handleSuccess);
    },

    render: function render() {
        console.log('printing state');
        console.log(this.state);
        if (this.state.isLoading) {
            return (
                <div className="rightpane-container">
                    <div className="loader">
                    </div>
    			</div>
            );
        }
		return (
			<div className="rightpane-container">
                {this.state.data}
			</div>
		)
    }
});

module.exports = RightPane;
