import { success, failure } from '../response';
import * as dynamoDbLib from '../dynamodb';

// test: sls webpack invoke --function notes-get --path src/notes/mocks/get-event.json
export async function main(event, context, callback) {

    let params = {
        TableName: 'notes',
        Key: {
            user_id: event.requestContext.identity.cognitoIdentityId,
            note_id: event.pathParameters.id,
        },
    };

    try {
        let result = await dynamoDbLib.call('get', params);

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
