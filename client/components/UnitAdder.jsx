var React = require('react');

var UnitAdder = React.createClass({
    getInitialState: function () {
        return {unitName: ''};
    },
    handleNameChange: function (e) {
        this.setState({unitName: e.target.value});
    },
    componentWillMount: function () {
        this.firebaseRef = firebase.database().ref("units");

    }, render: function () {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="unitName"> Tag Name </label>
                    <input type="text" id='unitName' className="form-control"
                           value={this.state.unitName} onChange={this.handleNameChange}/>
                </div>
                <button type="submit" className="btn btn-primary"> Submit</button>
            </form>
        )
    },
    handleSubmit: function (e) {
        // console.log(this.firebaseRef);
        e.preventDefault();
        this.firebaseRef.push({
            unitName: this.state.unitName,
        });

        this.setState({unitName: ""});
    }
});

module.exports = UnitAdder;