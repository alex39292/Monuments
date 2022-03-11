const { google } = require('googleapis');

module.exports = googleDriveInit = () => {
    const credentials = require('../../configs/drive_credentials.json');

    const oauth2Client = new google.auth.OAuth2(
        credentials.CLIENT_ID,
        credentials.CLIENT_SECRET,
        credentials.REDIRECT_URI
    );
    
    oauth2Client.setCredentials({
        refresh_token: credentials.REFRESH_TOKEN
    });
    
    const drive = google.drive({
        version: 'v3',
        auth: oauth2Client
    });

    return drive;
};

