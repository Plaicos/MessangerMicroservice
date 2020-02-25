module.exports = ({ chat, DAO }) => {
    return new Promise(async (resolve, reject) => {
        
        if (!chat || typeof chat !== "string") {
            return reject("Message chat id must be a valid string")
        }

        try {
            if (!await DAO.checkChat(chat)) {
                return reject("That chat id does not refer to any chat")
            }
            chat.__proto__.data = await DAO.getChat(chat)
            resolve(chat)
        }
        catch (erro) {
            reject(erro)
        }
    })
}