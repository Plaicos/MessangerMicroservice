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
}