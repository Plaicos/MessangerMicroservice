module.exports = class ServiceFactory {
    constructor() {
        this.Service = require("./Services/Service")
    }

    makeServices() {
        let services = new this.Service().services
        return services
    }
}