var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(express.static('www'));

app.listen(process.env.PORT || 8080);

app.get('/share', function(req, res) {
	res.send(saveMonsterDataArray);
})

app.get(/\bshare\/(\d{4})\b/, function(req, res) {
	if(saveMonsterDataArray[req.params[0]]) {
		res.send(saveMonsterDataArray[req.params[0]].data);
	} else {
		res.send(404);
	}
})

app.post('/share', function(req, res) {
	var num = createUniqueNum();
	saveMonsterDataArray[num] = {date: new Date(), data: JSON.stringify(req.body)};
	res.send(num);
});

function createUniqueNum() {
	var tmp;
	do {
		tmp = Math.floor(Math.random() * 9000+1000);
		console.log(tmp);
	}while(saveMonsterDataArray[tmp]);
	return String(tmp);
}

var saveMonsterDataArray = {};
