var React = require('react');

var TagAdder = React.createClass({
    getInitialState: function () {
        return {tagName: ''};
    },
    handleNameChange: function (e) {
        this.setState({tagName: e.target.value});
    },
    componentWillMount: function () {
        this.firebaseRef = firebase.database().ref("tags");

    }, render: function () {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="tagName"> Tag Name </label>
                    <input type="text" id='tagName' className="form-control" rows="1"
                           value={this.state.tagName} onChange={this.handleNameChange}/>
                </div>
                <button type="submit" className="btn btn-primary"> Submit</button>
            </form>
        )
    },
    handleSubmit: function (e) {
        // console.log(this.firebaseRef);
        e.preventDefault();
        this.firebaseRef.push({
            tagName: this.state.tagName,
        });
        this.setState({tagName: ""});
    }
});

module.exports = TagAdder;