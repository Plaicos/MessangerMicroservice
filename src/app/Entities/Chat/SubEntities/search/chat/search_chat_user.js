module.exports = ({ user, SCI }) => {
    return new Promise(async (resolve, reject) => {
        
        if (!user || typeof user !== "string") {
            return reject("User must be a valid string")
        }

        try {
            let userExist = await SCI.User.check_user(user)

            if (userExist) {
                resolve(user)
            }
            else {
                reject(`User '${user}' does not exist`)
            }
        }
        catch (erro) {
            reject(erro)
        }
    })
}