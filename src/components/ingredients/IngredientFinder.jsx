import React from'react';
import AutoComplete from 'material-ui/AutoComplete';
import TagListBuilder from '../TagListBuilder';
const dataSourceConfig = {
    text: 'value',
    value: 'key',
};

const IngredientFinder = React.createClass({
    propTypes: {
        masterList: React.PropTypes.object.isRequired,
        userList: React.PropTypes.object.isRequired,
        addIngredient: React.PropTypes.func.isRequired,
        searchHintText: React.PropTypes.string.isRequired,
        remove: React.PropTypes.func.isRequired,
        ingredientSource: React.PropTypes.object.isRequired,
        loadingUser: React.PropTypes.bool.isRequired
    },
    getInitialState() {
        return {
            searchText: ''
        };
    },

    handleNameChange(e) {
        this.setState({ingredientName: e.target.value});
    },

    handleTypeChange(e) {
        this.setState({ingredientType: e.target.value});
    },

    handleNewIngredient(value) {
        this.props.addIngredient(value);
        this.setState({
            searchText: ''
        });
    },
    handleDelete(tag) {
        this.props.remove(tag);
    },
    handleUpdateInput(t) {
        this.setState({searchText: t});
    },
    alphaByName(a, b) {
        if (a.value < b.value) {
            return -1;
        }
        if (a.value > b.value) {
            return 1;
        }
        return 0;
    },
    render() {
        let masterList = _(this.props.masterList)
            .keys()
            .map((ingredientKey) => {
                const cloned = {'value': _.clone(this.props.masterList[ingredientKey].name)};
                cloned.key = ingredientKey;
                return cloned;
            })
            .value().sort(this.alphaByName);
        let userList = _(this.props.userList)
            .keys()
            .map((ingredientKey) => {
                const cloned = {'value': _.clone(this.props.userList[ingredientKey].name)};
                cloned.key = ingredientKey;
                return cloned;
            })
            .value();

        masterList = masterList.filter((ingredient) => {
            return userList.filter((current_user) => {
                    return current_user.value === ingredient.value && current_user.key === ingredient.key;
                }).length === 0;
        });
        return (
            <div>
                <AutoComplete
                    hintText={this.props.searchHintText}
                    dataSource={masterList}
                    dataSourceConfig={dataSourceConfig}
                    searchText={this.state.searchText}
                    filter={AutoComplete.fuzzyFilter}
                    onNewRequest={this.handleNewIngredient}
                    onUpdateInput={this.handleUpdateInput}
                />
                <TagListBuilder listSource={this.props.ingredientSource}
                                click={this.props.click}
                                remove={this.handleDelete}
                                listHeader={this.props.listHeader} masterList={this.props.masterList}
                                loading={this.props.loadingUser}/>
            </div>
        );
    }
});

export default IngredientFinder;
