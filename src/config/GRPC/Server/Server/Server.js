class Server {
    constructor(settings){
        var grpc = require("grpc")
        this.server = new grpc.Server()
    }
}

module.exports = Server;