import config from './config.js';
import AWS from 'aws-sdk';

export async function invokeApig( { path, method = 'GET', body }, userToken) {
    const url = `${config.apiGateway.URL}${path}`;

    const headers = {
        Authorization: userToken,
    };

    body = (body) ? JSON.stringify(body) : body;

    // console.log('notes url: ', url); // TODO remvoe console.log
    
    const results = await fetch(url, { method, body, headers });

    if (results.status !== 200) {
        throw new Error(await results.text());
    }
    
    // console.log('check notes response: ', results.json()); // TODO Remove console.log

    return results.json();
}

export function getAwsCredentials(userToken) {
    const authenticator = `cognito-idp.${config.cognito.REGION}.amazonaws.com/${config.cognito.USER_POOL_ID}`;

    AWS.config.update({ region: config.cognito.REGION });

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: config.cognito.IDENTITY_POOL_ID,
        Logins: {
            [authenticator]: userToken
        }
    });

    return AWS.config.credentials.getPromise();
}

export async function s3Upload(file, userToken) {
    await getAwsCredentials(userToken);

    const s3 = new AWS.S3({
        params: {
            Bucket: config.s3.BUCKET,
        }
    });

    const filename = `${AWS.config.credentials.identityId}-${Date.now()}-${file.name}`;

    return s3.upload({
        Key: filename,
        Body: file,
        ContentType: file.type,
        ACL: 'public-read',
    }).promise();
}
