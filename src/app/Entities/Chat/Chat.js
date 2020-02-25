module.exports = class Chat {
    constructor({ DAO, SCI, chat }) {
        this.data = chat
        this.DAO = DAO
        this.SCI = SCI
        this.entities = require("./SubEntities/ChatSubEntities")
        this.Message = require("../Message/Message")
    }

    build() {
        return new Promise(async (resolve, reject) => {
            let { data, SCI, DAO, entities } = this

            if (!data || typeof data !== "object") {
                return reject("Chat data must de a valid object")
            }

            let { users } = data
            let Chat = new Object()

            try {
                Chat.users = await entities.users({ users, SCI })
                Chat.type = await entities.type({ users })
                Chat = this.methods(Chat)

                resolve(Chat)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    exists() {
        return new Promise(async (resolve, reject) => {
            let { data, entities, SCI } = this

            if (!data || typeof data !== "object") {
                return reject("Chat data must de a valid object")
            }

            let type = ""
            let { users } = data

            try {
                users = await entities.users({ users, SCI })
                type = await entities.type({ users })

                if (await this.DAO.checkChatByUsers(users, type)) {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    register() {
        let { DAO } = this
        return function () {
            return new Promise(async (resolve, reject) => {
                try {
                    await DAO.registerChat(this)
                    resolve()
                }
                catch (erro) {
                    reject(erro)
                }
            })
        }
    }

    load() {
        return new Promise(async (resolve, reject) => {
            let { data, DAO, SCI, entities } = this

            if (!data || typeof data !== "object") {
                return reject("Chat data must de a valid object")
            }

            let { id, users } = data
            let type = ""

            if ((!id || typeof id !== "string") && (!Array.isArray(users) || users.length !== 2)) {
                return reject("To load chat you must give an ID or two users")
            }

            let loadBy = null;

            if (id && typeof id === "string") {
                loadBy = "id"
            }
            else if (Array.isArray(users) && users.length === 2) {
                users = await entities.users({ users, SCI })
                type = await entities.type({ users })
                loadBy = "users"
            }

            let Chat = new Object()

            try {
                if (loadBy === "id") {
                    Chat = await DAO.getChat(id)
                }
                else if (loadBy === "users") {
                    Chat = await DAO.getChatByUsers(users, type)
                }
                else {
                    return reject("No valid data to load Chat")
                }

                Chat = this.methods(Chat)
                resolve(Chat)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    methods(Chat) {
        Chat.__proto__.add_message = this.add_message()
        Chat.__proto__.operate = this.operate()
        Chat.__proto__.register = this.register()
        return Chat;
    }

    operate() {
        var { SCI } = this
        return function (credential) {
            return new Promise(async (resolve, reject) => {

                var operational = false
                var owners = this.users
                var config = {
                    level: 4,
                    scope: {
                        read: true,
                        write: true,
                        third_party: {
                            read: false,
                            write: false
                        }
                    }
                }

                try {
                    for (let owner of owners) {
                        try {
                            config.user = owner
                            await SCI.Authenticator.checkCredentialClearance(config, credential)
                            operational = true
                        }
                        catch (erro) {
                            //
                        }
                    }

                    if (!operational) {
                        return reject("You cant operate a chat that in are not a part of")
                    }
                    resolve()
                }
                catch (erro) {
                    reject(erro)
                }
            })
        }
    }

    add_message() {
        let { DAO, SCI, entities, Message } = this
        return function (message) {
            return new Promise(async (resolve, reject) => {
                if (!message || typeof message !== "object") {
                    return reject("Chat Message must be a valid object")
                }

                try {
                    await DAO.addChatMessage(message)
                    resolve()
                }
                catch (erro) {
                    reject(erro)
                }
            })
        }
    }

    search_messages() {
        let { DAO, SCI, entities } = this
        return function (filters) {
            return new Promise(async (resolve, reject) => {
                if (!filters || typeof filters !== "object") {
                    return reject("Chat search messages filters must be a valid object")
                }

                let filter = new Object()

                try {
                    filter.chat = this.id
                    if (filters.text) {
                        filter.text = await entities.search.text(filters.text)
                    }
                    filters.date = "send"
                    filters.limit = await
                    filters.offset 
                }
                catch (erro) {
                    reject(erro)
                }
            })
        }
    }

    load_latest() {
        let { DAO } = this
        return function () {
            return new Promise(async (resolve, reject) => {
                let filter = new Object()

                try {
                    filter.chat = this.id
                    filter.date = "send"
                    filter.limit = 5
                    filter.offset = 0
                    let latest_messages = await DAO.searchMessages(filter)
                    resolve(latest_messages)
                }
                catch (erro) {
                    reject(erro)
                }
            })
        }
    }
}

let _Chat = {
    type: "group, dialog",
    users: ["Hello3", "Foobar"],
    messages: []
}