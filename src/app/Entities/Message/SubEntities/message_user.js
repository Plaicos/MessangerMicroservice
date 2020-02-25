module.exports = ({ user, SCI }) => {
    return new Promise(async (resolve, reject) => {
        if (!user || typeof user !== "string") {
            return reject("Message user must be a valid string")
        }

        try {
            if (!await SCI.User.check_user(user)) {
                return reject(`User '${user}' does not exist`)
            }
            resolve(user)
        }
        catch (erro) {
            reject(erro)
        }
    })
}