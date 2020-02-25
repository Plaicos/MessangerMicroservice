module.exports = class InventoryInterface {
    constructor(Interface) {
        this.Interface = Interface
    }

    checkLocation(location) {
        return new Promise(async (resolve, reject) => {
            this.Interface.Inventory.check_location(location, (erro, statusResponse) => {
                if (erro) {
                    return reject(erro)
                }
                if (statusResponse === "ok") {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            })
        })
    }

    getProduct(id, credential) {
        return new Promise(async (resolve, reject) => {
            this.Interface.Inventory.get_product({ id, credential }, (erro, product) => {
                if (erro) {
                    return reject(erro)
                }
                resolve(product)
            })
        })
    }

}