'use strict';

const { client } = require('./postgres');

module.exports = {
    addToDB: async (user, userId) => {
        try {
            await client.query(`insert into monuments(name, href, death_date) values('${user.name}', '${userId}', '${user.death_date}')`);
            console.log(`User ${user.name} was created`);
        } catch(error) {
            console.log(error);
        }
    },
    getAllFromDB: async () => {
        try {
            let users = [];
            users = await (await client.query(`select * from monuments`)).rows;
            return users;
        } catch(error) {
            console.log(error);
        } 
    }
}