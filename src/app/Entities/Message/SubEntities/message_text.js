module.exports = (text) => {
    return new Promise(async (resolve, reject) => {
        if (!text || typeof text !== "string" || text.length === 0) {
            return reject("Message text must be a valid string")
        }
        resolve(text)
    })
}