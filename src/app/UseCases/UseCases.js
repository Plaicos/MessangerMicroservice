module.exports = class UseCases {
    constructor(dependencies) {
        this.dependencies = dependencies
        let { DAO, SCI } = dependencies

        this.SCI = SCI
        this.DAO = DAO
        this.entities = require("../Entities/entities")
    }

    message_user(message, user, credential) {
        return new Promise(async (resolve, reject) => {
            let { entities, DAO, SCI } = this

            if (!message || typeof message !== "object") {
                return reject("Chat message must be a valid object")
            }
            if (!user || typeof user !== "string") {
                return reject("User to message must be a valid string")
            }
            if (!credential || typeof credential !== "object") {
                console.log(Error("CREDENTIAL IS MISSING"))
                return reject("INTERNAL SERVER ERRRO, TRY LATER")
            }

            let Chat = new Object()

            try {
                let ChatExist = await new entities.Chat({ DAO, SCI, chat: { users: [credential.user, user] } }).exists()

                if (ChatExist) {
                    Chat = await new entities.Chat({ DAO, SCI, chat: { users: [credential.user, user] } }).load()
                }
                else {
                    Chat = await new entities.Chat({ DAO, SCI, chat: { users: [credential.user, user] } }).build()
                    await Chat.register()
                    Chat = await new entities.Chat({ DAO, SCI, chat: { users: [credential.user, user] } }).load()
                }
                await Chat.operate(credential)
                //
                let Message = await new entities.Message({ DAO, SCI, message: { user: credential.user, chat: Chat.id, text: message.text } }).build()
                await Message.operate(credential)
                //

                await Chat.add_message(Message)
                resolve()
                await SCI.Notifier.queue_notification({ type: "new message", notifier: credential.user, target: user })
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    get_chat_latest_messages(users, id, credential) {
        return new Promise(async (resolve, reject) => {

            if ((!users || !Array.isArray(users)) && (!id || typeof id !== "string")) {
                return reject("Get Chat latest Messages Error: provide users or the id")
            }
            if (!credential || typeof credential !== "object") {
                console.log(Error("CREDENTIAL IS MISSING"))
                return reject("INTERNAL SERVER ERRRO, TRY LATER")
            }

            let { DAO, SCI, entities } = this
            let Chat = {}
            let latest_messages = []

            try {
                Chat = new entities.Chat({ DAO, SCI, chat: { users: users, id: id } })
                let ChatExist = await Chat.exists()

                if (ChatExist) {
                    Chat = await Chat.load()
                    await Chat.operate(credential)
                    latest_messages = await Chat.load_latest_messages()
                    resolve(latest_messages)
                }
                else {
                    return reject("Cant get latest messages, that chat does not exist")
                }
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    get_user_latest_chats(credential) {
        return new Promise(async (resolve, reject) => {

            if (!credential || typeof credential !== "object") {
                console.log(Error("CREDENTIAL IS MISSING"))
                return reject("INTERNAL SERVER ERRRO, TRY LATER")
            }

            let { entities, DAO, SCI } = this

            try {
                let chats = await new entities.Chat({ DAO, SCI, entities }).search({ user: credential.user })
                console.log({ chats })
                resolve(chats)
            }
            catch (erro) {
                return reject(erro)
            }
        })
    }

    get_user_chats(user, pagination, credential) {
        return new Promise(async (resolve, reject) => {

            if (!user || typeof user !== "string") {
                return reject("")
            }
            if (!pagination || typeof pagination !== "object") {
                return reject("")
            }
            if (!credential || typeof credential !== "object") {
                console.log(Error("CREDENTIAL IS MISSING"))
                return reject("INTERNAL SERVER ERRRO, TRY LATER")
            }

            try {

            }
            catch (erro) {
                return reject(erro)
            }
        })
    }
}