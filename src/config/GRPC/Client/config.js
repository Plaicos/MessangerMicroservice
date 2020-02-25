var CredentialFactory = new (require("./credential/CredentialFactory"))()
var url = require("./URL/servicesURLS")

var client_config = {
    port: {
        Authenticator: url.Authenticator,
        User: url.User,
        Inventory: url.Inventory
    }
}

module.exports = client_config 