import { success, failure } from '../response';
import * as dynamoDbLib from '../dynamodb';

// test: sls webpack invoke --function notes-list --path src/notes/mocks/list-event.json
export async function main(event, context, callback) {

    const params = {
        TableName: 'notes',
        KeyConditionExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
            ":user_id": event.requestContext.identity.cognitoIdentityId,
        }
    };

    try {
        const result = await dynamoDbLib.call('query', params);

        callback(null, success(result.Items));
    }
    catch(e) {
        callback(null, failure({status: false}));
    }
}
