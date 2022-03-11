const googleDriveAPI = require('./services/googleAPI/google_driveAPI');

const fileName = 'Spider Man.jpg';
const folderId = '16E5NbwuxbI8LGzKs-CdHmA9RqskMutkx';

const fileId = googleDriveAPI.delete(folderId);

console.log(fileId);