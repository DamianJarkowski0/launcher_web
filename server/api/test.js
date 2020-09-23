const express = require('express');
const router = express.Router();
const Client = require('ssh2-sftp-client');
const connection = new Client();
const connSettings = {
    host: '51.254.158.115',
    port: 22, // Normal is 22 port
    username: 'user',
    password: 'yPjUdMs^6',
    // You can use a key file too, read the ssh2 documentation
};

const remotePath = '/user/home/test';

const localPath = '/mnt/d/ws/Launcher/web/test.txt';

router.get('/down', (req, res, next) => {
    connection.connect(connSettings)
        .then(() => {
            console.log("test1");

            return connection.get(remotePath, localPath, {
                step: function (total_transferred, chunk, total) {
                    console.log(total_transferred);
                    console.log(chunk);
                    console.log(total);
                },
            });

            console.log("test2");
        })
        .then(() => {
            console.log("test3");
            connection.end();
        })
        .catch((err) => {
            console.error(err.message);
        });
});
router.get('/', (req, res, next) => {
    connection.on('ready', function () {
        connection.sftp(function (err, sftp) {
            if (err) {
                throw err;
            }

            sftp.readdir('/home/user', function (err, list) {
                res.json(list);
                connection.end();
            });
        });
    }).connect(connSettings);
});

module.exports = router;
