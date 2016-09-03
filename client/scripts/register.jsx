/*global $ React ReactDOM document firebase*/

(function () {
    "use strict";

    var RegisterForm = React.createClass({
        getInitialState: function () {
            return {name: '', email: '1@2.3', password: ''};
        },
        handleNameChange: function (e) {
            this.setState({name: e.target.value});
        },
        handleEmailChange: function (e) {
            this.setState({email: e.target.value});
        },
        handlePasswordChange: function (e) {
            this.setState({password: e.target.value});
        },
        handleSubmit: function (e) {
            e.preventDefault();

            var name = this.state.name.trim(),
                email = this.state.email.trim(),
                password = this.state.password.trim();
            console.log(this.state.email);
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(errorCode + ': ' + errorMessage);
            });
        },
        render: function () {
            return (
                <form className="form-signin" onSubmit={this.handleSubmit}>
                    <h2 className="form-signin-heading">Please sign up to use {appTitle}</h2>
                    <div className="form-group">
                        <label htmlFor="inputName" className="sr-only">Email address</label>
                        <input type="text" id="inputName" className="form-control" placeholder="Your Name"
                               required=""
                               autoFocus=""
                               onChange={this.handleNameChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                               required=""
                               onChange={this.handleEmailChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                               required=""
                               onChange={this.handlePasswordChange}/>
                    </div>
                    <div className="form-group">
                        <div className="checkbox pull-left">
                            <label>
                                <input type="checkbox" value="remember-me"/> Remember me
                            </label>
                        </div>
                        <a href="/register" className="pull-right">Create Account</a>
                    </div>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                    <h2>{this.state.email}</h2>
                </form>
            )
        }
    });

    ReactDOM.render(
        <RegisterForm />
        , document.getElementById('registerForm'));
}());