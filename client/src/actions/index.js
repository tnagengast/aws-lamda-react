import {
  NOTES_SHOW,
  NOTES_INDEX,
  GET_USER_TOKEN,
  UPDATE_USER_TOKEN,
} from './types'

import {
    CognitoUserPool,
    AuthenticationDetails,
    CognitoUser
} from 'amazon-cognito-identity-js'
import { invokeApig } from '../aws';
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

export function notesShow(note) {
    return {
        type: NOTES_SHOW,
        payload: note
    }
}

export function notesIndex(token) {
    let notes = invokeApig({ path: '/notes' }, token);
    // console.dir('check notes response: ', notes);
    
    return {
        type: NOTES_INDEX,
        payload: notes
    }
}

export function getUserToken(username, password) {

    const token = login(username, password);

    return {
        type: GET_USER_TOKEN,
        payload: token
    }
}

export function updateUserToken(token) {
    console.log('udateUserToken (actions/index)');
    
    return {
        type: UPDATE_USER_TOKEN,
        payload: token
    }
}
