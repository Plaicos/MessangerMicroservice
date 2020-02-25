module.exports = class ServerCredential {
    constructor(settings){
        this.grpc = require("grpc")
        this.credential = this.grpc.ServerCredentials.createInsecure()
    }
}