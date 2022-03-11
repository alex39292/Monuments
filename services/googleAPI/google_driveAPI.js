const googleDriveInit = require('./google_drive_initialization');
const defineType = require('./typeDefinder');
const fs = require('fs');
const path = require('path');

const drive = googleDriveInit();

module.exports =  {
    upload: async (fileName, folderId = undefined) => {
        const filePath = path.join(__dirname, '../../resources/', fileName);
        const mimeType = defineType(fileName);

        try {
            const response = await drive.files.create({
                requestBody: {
                    name: fileName,
                    mimeType: mimeType,
                    parents: [folderId]
                },
                media: {
                    mimeType: mimeType,
                    body: fs.createReadStream(filePath)
                }
            });
            console.log(response.data.id);

            return response.data.id;
        } catch (error) {
            console.log(error.message);
        }
    },
    delete: async (fileId) => {
        try {
            const response = await drive.files.delete({ fileId: fileId });
            console.log(response.status);

            return response.status;
        } catch (error) {
            console.log(error.message)
        }
    },
    download: async (fileId) => {
        try {
            
        } catch (error) {
            console.log(error.message);
        }
    }
};
