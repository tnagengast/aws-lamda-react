import {
  GET_NOTE,
  GET_USER_TOKEN,
} from './types'

import {
    CognitoUserPool,
    AuthenticationDetails,
    CognitoUser
} from 'amazon-cognito-identity-js'
import config from '../config.js'

function login(username, password) {
    const userPool = new CognitoUserPool({
        UserPoolId: config.cognito.USER_POOL_ID,
        ClientId: config.cognito.APP_CLIENT_ID
    })

    const authenticationData = {
        Username: username,
        Password: password
    }

    const user = new CognitoUser({ Username: username, Pool: userPool })
    const authenticationDetails = new AuthenticationDetails(authenticationData)

    return new Promise((resolve, reject) => (
        user.authenticateUser(authenticationDetails, {
            onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
            onFailure: (err) => reject(err),
        })
    ))
}

export function getNote(note) {
    return {
        type: GET_NOTE,
        payload: note
    }
}

export function getUserToken(username, password) {

    const token = login(username, password);

    return {
        type: GET_USER_TOKEN,
        payload: token
    }
}
