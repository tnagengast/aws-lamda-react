import * as dynamoDbLib from './src/dynamodb';
import { success, failure } from './src/response';

export async function main(event, context, callback) {
    const params = {
        TableName: 'notes',
        // 'Key' defines the partition key and sort key of the item to be retrieved
        // - 'userId': federated identity ID of the authenticated user
        // - 'noteId': path parameter
        Key: {
            user_id: event.requestContext.authorizer.claims.sub,
            note_id: event.pathParameters.id,
        },
    };

    try {
        const result = await dynamoDbLib.call('get', params);
        if (result.Item) {
            // Return the retrieved item
            callback(null, success(result.Item));
        }
        else {
            callback(null, failure({status: false, error: 'Item not found.'}));
        }
    }
    catch(e) {
        callback(null, failure({status: false}));
    }
};
