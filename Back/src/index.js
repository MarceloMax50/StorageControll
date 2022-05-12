const express = require('express');
const routes = require('./routes');
var cors = require('cors')
const server = express();
const port = 3000;

server.use(cors());

server.use(express.json());
server.use('/storageControll', routes);
server.listen(port, () => {
    console.log(`🚀 StorageControll server is running on port ${port}!`);
});
