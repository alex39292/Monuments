'use strict';

const https = require('https');
const fs = require('fs');
const sha1 = require('sha1');
const ymaps = require('../ymaps');
const userDB = require('../postgres/userDB');
const yandexDriveAPI = require('../yandexAPI/yandex');
const apiKey = require('../../configs/y_credentials').API_KEY;

module.exports = {
    renderUser: async (req, res) => {
        const userId = req.params.userId;
        const linkBio = await yandexDriveAPI.getFileURL(`${userId}/bio.doc`);
        const linkJson = await yandexDriveAPI.getFileURL(`${userId}/user.json`);
        const user = JSON.parse(await getFileBio(linkJson));
        if (!linkBio) {
          return res.send('Ups...There is no information here');
        } else {
            res.render('user', {
                locals: {
                  apiKey: `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`,
                  name: user.name,
                  birth_date: user.birth_date,
                  death_date: user.death_date,
                  text_epitafia: user.text_epitafia,
                  textFile: await getFileBio(linkBio),
                  ymaps: ymaps(user.coordinates),
                  mainPhoto: await yandexDriveAPI.getFileURL(`${userId}/main.jpg`),
                  listOfPhoto: await yandexDriveAPI.getFilesFrom(`${userId}/List`)
                }
              });
        }
    },
    createUser: async (req, res) => {
        const userId = sha1(req.body.name + Date.now());
        await yandexDriveAPI.createFolder(userId);
        createJSON(req, userId);
        userDB.addToDB(req.body, userId);
        await yandexDriveAPI.createFolder(`${userId}/List`);
        for (const key in req.files) {
            const file = req.files[key];
            if (file.name === 'main.jpg' || file.name === 'bio.doc') {
                file.mv(file.name);
                await yandexDriveAPI.uploadFile(`${userId}/${file.name}`, file.name);
                deleteFile(file.name);
            } else {
                file.forEach(async file_t => {
                    file_t.mv(file_t.name);
                    await yandexDriveAPI.uploadFile(`${userId}/List/${file_t.name}`, file_t.name);
                    deleteFile(file_t.name);
                });
            }        
      }
      res.render('admin');
    },
    createView: async (req, res) => {
        const users = await userDB.getAllFromDB();
        res.render('view', {
            locals: {
                users: users,
            }
        });
    }
};

const createJSON = async (req, userId) => {
    const user = {
        name: req.body.name,
        main_image: req.body.main_image,
        birth_date: new Date(req.body.birth_date).toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'}),
        death_date: new Date(req.body.death_date).toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'}),
        text_epitafia: req.body.text_epitafia,
        coordinates: req.body.coordinates
    };

    const json = JSON.stringify(user);
    fs.writeFile('user.json', json, 'utf8', err => {
        if (err) throw(err)
        });
    await yandexDriveAPI.uploadFile(`${userId}/user.json`, 'user.json');

    deleteFile('user.json');
};

const deleteFile = async file => {
    await fs.unlink(file, err => {
        if (err) {
            throw err;
        } 
        console.log(`File ${file} deleted`);
    });
};

const getFileBio = link => {
    return new Promise((resolve, reject) => {
        https.get(link, response => {
            https.get(response.headers.location, res => {
              let text = '';  
              res.on('data', data => {
                text += data.toString('utf-8');
              });
              res.on('end', () => {
                resolve(text);
              });
            }).on('error', e => reject(e));
            }).on('error', e => reject(e));
    });
};