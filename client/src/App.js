import { Navbar, Nav, NavItem } from 'react-bootstrap'
import RouteNavItem from './components/RouteNavItem'
import { Link, withRouter } from 'react-router-dom'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import config from './config.js'
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import Routes from './routes'
import './styles/css/App.css'
import * as actions from './actions';
import AWS from 'aws-sdk';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoadingUserToken: true,
        }
    }

    async componentDidMount() {
        let currentUser = this.getCurrentUser();
        
        if ( ! currentUser) {
            this.setState({isLoadingUserToken: false});
            return
        }

        try {
            let userToken = await this.getUserToken(currentUser);
            this.props.updateUserToken(userToken)
        }
        catch(e) {
            console.log('Failed to get userToken in App: ', e)
        }

        this.setState({isLoadingUserToken: false})
    }

    handleNavLink = (event) => {
        event.preventDefault();

        this.props.history.push(event.currentTarget.getAttribute('href'))
    };

    handleLogout = (event) => {
        let currentUser = this.getCurrentUser();

        if (currentUser) {
            currentUser.signOut()
        }
        if (AWS.config.credentials) {
            AWS.config.credentials.clearCachedId();
        }

        this.props.updateUserToken(null)

        this.props.history.push('/login')
    };

    getCurrentUser() {
        let userPool = new CognitoUserPool({
            UserPoolId: config.cognito.USER_POOL_ID,
            ClientId: config.cognito.APP_CLIENT_ID
        });

        return userPool.getCurrentUser()
    }

    getUserToken(currentUser) {
        return new Promise((resolve, reject) => {
            currentUser.getSession(function(err, session) {
                if (err) {
                    reject(err);
                    return
                }

                resolve(session.getIdToken().getJwtToken())
            })
        })
    }

    render() {

        let childProps = { // TODO convert this to redux state
            userToken: this.props.userToken,
            updateUserToken: this.updateUserToken,
        };
        
        return ! this.state.isLoadingUserToken && (
            <div className="App container">
                <Navbar fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Riptide Notes</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                        {
                            this.props.userToken
                            ? <NavItem onClick={ this.handleLogout }>Logout</NavItem>
                            : [
                                <RouteNavItem key={ 1 } onClick={ this.handleNavLink } href="/signup">Signup</RouteNavItem>,
                                <RouteNavItem key={ 2 } onClick={ this.handleNavLink } href="/login">Login</RouteNavItem>
                            ]
                        }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Routes childProps={childProps} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userToken: state.userToken,
        notes: state.notes
    }
}

export default withRouter(
    connect(mapStateToProps, actions)(App)
)
