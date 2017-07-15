import * as dynamoDbLib from './src/dynamodb';
import { success, failure } from './src/response';

export async function main(event, context, callback) {
    const params = {
        TableName: 'notes',
        // 'KeyConditionExpression' defines the condition for the query
        // - 'userId = :userId': only return items with matching 'userId' partition key
        // 'ExpressionAttributeValues' defines the value in the condition
        // - ':userId': defines 'userId' to be User Pool sub of the authenticated user
        KeyConditionExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
            ":user_id": event.requestContext.authorizer.claims.sub,
        }
    };

    try {
        const result = await dynamoDbLib.call('query', params);
        // Return the matching list of items in response body
        callback(null, success(result.Items));
    }
    catch(e) {
        callback(null, failure({status: false}));
    }
};
