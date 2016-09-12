import React from'react';
import AutoComplete from 'material-ui/AutoComplete';

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
        let masterList = _(this.props.masterList)
            .keys()
            .map((ingredientKey) => {
                const cloned = {'value': _.clone(this.props.masterList[ingredientKey].ingredientName)};
                cloned.key = ingredientKey;
                return cloned;
            })
            .value();
        const dataSourceConfig = {
            text: 'value',
            value: 'key',
        };
        return (
            <div>
                <AutoComplete
                    hintText="Add somehting to your cabinet"
                    dataSource={masterList}
                    dataSourceConfig={dataSourceConfig}
                    filter={AutoComplete.fuzzyFilter}
                    onNewRequest={this.handleNewIngredient.bind(this)}
                />
            </div>
        );
    }
}

export default IngredientFinder;
