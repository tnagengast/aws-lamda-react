import { success, failure } from '../response';
import * as dynamoDbLib from '../dynamodb';

// test: sls webpack invoke --function notes-get --path src/notes/mocks/get-event.json
export async function main(event, context, callback) {

    const params = {
        TableName: 'notes',
        Key: {
            user_id: event.requestContext.authorizer.claims.sub,
            note_id: event.pathParameters.id,
        },
    };

    try {
        const result = await dynamoDbLib.call('get', params);

        if (result.Item) {
            callback(null, success(result.Item));
        } else {
            callback(null, failure({status: false, error: 'Item not found.'}));
        }
    }
    catch(e) {
        callback(null, failure({status: false}));
    }
}
