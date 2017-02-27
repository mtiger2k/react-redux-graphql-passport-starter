import React, { Component, PropTypes } from 'react'
import { signUpUser } from '../actions/auth'
import SignupForm from '../components/SignupForm'

export default class Login extends Component {

    handleSubmit = (values, dispatch) => {
        dispatch(signUpUser(values.username, values.password));
    }

    render() {
        return (
            <SignupForm onSubmit={this.handleSubmit} />
        );
    }
}