/*global $ React ReactDOM document firebase*/

(function () {
    "use strict";
    var LoginForm = React.createClass({
        getInitialState: function () {
            return {email: '1@2.3', password: ''};
        },
        handleEmailChange: function (e) {
            this.setState({email: e.target.value});
        },
        handlePasswordChange: function (e) {
            this.setState({password: e.target.value});
        },
        handleSubmit: function (e) {
            e.preventDefault();

            var email = this.state.email.trim(),
                password = this.state.password.trim();
            console.log(email);
            firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
                firebase.auth().currentUser.getToken(/* forceRefresh */ true).then(function (idToken) {
                    $.ajax({
                        url: '/api/user',
                        type: 'POST',
                        data: {token: idToken}
                    });
                    setTimeout(function(){
                        window.location = '/api/console';
                    }, 0)
                });
            }).catch(function (error) {
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
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <div className="form-group">
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                               required=""
                               autoFocus=""
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
                </form>
            )
        }
    });

    ReactDOM.render(
        <LoginForm />
        , document.getElementById('loginForm'));
}());