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
import axios from 'axios';
import { invoke } from '../aws';
import config from '../config.js'

function login(Username, Password) {
    let Pool = new CognitoUserPool({
        UserPoolId: config.cognito.USER_POOL_ID,
        ClientId: config.cognito.APP_CLIENT_ID
    })

    return new Promise((resolve, reject) => (
        new CognitoUser({ Username, Pool })
            .authenticateUser(new AuthenticationDetails({ Username, Password }), {
                onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
                onFailure: (err) => reject(err),
            })
    ))
}

export function notesShow(payload) {
    return { type: NOTES_SHOW, payload }
}

export async function notesIndex(token) {

    let sig = invoke({ url: '/notes' }, token)

    return sig.then((signedRequest) => {
        return {
            type: NOTES_INDEX,
            payload: axios.get(signedRequest.url, { headers: signedRequest.headers })
        }
    })
}

// export function notesIndex(token) {
//     console.log('testing notesIndex action'); // TODO remove console.log
//
//     return { type: NOTES_INDEX, payload: '' }
// }

export function getUserToken(username, password) {
    let payload = login(username, password);

    return { type: GET_USER_TOKEN, payload }
}

export function updateUserToken(payload) {
    return { type: UPDATE_USER_TOKEN, payload }
}
