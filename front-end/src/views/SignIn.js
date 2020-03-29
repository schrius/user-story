import React from 'react';
import './SignIn.css'

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSignIn = event => {
        event.preventDefault();
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="container signin">
                <form className="col-6" onSubmit={this.handleSignIn}>
                    <h3 className="text-muted"> Sign In</h3>
                    <div className="form-group">
                    <label htmlfor="email">
                        Email address:
                    </label>
                    <input type="email" name="email" className="form-control" placeholder="example@example.com" id="email" />
                    </div>
                    <div className="form-group">
                    <label htmlfor="password">
                        Password:
                    </label>
                    <input type="password" name="password" className="form-control" placeholder="********" id="pwd" />
                    </div>
                    <div className="form-group">
                        <div className="custom-control custom-switch">
                            <label className="custom-control-label" htmlfor="adminswitch">Administrator</label>
                            <input name="admin" className="custom-control-input" type="checkbox" id="adminswitch" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        )
    }
}

export default SignIn