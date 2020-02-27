module.exports = class Controller {
    constructor(dependencies) {
        this.dependencies = dependencies
        this.UseCases = new (require("../UseCases/UseCases"))(dependencies)
    }

    handleError(erro, callback) {
        console.log({ erro })
        callback(Error(erro), null)
    }

    message_user() {
        var self = this
        return async function (call, callback) {
            let { message, user, credential } = call.request

            try {
                await self.UseCases.message_user(message, user, credential)
                let statusResponse = {
                    status: "ok"
                }
                callback(null, statusResponse)
            }
            catch (erro) {
                self.handleError(erro, callback)
            }
        }
    }

    get_latest_messages() {
        var self = this
        return async function (call, callback) {
            let { users, id, credential } = call.request

            try {
                let response = {
                    messages: await self.UseCases.get_chat_latest_messages(users, id, credential)
                }
                callback(null, response)
            }
            catch (erro) {
                self.handleError(erro, callback)
            }
        }
    }

    get_latest_chats() {
        var self = this
        return async function (call, callback) {
            let { credential } = call.request
            console.log(call.getPeer())
            try {
                let response = {
                    chats: await self.UseCases.get_user_latest_chats(credential)
                }
                callback(null, response)
            }
            catch (erro) {
                self.handleError(erro, callback)
            }
        }
    }
}