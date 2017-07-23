import config from './config.js';
import AWS from 'aws-sdk';
import sigV4Client from './sigV4Client';

export async function invoke({ url, method = 'GET', headers = {}, queryParams = {}, data }, userToken) {
    // TODO placeholders until refactor
    let path = url;
    let body = data;
    
    await getAwsCredentials(userToken);
    
    return sigV4Client
        .newClient({
            accessKey: AWS.config.credentials.accessKeyId,
            secretKey: AWS.config.credentials.secretAccessKey,
            sessionToken: AWS.config.credentials.sessionToken,
            region: config.apiGateway.REGION,
            endpoint: config.apiGateway.URL,
        })
        .signRequest({ method, path, headers, queryParams, body });
    
    // data = data ? JSON.stringify(data) : data;
}

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
