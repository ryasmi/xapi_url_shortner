/// <reference path="./definitions/references.d.ts" />
import express = require('express');
import knex = require('knex');
import bodyParser = require('body-parser');

var app = express();
var knex_connection = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: 'mysql',
    database: 'shortener'
  }
};

app.use(express.static(__dirname));
app.use('/node_modules', express.static(__dirname+'/../node_modules'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

knex(knex_connection).schema.createTable('link', function (table) {
  table.increments('id').primary();
  table.string('long_url');
}).then(function (table) {
  console.log(table);
}, function (err) {
  console.error(err);
});

// Link.
import LinkRepository = require('./link/KnexRepository');
import LinkService = require('./link/ServerService');
import LinkController = require('./link/ExpressController');
var link_repository = new LinkRepository(knex_connection, 'link');
var link_service = new LinkService(link_repository);
var link_controller = new LinkController(link_service);
app.post('/api/link', link_controller.createLink.bind(link_controller));
app.get('/:short_url(\\w+)', link_controller.visitLink.bind(link_controller));

var port = 3000;
var server = app.listen(port);
console.log('App running at http://localhost:'+port);

export = app;