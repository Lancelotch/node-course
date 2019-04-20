const http = require("http");

const routers = require('./routes');

const server = http.createServer(routers);

server.listen(3300);