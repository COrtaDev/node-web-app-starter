const http = require('http');
const { readFile } = require('fs').promises;
const path = require('path');

const hostname = 'localhost';
const port = 8081;

// let imageFileContents;

const server = http.createServer(async (req, res) => {
    if (req.url.search(/^images/)) {
        const imageFilePath = './assets' + req.url;
        const imageFileContents = await readFile(imageFilePath);
        const fileExtension = path.extname(imageFilePath);
        const imageType = 'image/' + fileExtension.substring(1);
        res.statusCode = 200;
        res.setHeader('Content-Type', imageType); // Use the image type
        res.end(imageFileContents);
        return;
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('I have items');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
