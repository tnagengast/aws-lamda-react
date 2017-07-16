import * as dynamoDbLib from '../dynamodb';
import { success, failure } from '../response';

export async function main(event, context, callback) {
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId' partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be User Pool sub of the authenticated user
    const params = {
        TableName: 'notes',
        KeyConditionExpression: "user_id = :user_id",
        ExpressionAttributeValues: {
            ":user_id": event.requestContext.authorizer.claims.sub,
        }
    };

    try {
        const result = await dynamoDbLib.call('query', params);

        callback(null, success(result.Items));
    }

    catch(e) {
        callback(null, failure({status: false}));
    }
};
