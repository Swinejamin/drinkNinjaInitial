import React from'react';
import MasterIngredientList from './MasterIngredientList.jsx';

class IngredientFinder extends React.Component {
    static propTypes = {
        masterList: React.PropTypes.object.isRequired,
        addIngredient: React.PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {ingredientName: ''};
    }

    componentDidMount() {
        this.userRef = firebase.database().ref(this.props.userRef);
    }

    handleNameChange(e) {
        this.setState({ingredientName: e.target.value});
    }

    handleTypeChange(e) {
        this.setState({ingredientType: e.target.value});
    }

    handleNewIngredient(value) {
        this.setState({ingredientName: ''});
        this.props.addIngredient(value);
    }

    render() {
        return (
            <div className="input-group">
                <MasterIngredientList listenerFromParent={this.handleNewIngredient.bind(this)} multi={false}/>
            </div>
        );
    }
}

export default IngredientFinder;
