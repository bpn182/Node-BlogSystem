var express = require('express');
var app = express();
const path = require('path');
var hbs = require('express-handlebars');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bpndb');
// mongoose.connect('mongodb://cosmosdb:bipin@140113@ds157762.mlab.com:57762/bpndb')

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/'));


var routes = require('./routes/routes.js');
app.use('/route', routes);

var routes2 = require('./routes/routes2.js');
app.use('/route2', routes2);

app.listen(5000);
console.log('listening on port 5000');