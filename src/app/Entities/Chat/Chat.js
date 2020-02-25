module.exports = class Chat {
    constructor({ DAO, SCI }) {
        this.DAO = DAO
        this.SCI = SCI
        this.entities = require("./SubEntities/ChatSubEntities")
    }
}