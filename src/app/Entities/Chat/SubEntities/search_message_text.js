module.exports = (text) => {
    return new Promise(async (resolve, reject) => {
        if (!message || typeof message !== "string") {
            return reject("Message search text field must be a valid string")
        }
        text = new RegExp(".*" + text + ".*")
        resolve(text)
    })
}