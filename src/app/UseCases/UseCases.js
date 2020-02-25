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

            try {
                if (await DAO.checkChatByUsers([user, credential.user])) {
                    var Chat = await new entities.Chat({ DAO, SCI, chat: { users: [user, credential.user] } }).load()
                }
                else {
                    var Chat = await new entities.Chat({ DAO, SCI, chat: { users: [credential.user, user], type: "dialog" } }).build()
                }
                let Message = await new entities.Message({ DAO, SCI, message }).build()
                await Chat.operate(credential)
                await Message.operate(credential)
                Chat.add_message(Message);
                console.log({ Message })
                resolve()
            }
            catch (erro) {
                reject(erro)
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