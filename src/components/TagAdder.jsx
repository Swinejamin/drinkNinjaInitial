import React from 'react';

const TagAdder = React.createClass({
    getInitialState() {
        return {drinkTagName: ''};
    },
    handleNameChange(e) {
        this.setState({drinkTagName: e.target.value});
    },
    componentWillMount() {
        this.firebaseRef = firebase.database().ref("tags");
    },
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="drinkTagName"> Tag Name </label>
                    <input type="text" id='drinkTagName' className="form-control"
                           value={this.state.drinkTagName} onChange={this.handleNameChange}/>
                </div>
                <button type="submit" className="btn btn-primary"> Submit</button>
            </form>
        );
    },
    handleSubmit(e) {
        // console.log(this.firebaseRef);
        e.preventDefault();
        this.firebaseRef.push({
            drinkTagName: this.state.drinkTagName,
        });
        this.setState({drinkTagName: ""});
    }
});

export default TagAdder;