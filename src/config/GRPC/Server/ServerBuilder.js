var ServerFactory = new (require("./Server/ServerFactory"))()
var server_config = require("./config")

function build(service, api){
    if(!service){
        console.log("GRPC SERVER BUILD ERROR: NO SERVICE PROVIDED! ABORTING PROCESS...")
        process.abort()
    }
    if(!api){
        console.log("GRPC SERVER BUILD ERROR: NO API GIVEN, PROCESS CAN CONTINUE BUT BE AWARE!")
    }

    let server = ServerFactory.makeServer()

    server.addService(service, api)
    server.bind(server_config.port, server_config.credential)

    return server
}

module.exports = {
    build
}