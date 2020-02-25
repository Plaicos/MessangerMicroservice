module.exports = class Base64 {
    constructor() {
        this.Encoder = new (require("./Encoder"))()
        this.Decoder = new (require("./Decoder"))()
    }

    encode(string) {
        return this.Encoder.encode(string)
    }

    decode(string) {
        return this.Decoder.decode(string)
    }
}