'use strict';

module.exports.dot = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hello :) My name is Dot.',
            //   input: event, // useful for testing, dump the event
        }),
    };

    callback(null, response);
};
