class CredentialFactory {
    constructor() {
        this.Credential = require("./Credential")
        this.Services = require("./ServicesSettings/settings")
    }

    makeCredential(service) {
        let credential = new this.Credential(service).credential
        return credential
    }
}

module.exports = CredentialFactory;