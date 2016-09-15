import React from 'react';

const UnitAdder = React.createClass({
    getInitialState() {
        return {unitName: ''};
    },
    handleNameChange(e) {
        this.setState({unitName: e.target.value});
    },
    componentWillMount() {
        this.firebaseRef = firebase.database().ref("units");

    },
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="unitName"> Tag Name </label>
                    <input type="text" id='unitName' className="form-control"
                           value={this.state.unitName} onChange={this.handleNameChange}/>
                </div>
                <button type="submit" className="btn btn-primary"> Submit</button>
            </form>
        );
    },
    handleSubmit(e) {
        // console.log(this.firebaseRef);
        e.preventDefault();
        this.firebaseRef.push({
            unitName: this.state.unitName,
        });

        this.setState({unitName: ""});
    }
});

export default UnitAdder;