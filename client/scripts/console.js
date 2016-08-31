/*global React ReactDOM document*/
var IngredientAdder = React.createClass({
    render: function () {
        return (
            <div>
                <div className='form-group'>
                    <label htmlFor="ingredientType"> Ingredient Type </label>
                    <select id="ingredientType" className="form-control">
                        <option> Mixer</option>
                        <option> Alcohol</option>
                        <option> Garnish</option>
                    </select>
                </div>
                <div className='form-group'>
                    <label htmlFor="ingredientName"> Ingredient Type </label>
                    <textarea id='ingredientName' className="form-control" rows="1"></textarea>
                </div>
                <button type="submit" className="btn btn-primary"> Submit</button>
            </div>
        )
    }
});

ReactDOM.render(<IngredientAdder />, document.getElementById("ingredientAdder"));