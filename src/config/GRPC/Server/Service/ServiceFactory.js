module.exports = class ServiceFactory {
    constructor(){
        this.Service = require("./Service/Service")
    }

    makeService(){
        let service = new this.Service().service
        return service
    }
}