class CredentialFactory {
    constructor() {
        this.Credential = require("./Credential")
    }

    makeCredential() {
        let credential = new this.Credential().credential
        return credential
    }
}

module.exports = CredentialFactory;