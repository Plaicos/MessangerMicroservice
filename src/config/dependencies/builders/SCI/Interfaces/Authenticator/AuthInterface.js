module.exports = class AuthenticatorInterface {
    constructor(Interface) {
        this.Interface = Interface
    }

    createCredential(credential) {
        return new Promise((resolve, reject) => {
            this.Interface.Authenticator.createCredential(credential, (erro, statusResponse) => {
                if (erro) {
                    return reject(erro)
                }
                if (statusResponse.status === "ok") {
                    resolve()
                }
                else {
                    reject("Something went wrong in credential creation")
                }
            })
        });
    }

    checkCredentialClearance(config, credential) {
        return new Promise((resolve, reject) => {
            this.Interface.Authenticator.checkCredentialClearance({ config, credential }, (erro, statusResponse) => {
                if (erro) {
                    return reject(erro)
                }
                if (statusResponse.status === "ok") {
                    resolve()
                }
                else {
                    reject("Something went wrong in credential creation")
                }
            })
        });
    }

    authenticate(token) {
        return new Promise((resolve, reject) => {
            this.Interface.Authenticator.authenticate({ token }, (erro, credential) => {
                if (erro) {
                    return reject(erro)
                }
                resolve(credential)
            })
        });
    }

    generateToken(user) {
        return new Promise((resolve, reject) => {
            this.Interface.Authenticator.generateToken({ user }, (erro, token) => {
                if (erro) {
                    return reject(erro)
                }
                resolve(token)
            })
        });
    }

}