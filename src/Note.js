import uuid from 'uuid';
import AWS from 'aws-sdk';

import * as dynamoDbLib from './dynamodb';
import { success, failure } from './response';

export default class Note {

    // test: sls webpack invoke --function list --path mocks/create-event.json
    static async create(event, context, callback) {
        const data = JSON.parse(event.body);

        const params = {
            TableName: 'notes',
            Item: {
                user_id: event.requestContext.authorizer.claims.sub,
                note_id: uuid.v1(),
                content: data.content,
                attachment: data.attachment,
                created_at: new Date().getTime(),
            },
        };

        try {
            const result = await dynamoDbLib.call('put', params);
            callback(null, success(params.Item));
        }
        catch(e) {
            callback(null, failure({status: false}));
        }
    }

    // test: sls webpack invoke --function list --path mocks/list-event.json
    static async list(event, context, callback) {
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
    }

    // test: sls webpack invoke --function list --path mocks/get-event.json
    static async get(event, context, callback) {
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

    // test: sls webpack invoke --function list --path mocks/update-event.json
    static async update(event, context, callback) {
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
            const result = await dynamoDbLib.call('update', params);
            callback(null, success({status: true}));
        }
        catch(e) {
            callback(null, failure({status: false}));
        }
    }

    // test: sls webpack invoke --function list --path mocks/delete-event.json
    static async delete(event, context, callback) {
        const params = {
            TableName: 'notes',
            Key: {
                user_id: event.requestContext.authorizer.claims.sub,
                note_id: event.pathParameters.id,
            },
        };

        try {
            const result = await dynamoDbLib.call('delete', params);

            callback(null, success({status: true}));
        }
        catch(e) {
            callback(null, failure({status: false}));
        }
    }
}
