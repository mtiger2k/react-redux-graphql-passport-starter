import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className="form-group">
        <label>{label}</label>
        <div>
            <input {...input} className="form-control" placeholder={label} type={type}/>
            {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span className="text-warning">{warning}</span>))}
        </div>
    </div>
)

const validate = values => {
    const errors = {};
    if (values.password != values.passwordConfirm) {
        errors.password = 'password not match';
    }
    return errors;
}

@connect(
    state=>({errorMsg: state.auth.errorMsg})
)
@reduxForm({
    form: 'login',
    validate
})
export default class LoginForm extends Component {

    render() {
        const { handleSubmit, pristine, reset, submitting, errorMsg } = this.props
        return (
            <form onSubmit={handleSubmit}>
                {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                <Field name="username" className="form-control" component={renderField} type="text" label="Login name"/>
                <Field name="password" className="form-control" component={renderField} type="password" label="Password"/>
                <Field name="passwordConfirm" className="form-control" component={renderField} type="password" label="Confirm"/>
                <div>
                    <button className="btn btn-primary" type="submit" disabled={pristine || submitting}>Sign Up</button>
                    <button className="btn btn-default" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                </div>
            </form>
        );
    }

}