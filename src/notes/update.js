import { success, failure } from '../response';
import * as dynamoDbLib from '../dynamodb';

// test: sls webpack invoke --function notes-update --path src/notes/mocks/update-event.json
export async function main(event, context, callback) {

    const data = JSON.parse(event.body);
    const params = {
        TableName: 'notes',
        Key: {
            user_id: event.requestContext.authorizer.claims.sub,
            note_id: event.pathParameters.id,
        },
        UpdateExpression: 'SET content = :content, attachment = :attachment',
        ExpressionAttributeValues: {
            ':attachment': data.attachment ? data.attachment : null,
            ':content': data.content ? data.content : null,
        },
        ReturnValues: 'ALL_NEW',
    };

    try {
        await dynamoDbLib.call('update', params);
        callback(null, success({status: true}));
    }
    catch(e) {
        callback(null, failure({status: false}));
    }
}
