import React from 'react';
import { connect } from 'react-redux';
import './Login.css';
import { LoginRedux } from '../../redux/actions'

const { mapStateToProps, mapDispatchToProps} = LoginRedux

// login view
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            email: '',
            password: '',
            admin: false,
        }
        this.Login = (email, password) => event => {
            event.preventDefault();
            this.props.onLogin(email, password);
        }
        this.handleChange = this.handleChange.bind(this)
        this.changeLogin = this.changeLogin.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    changeLogin(event) {
        this.setState({
         [event.target.name]: event.target.checked
        })
    }

    render() {
        return (
            <div className="container signin">
                <form onSubmit={this.Login(this.state.email, this.state.password, this.state.admin)}>
                    <h3 className="text-muted">Sign In</h3>
                    <div className="form-group">
                        <label htmlFor="email">
                            Email address:
                    </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="example@example.com"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">
                            Password:
                    </label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="password"
                            id="pwd"
                            value={this.state.password}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block" disabled={this.props.loading}>Login</button>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)