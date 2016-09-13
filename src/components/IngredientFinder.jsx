import React from'react';
import AutoComplete from 'material-ui/AutoComplete';

class IngredientFinder extends React.Component {
    static propTypes = {
        masterList: React.PropTypes.object.isRequired,
        userList: React.PropTypes.object.isRequired,
        addIngredient: React.PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.state = {searchText: ''};
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
        this.props.addIngredient(value);
        this.setState({
            searchText: ''
        });
    }

    handleUpdateInput(t) {
        this.setState({searchText: t})
    }

    render() {
        function alphaByName(a, b) {
            if (a.value < b.value) {
                return -1;
            }
            if (a.value > b.value) {
                return 1;
            }
            return 0;
        }

        let masterList = _(this.props.masterList)
            .keys()
            .map((ingredientKey) => {
                const cloned = {'value': _.clone(this.props.masterList[ingredientKey].ingredientName)};
                cloned.key = ingredientKey;
                return cloned;
            })
            .value().sort(alphaByName);
        let userList = _(this.props.userList)
            .keys()
            .map((ingredientKey) => {
                const cloned = {'value': _.clone(this.props.userList[ingredientKey])};
                cloned.key = ingredientKey;
                return cloned;
            })
            .value();
        const dataSourceConfig = {
            text: 'value',
            value: 'key',
        };
        masterList = masterList.filter((current) => {
            return userList.filter((current_user) => {
                return current_user.value === current.value && current_user.key === current.key;
            }).length === 0;
        });

        return (
            <div>
                <AutoComplete
                    hintText="Add ingredients to your cabinet"
                    dataSource={masterList}
                    dataSourceConfig={dataSourceConfig}
                    searchText={this.state.searchText}
                    filter={AutoComplete.fuzzyFilter}
                    onNewRequest={this.handleNewIngredient.bind(this)}
                    onUpdateInput={this.handleUpdateInput.bind(this)}
                />
            </div>
        );
    }
}

export default IngredientFinder;
