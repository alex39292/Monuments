const yandex = require('./services/yandexAPI/yandex');
const yandexDriveAPI = require('./services/yandexAPI/yandex');

const jpg_file = 'D:/Monuments/resources/bio.txt';

//yandexDriveAPI.getDisk();
//yandexDriveAPI.createFolder('Alex');
//yandexDriveAPI.delete('Spider Man.jpg');
yandexDriveAPI.uploadFile('Alex/bio.txt', jpg_file);
yandexDriveAPI.getFileURL('Alex/Spider Man.jpg').then(url => console.log(url));