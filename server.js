var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(express.static('www'));

app.listen(process.env.PORT || 8080);
