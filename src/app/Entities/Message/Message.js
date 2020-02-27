module.exports = class Message {
    constructor({ DAO, SCI, message }) {
        this.DAO = DAO
        this.SCI = SCI
        this.data = message
        this.entities = require("./SubEntities/MessageSubEntities.js")
    }

    build() {
        return new Promise(async (resolve, reject) => {
            let { DAO, SCI, data, entities } = this

            if (!data || typeof data !== "object") {
                return reject("Message data must be a valid object")
            }

            let { user, text, chat } = data
            let Message = new Object()
            
            try {
                Message.chat = await entities.chat({ chat, DAO })
                Message.user = await entities.user({ user, SCI })
                Message.text = await entities.text(text)
                Message.date = {
                    sent: Date.now()
                }
                Message.delivered = false;
                Message.read = false;
                Message.deleted = false;
                Message = this.methods(Message)
                resolve(Message)
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    load() {
        return new Promise(async (resolve, reject) => {

        })
    }

    methods(Message) {
        // Message.__proto__.delete = this.delete()
        // Message.__proto__.hard_delete = this.hard_delete()
        // Message.__proto__.set_delivered = this.set_delivered()
        // Message.__proto__.set_read = this.set_read()
        // Message.__proto__.validate = this.validate()
        Message.__proto__.operate = this.operate()
        return Message;
    }

    validate() {

    }

    operate() {
        var { SCI } = this
        return function (credential) {
            return new Promise(async (resolve, reject) => {

                var owner = this.user
                var config = {
                    user: owner,
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
                    await SCI.Authenticator.checkCredentialClearance(config, credential)
                    resolve()
                }
                catch (erro) {
                    reject(erro)
                }
            })
        }
    }

    set_delivered() {

    }

    set_read() {

    }

    delete() {

    }

    hard_delete() {

    }
}

let _Message = {
    text: "plain",
    user: "Hello3",
    date: {
        send: "Date",
        delivered: "date",
        read: "Future Implementation"
    },
    deleted: false,
    delivered: false,
    read: false
}