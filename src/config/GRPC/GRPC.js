function initialize(dependencies) {
    let serverBuilder = require("./Server/ServerBuilder").build
    let serviceFactory = new (require("./Server/Service/ServiceFactory"))
    let apiBuilder = require("./Server/API/API")

    let service = serviceFactory.makeService()
    let api = new apiBuilder(dependencies).build()
    let server = serverBuilder(service, api)

    server.start()
    console.log("GRPC MESSANGER SERVER RUNNING")
    return
}

function exportClient() {
    let Client = new (require("./Client/clientBuilder"))().build()
    return Client
}

module.exports = {
    initialize,
    exportClient
}