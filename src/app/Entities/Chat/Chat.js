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
                Chat.type = await entities.type({ type, DAO })
                Chat.messages = new Array()
                Chat = this.methods(Chat)
                resolve(Chat)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    load() {
        return new Promise(async (resolve, reject) => {
            let { data, DAO, SCI, entities } = this

            if (!data || typeof data !== "object") {
                return reject("Chat data must de a valid object")
            }

            let { id, users } = data

            if ((!id || typeof id !== "string") && (!Array.isArray(users) || users.length !== 2)) {
                return reject("To load chat you must give an ID or two users")
            }

            let loadBy = null;

            if (id && typeof id === "string") {
                loadBy = "id"
            }
            else if (Array.isArray(users) && users.length === 2) {
                users = await entities.users({ users, SCI })
                loadBy = "users"
            }

            let Chat = new Object()

            try {
                if (loadBy === "id") {
                    Chat = await DAO.getChat(id)
                }
                else if (loadBy === "users") {
                    Chat = await DAO.getChatByUsers(users)
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
        Chat.__proto__.add_message
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

                    if(!operational){
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
            try {
                this.messages.push(message)
                return
            }
            catch (erro) {
                throw erro
            }
        }
    }
}

let _Chat = {
    type: "group, dialog",
    users: ["Hello3", "Foobar"],
    messages: []
}