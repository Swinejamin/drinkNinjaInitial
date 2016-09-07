var React = require('react');

var TagAdder = React.createClass({
    getInitialState: function () {
        return {drinkTagName: ''};
    },
    handleNameChange: function (e) {
        this.setState({drinkTagName: e.target.value});
    },
    componentWillMount: function () {
        this.firebaseRef = firebase.database().ref("tags");

    }, render: function () {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="drinkTagName"> Tag Name </label>
                    <input type="text" id='drinkTagName' className="form-control"
                           value={this.state.drinkTagName} onChange={this.handleNameChange}/>
                </div>
                <button type="submit" className="btn btn-primary"> Submit</button>
            </form>
        )
    },
    handleSubmit: function (e) {
        // console.log(this.firebaseRef);
        e.preventDefault();
        this.firebaseRef.push({
            drinkTagName: this.state.drinkTagName,
        });
        this.setState({drinkTagName: ""});
    }
});

module.exports = TagAdder;