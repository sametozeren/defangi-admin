const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDb = require('./connectDb');
const ServerResult = require('./messages/ServerResult');
const Messages = require('./messages/Messages.json');
const {
    UserRoutes,
    AuthRoutes,
    SettingRoutes,
} = require('./routes/index');

// .env file included
require('dotenv').config();

connectDb();

app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());
app.use(cors());
app.use('/user', UserRoutes);
app.use('/auth', AuthRoutes);
app.use('/setting', SettingRoutes);

app.get('/', (req, res) => {
    res.send(ServerResult.successResult(Messages.getSuccess.code, Messages.getSuccess.message));
});

app.get('*', (req, res) => {
    res.send(ServerResult.errorResult(Messages.sourceNotAvailable.code, Messages.sourceNotAvailable.message));
});

app.post('*', (req, res) => {
    res.send(ServerResult.errorResult(Messages.sourceNotAvailable.code, Messages.sourceNotAvailable.message));
});

module.exports = {
    path: '/api',
    handler: app,
};