const http = require("http");
const app = require("./tamilnadu-case-node/app");
const server = http.createServer(app);
console.log('server', server)
server.listen(3000);