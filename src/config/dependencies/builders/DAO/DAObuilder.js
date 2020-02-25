module.exports = class DAO {
    constructor() {
        this.Database = new (require("../Factory/Database/Database"))()
        console.log("constructor called")
    }

    build() {
        return new Promise(async (resolve, reject) => {
            let { Database } = this
            let DAO = require("./DAO")

            try {
                await Database.initialize()
                let db = Database.export()
                //
                DAO = new DAO(db)
                resolve(DAO)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }
}