/* Import node's http module: */
var http = require("http");

var messages = require('./request-handler');
var utils = require('./utils');
var url = require('url');
var express = require('express');
var bodyParser = require('body-parser');


var port = 3000;
var ip = "127.0.0.1";

var server = express( );

// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({
//   extended: true
// }));
// server.use(express.json());
// var serverAction = function(action) {
//     server[action]('/*', function(request, response) {
//     messages.requestHandler(request, response);
//   });
// };

  // serverAction(re)

server.post('/*', function(request, response) {
  messages.requestHandler(request, response);
});

server.get('/*', function(request, response) {
  messages.requestHandler(request, response);
});

server.options('/*', function(request, response) {
  messages.requestHandler(request, response);
});


server.listen(port, function() {
  console.log('Example App listening on port ' + port +'!');
});

// var router = {
//   '/classes/messages': messages.requestHandler
//   // ...
// };

// var server = http.createServer( function(req, res){
//   console.log("Serving request type " + req.method + " for url " + req.url);

//   var route = router[url.parse(req.url).pathname];
//   if (route) {
//     route(req, res);
//   } else {
//     utils.sendResponse(res, '', 404);
//   }
// });

// console.log("Listening on http://" + ip + ":" + port);
// server.listen(port, ip);

