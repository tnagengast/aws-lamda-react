import { success, failure } from '../response';
import * as dynamoDbLib from '../dynamodb';
import uuid from 'uuid';

// test: sls webpack invoke --function notes-create --path src/notes/mocks/create-event.json
export async function main(event, context, callback) {

    let data = JSON.parse(event.body);
    let params = {
        TableName: 'notes',
        Item: {
            user_id: event.requestContext.identity.cognitoIdentityId,
            note_id: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: new Date().getTime(),
        },
    };

    try {
        await dynamoDbLib.call('put', params);
        callback(null, success(params.Item));
    }
    catch(e) {
        console.log(e);
        callback(null, failure({status: false}));
    }
};
