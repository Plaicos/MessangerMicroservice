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
                //monolog
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

                let Message = await new entities.Message({ DAO, SCI, message: { user: credential.user, chat: Chat.id, text: message.text } }).build()
                await Message.operate(credential)
                await Chat.add_message(Message)
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    get_chat_latest_messages(users, id, credential) {
        return new Promise(async (resolve, reject) => {
            if ((!users || !Array.isArray(user)) && (!id || typeof id !== "string")) {
                return reject("To get ")
            }
        })
    }

    create_group() {

    }

    message_group() {

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