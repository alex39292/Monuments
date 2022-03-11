module.exports = (fileName) => {
    const type = fileName.substring(fileName.indexOf('.'), fileName.length);

    switch (type) {
        case '.jpg':
            return 'image/jpg';
        case '.html':
            return 'text/html';
        case '.mp4':
            return 'video/mp4';
        default: 
            return 'application/vnd.google-apps.folder';
    }
};