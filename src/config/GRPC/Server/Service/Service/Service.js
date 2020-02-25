class Service {
    constructor(){
        this.grpc = require("grpc")
        this.protoLoader = require("@grpc/proto-loader")
        this.protoPath = require("./path")
        this.options = require("./protoLoaderSettings")

        let packageDefinition = this.protoLoader.loadSync(this.protoPath, this.options)
        this.service = this.grpc.loadPackageDefinition(packageDefinition).MessangerPackage.Messanger.service
    }
}

module.exports = Service;