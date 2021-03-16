const express = require('express');
const cors = require('cors');
const fileDb = require('./fileDb');
const messages = require('./app/messages');
const app = express();
const port = 8000;

fileDb.init();

app.use(express.json());
app.use(cors());
app.use('/messages', messages);
app.listen(port);