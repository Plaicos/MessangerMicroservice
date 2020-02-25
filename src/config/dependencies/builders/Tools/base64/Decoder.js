module.exports = class Base64Decoder {
    constructor() {
        let { base64decode } = require("nodejs-base64")
        this.decoder = base64decode
    }

    decode(string){
        if(!string || typeof string !== "string"){
            throw Error("Base64 decoder require a valid string")
        }
        return this.decoder(string)
    }
}