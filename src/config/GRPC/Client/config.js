var CredentialFactory = new (require("./credential/CredentialFactory"))()
var url = require("./URL/servicesURLS")

var client_config = {
    port: {
        Authenticator: url.Authenticator,
        User: url.User,
        Inventory: url.Inventory,
        Notifier: url.Notifier
    }
}

module.exports = client_config 