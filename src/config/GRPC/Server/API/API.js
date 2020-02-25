module.exports = class API {
    constructor(dependencies) {
        if (!dependencies) {
            console.log("GRPC API FACTORY ERROR: NO DEPENDENCIES, ABORTING PROCESS...")
            process.abort()
        }

        this.dependencies = dependencies
        this.Controller = require("../../../../../src/app/Controller/Controller.js")
    }

    build() {
        let { dependencies, Controller } = this
        Controller = new Controller(dependencies)

        let api = {
           
        }
        return Object.freeze(api)
    }

}