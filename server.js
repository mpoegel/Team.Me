var http = require("http");
var serveStatic = require('serve-static')
var connect = require('connect');

connect().use(serveStatic(__dirname)).listen(8080);
