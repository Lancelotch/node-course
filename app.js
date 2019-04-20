const http = require("http");

const routers = require('./routes');

const server = http.createServer(routers.handlers);

server.listen(3301);