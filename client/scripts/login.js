/*global $ React ReactDOM document firebase*/

(function () {
    "use strict";
    var LoginForm = React.createClass({
        render: function () {
            return (
                <form className="form-signin">
                    <h2 className="form-signin-heading">Please sign in</h2>
                    <div className="form-group">
                        <label htmlFor="inputEmail" className="sr-only">Email address</label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                               required=""
                               autoFocus=""/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                               required=""/>
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