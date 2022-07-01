const { Client } = require('pg');
const options = require('../../configs/pg_credentials');

const client = new Client(options);

module.exports = {
    client: client,
    turnConnection: async () => {
        try {
                await client.connect();
                console.log('Connected to DataBase');
        } catch (error) {
            await client.end();
            console.log(error);
        }
    },
}

