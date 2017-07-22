import config from './config.js';
import AWS from 'aws-sdk';
import axios from 'axios';
import sigV4Client from './sigV4Client';

export async function invoke({
         url, method = 'GET', headers = {}, queryParams = {}, data 
     }, userToken) {

    // TODO placeholders until refactor
    let path = url;
    let body = data;
    
    await getAwsCredentials(userToken);

    const signedRequest = sigV4Client
        .newClient({
            accessKey: AWS.config.credentials.accessKeyId,
            secretKey: AWS.config.credentials.secretAccessKey,
            sessionToken: AWS.config.credentials.sessionToken,
            region: config.apiGateway.REGION,
            endpoint: config.apiGateway.URL,
        })
        .signRequest({ method, path, headers, queryParams, body });

    console.log('sig: ', signedRequest); // TODO remove console.log
    
    data = data ? JSON.stringify(data) : data;
    headers = signedRequest.headers;
    console.dir({
        url: signedRequest.url,
        method: method,
        headers: headers,
    }); // TODO remove console.dir
    
    axios({
        url: signedRequest.url,
        method: method,
        headers: headers,
    }).then((response) => {
        console.log('success: ', response); // TODO remove console.log
        return response.data
    }).catch((error) => {
        console.error('error: ', error); // TODO remove console.log
    })
}

// export async function invoke({ url, method = 'GET', data }, Authorization) {
//
//     await getAwsCredentials(Authorization);
//     const signedRequest = sigV4Client
//         .newClient({
//             accessKey: AWS.config.credentials.accessKeyId,
//             secretKey: AWS.config.credentials.secretAccessKey,
//             sessionToken: AWS.config.credentials.sessionToken,
//             region: config.apiGateway.REGION,
//             endpoint: config.apiGateway.URL,
//         })
//         .signRequest({
//             method,
//             path,
//             headers,
//             queryParams,
//             body
//         });
//
//     axios.defaults.headers.common['Authorization'] = Authorization;
//     axios.defaults.baseURL = config.apiGateway.URL;
//
//     data = (data) ? JSON.stringify(data) : data; // for full text ish
//
//     axios({ method, url, data }).then((response) => {
//         return response.data;
//     }).catch((error) => {
//         console.error(error);
//     })
// }

export function getAwsCredentials(token) {
    if (AWS.config.credentials && Date.now() < AWS.config.credentials.expireTime - 60000) {
        return;
    }

    const authenticator = `cognito-idp.${config.cognito.REGION}.amazonaws.com/${config.cognito.USER_POOL_ID}`;

    AWS.config.update({ region: config.cognito.REGION });

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: config.cognito.IDENTITY_POOL_ID,
        Logins: {
            [authenticator]: token
        }
    });

    return AWS.config.credentials.getPromise();
}

export async function s3Upload(file, userToken) {
    await getAwsCredentials(userToken);

    let s3 = new AWS.S3({
        params: {
            Bucket: config.s3.BUCKET,
        }
    });

    let filename = `${AWS.config.credentials.identityId}-${Date.now()}-${file.name}`;

    return s3.upload({
        Key: filename,
        Body: file,
        ContentType: file.type,
        ACL: 'public-read',
    }).promise();
}
