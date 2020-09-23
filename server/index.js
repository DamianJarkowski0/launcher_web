const express = require('express');
const config = require('config');
const setup = require('./middlewares/frontendMiddleware');
const chalk = require('chalk');
const fs = require('fs');
const cors = require('cors');
const https = require('https');
const spdy = require('spdy');
const compression = require('compression');
const robots = require('express-robots-txt');
const testAPIRouter = require('./api/test');

const app = express();

app.use(express.json());
app.use("/testAPI", testAPIRouter);
setup(app);

const shouldCompress = (req, res) => {
    if (req.headers['x-no-compression']) {
        return false;
    }

    return compression.filter(req, res);
};

app.use(cors());
app.use(compression({filter: shouldCompress}));
app.use(robots(__dirname + '/robots.txt'));

const port = config.get('PORT');
const host = config.get('IP');
const divider = chalk.gray('\n-----------------------------------');

const startLog = () => {
    console.log(`Server started ! ${chalk.green('✓')}`);
    console.log(`
    ${chalk.bold('Access URLs:')}${divider}
    PROTOCOL: ${chalk.magenta(`${config.get('PROTOCOL')}`)}
          IP: ${chalk.magenta(`${host}`)}
      DOMAIN: ${chalk.magenta(`${config.get('DOMAIN')}`)}
        PORT: ${chalk.magenta(`${port}${divider}`)}
    ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}`);
};

const options = {
    key: fs.readFileSync(config.get('SSL_KEY')),
    cert: fs.readFileSync(config.get('SSL_CERT')),
};

if (config.get("PROTOCOL") === "https") {
    https.createServer(options, app).listen(port, () => startLog());
} else if (config.get("PROTOCOL") === "http/2") {
    spdy.createServer(options, app).listen(port, () => startLog());
} else {
    app.listen(port, () => startLog());
}
