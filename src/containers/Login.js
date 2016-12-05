import React, { Component, PropTypes } from 'react'
import { signInUser } from '../actions/auth'
import LoginForm from '../components/LoginForm'

export default class Login extends Component {

    handleSubmit = (values, dispatch) => {
        dispatch(signInUser(values.username, values.password));
    }

    render() {
        return (
            <LoginForm onSubmit={this.handleSubmit} />
        );
    }
}