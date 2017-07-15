import * as dynamoDbLib from './src/dynamodb';
import { success, failure } from './src/response';

export async function main(event, context, callback) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: 'notes',
        // 'Key' defines the partition key and sort key of the item to be updated
        // - 'userId': User Pool sub of the authenticated user
        // - 'noteId': path parameter
        Key: {
            user_id: event.requestContext.authorizer.claims.sub,
            note_id: event.pathParameters.id,
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        UpdateExpression: 'SET content = :content, attachment = :attachment',
        ExpressionAttributeValues: {
            ':attachment': data.attachment ? data.attachment : null,
            ':content': data.content ? data.content : null,
        },
        ReturnValues: 'ALL_NEW',
    };

    try {
        const result = await dynamoDbLib.call('update', params);
        callback(null, success({status: true}));
    }
    catch(e) {
        callback(null, failure({status: false}));
    }
};
