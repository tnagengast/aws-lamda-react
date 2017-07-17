import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap'
import { Field, reduxForm} from 'redux-form'
import { getUserToken } from '../actions/index'
import LoaderButton from '../components/LoaderButton'
import '../styles/css/Login.css'
import '../styles/css/App.css'

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = { isLoading: false }
    }

    onSubmit = async (values) => {

        this.setState({ isLoading: true })

        try {
            await this.props.getUserToken(values.username, values.password)
            this.props.history.push('/')
        }
        catch(e) {
            console.log('Failed to login user: ', e)
            this.setState({ isLoading: false })
        }
    }

    renderField(field) {
        let { meta: { touched, error } } = field

        return (
            <FormGroup
                className={`${ touched && error ? 'input-danger' : '' }`}
                controlId='username'
                bsSize='large'>
                <ControlLabel>{field.label}</ControlLabel>
                <FormControl type={field.type} {...field.input} />
                <div className={`${ touched && error ? 'alert alert-danger' : '' }`}>
                    { touched ?  error : '' }
                </div>
            </FormGroup>
        )
    }

    render() {
        let { handleSubmit } = this.props

        return (
            <div className="Login">
                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field label='Username' name='username' type='text' component={this.renderField} autoFocus />
                    <Field label='Password' name='password' type='password' component={this.renderField} />
                    <LoaderButton
                          block bsSize="large" type="submit"
                          isLoading={ this.props.isLoading }
                          text="Login"
                          loadingText="Logging in…" />
                </form>
            </div>
        )
    }
}

function validate(values) {

    let errors = {}

    errors.username = ( ! values.username) ? 'Must enter a username' : null
    errors.password = ( ! values.password) ? 'Must enter a password' : null

    return errors
}

function mapStateToProps(state) {
    return {
        userToken: state.userToken,
    };
}

export default withRouter(
    reduxForm(
        { validate, form: 'LoginForm' }
    )(connect(
        mapStateToProps, { getUserToken }
    )(Login))
)
