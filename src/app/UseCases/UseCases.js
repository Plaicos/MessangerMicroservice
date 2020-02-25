module.exports = class UseCases {
    constructor(dependencies) {
        this.dependencies = dependencies
        let { DAO, SCI } = dependencies

        this.SCI = SCI
        this.DAO = DAO
        this.entities = require("../Entities/entities")
    }

    send_message(message, credential) {
        return new Promise(async (resolve, reject)=>{
        
        })
    }

    create_chat() {

    }

    get_chat() {

    }

    get_message() {

    }

    notify_user() {

    }

    delete_chat() {

    }
}