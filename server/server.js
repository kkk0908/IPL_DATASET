var http = require("http")
var fs = require("fs")
var path = require("path")
http.createServer(function (request, response) {
	console.log("request ", request.url)
	var filePath = ".." + request.url
	if (filePath == "../") {
		filePath = "../client/index.html"
	}
	var extname = String(path.extname(filePath)).toLowerCase()
	// console.log("Extension Name:",extname);
	var mimeTypes = {
		".html": "text/html",
		".js": "text/javascript",
		".css": "text/css",
		".json": "application/json",
		".png": "image/png",
		".jpg": "image/jpg",
		".gif": "image/gif",
		".wav": "audio/wav",
		".mp4": "video/mp4",
		".woff": "application/font-woff",
		".ttf": "application/font-ttf",
		".eot": "application/vnd.ms-fontobject",
		".otf": "application/font-otf",
		".svg": "application/image/svg+xml",
		".wasm": "application/wasm"
	}
	var contentType = mimeTypes[extname] || "application/octet-stream"
	// console.log("contentType:",contentType);
	fs.readFile(filePath, function(error, content) {
		if (error) {
			console.log("Error Code:",error.code)
			if(error.code == "ENOENT") {
				fs.readFile("../client/404.html", function(error, content) {
					response.writeHead(404, { "Content-Type": "text/html" })
					response.end(content, "utf-8")
				})
			}
			else {
				response.writeHead(500)
				response.end("Sorry, check with the site admin for error: "+error.code+" ..\n")
			}
		}
		else {
			//write a response to the client
			response.writeHead(200, { "Content-Type": contentType })
			//end the response
			response.end(content, "utf-8")
		}
	})
}).listen(8125)
//the server object listens on port 8125
console.log("Server running at http://127.0.0.1:8125/")































// var http = require("http")
// var fs = require("fs")
// var path = require("path")

// http.createServer((req, res) => {
// 	console.log(req.url)
// 	var filePath = ".." + req.url;

// 	if (filePath === "../") {
// 		fs.readFile("../client/index.html", "UTF-8", (err, html) => {
// 			res.writeHead(200, { "content-type": "text/html" })
// 			//console.log(res.url)
// 			res.end(html)
// 		})
// 	}
// 	 else if (req.url.match('.css$')) {
// 	  var cssPath = path.join(__dirname, 'client', req.url);
// 	  var fileStream = fs.createReadStream(cssPath, 'UTF-8');
// 	  res.writeHead(200, { 'content-type': 'text/css' });
// 	  fileStream.pipe(res);
// } 
// else if (req.url.match('.png$')) {
//   var imagePath = path.join(__dirname, 'public', req.url);
//   var fileStream = fs.createReadStream(imagePath);
//   res.writeHead(200, { 'content-type': 'image/png' });
//   fileStream.pipe(res);
// }
// else if(req.url.match(".js$")){
//   var jsPath=path.join(__dirname,"public",req.url);
//   var fileStream=fs.createReadStream(jsPath);
//   res.writeHead(200,{'content-type':'text/javascript'})
//   fileStream.pipe(res);
// }
// 	else {
// 		res.writeHead(404, { "content-type": "text/html" })
// 		res.end("Page not found")
// 	}
// }).listen(8081)
// console.log("Server running at http://127.0.0.1:8081/")

/* 
 var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (request, response) {
    console.log('request ', request.url);

    var filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './index.html';
    }

    var extname = String(path.extname(filePath)).toLowerCase();
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    };

   
    var contentType = mimeTypes[extname] || 'application/octet-stream';
    
    
   

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code == 'ENOENT') {
                fs.readFile('./public/404.html', function(error, content) {
                    response.writeHead(404, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });

            var stream = fs.createReadStream(filePath);

            // Handle non-existent file
            stream.on('error', function(error) {
                response.writeHead(404, 'Not Found');
                response.write('404: File Not Found!');
                response.end();
            });
    
            // File exists, stream it to user
            response.statusCode = 200;
            stream.pipe(response);
            response.end(content, 'utf-8');
        }


        
    });
   

}).listen(8080);
console.log('Server running at http://127.0.0.1:8080/');  */

/* var http = require("http");
var fs = require("fs");

http.createServer((req,res)=>{
fs.readFile('./public/hello.html','UTF-8',function(err,html){
  res.writeHead(200,{'content-type':'html/text'})
  res.end(html)
})
}).listen(3000); 
 




















/*  var http = require('http');

//create a server object:
http.createServer((req, res)=> {
  res.writeHead(200,{'Content-Type':'text/html'})
  res.write("request receieved at "+req.url +'<br/>')
  res.write("hello world")
  res.end()
}).listen(8080); */


