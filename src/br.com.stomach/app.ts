import express from 'express';
import * as bodyParser from 'body-parser';
var cors = require('cors');
const app = express();
//Rotas
const index = require('./routes/index');
const malware = require('./routes/malware');
const artless = require('./routes/artless');
const activity = require('./routes/activity');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({origin: ['http://localhost:8100', 'http://api.stomach.com.br:8881', 'http://api.stomach.com.br:8890']}));
//app.use(cors({origin: 'http://localhost:8100'}));
app.use('/', index);
app.use('/activity', activity);
app.use('/artless', artless);
app.use('/malware', malware);

export default app;