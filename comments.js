// Create web server
var http = require('http');
var fs = require('fs');
var qs = require('querystring');

var comments = [];
var server = http.createServer(function(req, res) {
	if(req.method === 'POST') {
		var body = '';
		req.on('data', function(data) {
			body += data;
		});
		req.on('end', function() {
			var comment = qs.parse(body).comment;
			comments.push(comment);
			res.end("Comment added");
		});
	} else {
		var html = fs.readFileSync('./comments.html');
		var commentString = comments.reduce(function(prev, curr) {
			return prev + '<li>' + curr + '</li>';
		}, '');
		html = html.toString().replace('{{comments}}', commentString);
		res.end(html);
	}
});

server.listen(8000);
