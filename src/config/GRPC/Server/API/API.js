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
           message_user: Controller.message_user(),
           get_latest_messages: Controller.get_latest_messages(),
           get_latest_chats: Controller.get_latest_chats()
        }
        return Object.freeze(api)
    }

}