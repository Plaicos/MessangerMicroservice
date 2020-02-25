module.exports = ({ users, SCI }) => {
    return new Promise(async (resolve, reject) => {
        if (!Array.isArray(users) || users.length < 2) {
            return reject("Chat users must be a valid array of string with at least 2 values")
        }

        try {
            for (let user of users) {
                try {
                    await SCI.User.check_user(user)
                }
                catch{
                    return reject(`User '${user}' does no exist`)
                }
            }
            resolve(users)
        }
        catch(erro){
            return reject(erro)
        }
    })
}