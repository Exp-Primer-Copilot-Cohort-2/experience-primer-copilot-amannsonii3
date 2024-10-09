// Create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  const filePath = path.join(__dirname, pathname);

  if (pathname === '/') {
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (pathname === '/comments') {
    if (req.method === 'GET') {
      fs.readFile('./comments.json', (err, data) => {
        if (err) {
          res.writeHead(500);
          res.end('Internal Server Error');
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(data);
        }
      });
    } else if (req.method === 'POST') {
      let body = '';
      req.on('data', (data) => {
        body += data;
      });

      req.on('end', () => {
        const { comments } = JSON.parse(fs.readFileSync('./comments.json'));
        const newComment = JSON.parse(body);
        comments.push(newComment);
        fs.writeFile('./comments.json', JSON.stringify({ comments }, null, 2), (err) => {
          if (err) {
            res.writeHead(500);
            res.end('Internal Server Error');
          } else {
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newComment));
          }
        });
      });
    }
  } else {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('404 Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      }
    });
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});