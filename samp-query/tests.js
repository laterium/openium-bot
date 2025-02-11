/// @samp-query : tests.js

const sampQuery = require('samp-query');
require('colors');

const _host = process.env.SAMP_HOST || '127.0.0.1';
const _port = Number(process.env.SAMP_PORT) || 7777;

const options = {
    host: _host,
    port: _port
};

sampQuery(options, (error, response) => {
    if (error) {
        console.error('(js) SA-MP Query Error (samp-query):' .red, error);
        return;
    }

    console.log('(js) SA-MP Query Data (samp-query):' .yellow, response);
});
