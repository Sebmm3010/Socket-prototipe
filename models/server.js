const express = require('express');
const cors = require('cors');
const { socketBroadcast } = require('../socket/constroller');


class Server {
    constructor() {
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io     = require('socket.io')(this.server);


        this.path = {};
        //Middlewares
        this.middlewares();
        //Rutas de mi server
        this.routes();

        //Socket
        this.socket();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        //CORS  
        this.app.use(cors());
        //Lectura y parceo del Body

        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {

    }

    socket(){
        this.io.on('connection',socketBroadcast);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
        });
    }
}

module.exports = Server;