import { success, failure } from '../response';
import * as dynamoDbLib from '../dynamodb';

import uuid from 'uuid';

// test: sls webpack invoke --function notes-create --path src/notes/mocks/create-event.json
export async function main(event, context, callback) {

    const data = JSON.parse(event.body);
    const params = {
        TableName: 'notes',
        Item: {
            userId: event.requestContext.authorizer.claims.sub,
            noteId: uuid.v1(),
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
        callback(null, failure({status: false}));
    }
};
