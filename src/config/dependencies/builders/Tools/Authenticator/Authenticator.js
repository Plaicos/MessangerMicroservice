module.exports = class Authenticator {
    constructor() {
        this.Token = require("../../Factory/Token/Token")
    }

    authenticate(token) {
        return new Promise(async (resolve, reject) => {
            let { Token } = this

            if (!token) {
                return reject("EMPITY TOKEN")
            }

            try {
                token = await new Token().read(token)
                resolve(token)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

}