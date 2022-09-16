const yandexDriveAPI = require('./yandexAPI/yandex');
const pg = require('./postgres/postgres');
const { client, turnConnection } = require('./postgres/postgres');

//yandexDriveAPI.getDisk();
//yandexDriveAPI.createFolder('Alexx');
//yandexDriveAPI.delete('Spider Man.jpg');
//yandexDriveAPI.uploadFile('Alex/bio.txt', jpg_file);
//yandexDriveAPI.getFileURL('Alex/Spider Man.jpg').then(url => console.log(url));
//yandexDriveAPI.getFilesFrom('Alex').then(files => console.log(files));

module.exports = {
    getFilesFrom: async (path) => {
        const files = await yandexDriveAPI.getFilesFrom(path);
        return files;
    },
    createFolder: async (name) => {
        const status = await yandexDriveAPI.createFolder(name);
        if (status === 201) {
            const text = 'INSERT INTO monuments(folder_name, href) VALUES($1, $2) RETURNING *';
            const values = [name, 'some href'];
            try {
                await turnConnection();
                const res = await client.query(text, values);
                await client.end();
                console.log(`Folder is created with status: ${res.rows[0]}`);
              } catch (error) {
                console.log(error.stack);
              }
        }
    },
};
