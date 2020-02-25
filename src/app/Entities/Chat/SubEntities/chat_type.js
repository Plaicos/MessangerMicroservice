module.exports = ({ users }) => {
    return new Promise(async (resolve, reject) => {
        if (!users || !Array.isArray(users)) {
            return reject("THERE WAS A PROBLEM SETTING THECHAT TYPE")
        }

        let type = ""
        let user_arr = new Array()

        try {
            for (let user of users) {
                if (!user_arr.includes(user)) {
                    user_arr.push(user)
                }
            }

            if (user_arr.length === 1) {
                type = "monolog"
            }
            else if (user_arr.length === 2) {
                type = "dialog"
            }
            else {
                return reject("Groups not implemented yet")
            }
            resolve(type)
        }
        catch (erro) {
            reject(erro)
        }
    })
}