const config = require("../../../../db/config")
const Mongo = require("mongodb")
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://TheAdmin:${config.password}@rpjcoding-g8dkl.gcp.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });


class Database {
    constructor() {
        this.ObjectId = Mongo.ObjectId
    }

    initialize() {
        return new Promise((resolve, reject) => {
            client.connect((erro, conn) => {
                if (erro) {
                    console.log("**** DATABASE ERROR:" + erro)
                    process.abort()
                }
                //
                console.log("CONNECTED TO DATABASE")
                //
                this.db = {
                    db: conn.db(config.db),
                    ObjectId: this.ObjectId
                }
                resolve()
            });
        });
    }

    export() {
        return this.db
    }

}

module.exports = Database;