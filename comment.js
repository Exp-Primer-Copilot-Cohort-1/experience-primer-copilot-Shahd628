// Create a web server
// 1. Create a web server
// 2. Read the HTML file
// 3. Read the JSON file
// 4. Combine the HTML and JSON
// 5. Send the combined result to the client

var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for " + pathname + " received.");

    if (pathname == '/') {
        fs.readFile('comment.html', function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('404 Not Found');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data.toString());
                res.end();
            }
        });
    } else if (pathname == '/get_comments') {
        fs.readFile('comment.json', function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end('404 Not Found');
            } else {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(data.toString());
                res.end();
            }
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('404 Not Found');
    }
}).listen(8080);

console.log('Server running at http://