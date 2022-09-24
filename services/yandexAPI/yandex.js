const fs = require('fs');
const credentials = require('../../configs/y_credentials');
const axios = require('axios').create({
    baseURL: 'https://cloud-api.yandex.net/v1/disk',
    headers: { 'Authorization': credentials.TOKEN },
});

const getURL = async (path, method) => {
    try {
        const response = await axios.get(`/resources/${method}?path=${path}`);
        return response.data.href;
    } catch(error) {
        console.log(`Error with getURL() method: ${error}`);
    }    
};

module.exports = {
    getDisk: async () => {
        try {
            const response = await axios.get('/');
            console.log(response.data); 
        } catch(error) {
            console.log(`Error with method getDisk(): ${error}`);
        }
    },
    createFolder: async (path) => {
        try {
            const response = await axios.put(`/resources?path=${path}`);
            console.log(`Folder is created with status ${response.status}`);
            return response.status;
        } catch(error) {
            console.log(`Error with method createFolder(): ${error} `);
        }
    },
    delete: async (path) => {
        try {
            const response = await axios.delete(`/resources?path=${path}`);
            console.log(response.status);
        } catch(error) {
            console.log(`Error with method delete(): ${error}`);
        }
    },
    uploadFile: async (path, file_path) => {
        try {
            const href = await getURL(path, 'upload');
            let response = await axios.put(href,  fs.createReadStream(file_path));
            console.log(`File ${file_path} is uploaded with status ${response.status}`);
        } catch(error) {
            console.log(`Error with method uploadFile(): ${error}`);
        }
    },
    getFileURL: async (path) => {
        return await getURL(path, 'download');  
    },
    getFilesFrom: async (path) => {
        const response = await axios.get(`/resources?path=${path}`);
        const files = []; 
        response.data._embedded.items.forEach(file => {
            files.push({ name: file.name, file: file.file })
        });
        return files;
    }
};