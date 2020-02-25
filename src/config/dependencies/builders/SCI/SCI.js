module.exports = class SCI {
    constructor() {
        this.Interface = require("../../../GRPC/GRPC").exportClient()
    }

    build() {
        return new Promise((resolve, reject) => {
            try {
                let CommunicationInterface = {
                    Authenticator: new (require("./Interfaces/Authenticator/AuthInterface"))(this.Interface),
                    User: new (require("./Interfaces/User/UserInterface"))(this.Interface),
                    Inventory: new (require("./Interfaces/Inventory/InventoryInterface"))(this.Interface)
                }
                //
                resolve(CommunicationInterface)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

}