class ServerFactory {
    constructor(){
        this.Server = require("./Server")
    }

    makeServer(){
        let server = new this.Server().server
        return server;
    }
}

module.exports = ServerFactory;