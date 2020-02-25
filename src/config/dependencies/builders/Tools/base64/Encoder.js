module.exports = class Base64Encoder {
    constructor() {
        let { base64encode } = require("nodejs-base64")
        this.encoder = base64encode
    }

    encode(string){
        if(!string || typeof string !== "string"){
            throw Error("Base64 encode require a valid string")
        }
        return this.encode(string)
    }
}