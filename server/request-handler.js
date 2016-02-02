/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var storage = [];
var objectIdCount = 0;
exports.requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/
  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray

  var urlChain;
  if (request.url.indexOf('?') > - 1) {
    var seperatedUrl = request.url.split('?');
    var query = seperatedUrl[1].split('=');
    // storage.order(query);
    urlChain = seperatedUrl[0].substring(1).split('/');
  } else {
    urlChain = request.url.substring(1).split('/');
  }
  var room = urlChain[1];
  var statusCode= 404;


  if (request.method === "GET") {
    if (urlChain[0] === 'classes') {
      statusCode = 200;
    }
  } else if (request.method === "POST") {
    request.on('data', function(data) {
      data = JSON.parse(data);
      data.objectId = Date.now();
      data.createdAt = data.objectId;
      storage.push(data);
    });
    statusCode = 201;
  } else if (request.method === "PUT") {
    statusCode = 200;
  } else if (request.method === "DELETE") {
    statusCode = 200;
  } else if (request.method === "OPTIONS") {
    statusCode = 200;
  }

  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "application/JSON";

  response.writeHead(statusCode, headers);
  var responseBody =  {
    method: request.method, 
    url: request.url,
    body: "[this should be the body]",
    results: storage
  };

  response.end(JSON.stringify(responseBody));

};

// storage.order = function (query) {
//   if (!this.length || !query) {
//     return;
//   }

//   var sign = 1;
//   if (query[0] === 'order') {
//     if (query[1].substring(0,1) === '-') {
//       query[1] = query[1].substring(1);
//       sign = -1;
//     }
//     if (query[1] in this[0]) {
//       this.sort(function(a,b) {
//         return sign * (a[query[1]] - b[query[1]]) > 0;
//       });
//     }
//   }
// };

var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};



