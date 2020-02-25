module.exports = class DAO {
    constructor({ db, ObjectId }) {
        this.db = db
        this.ObjectId = ObjectId
        this.collections = {
            chats: db.collection("chats"),
            chat_types: db.collections("chat_types")
        }
    }

    getChat(id) {
        return new Promise((resolve, reject) => {
            let { ObjectId } = this
            this.collections.chats.find({ _id: ObjectId(id) }).toArray((erro, result) => {
                if (erro) {
                    reject(erro)
                    return
                }
                if (result.length > 0) {
                    resolve(result[0])
                }
                else {
                    reject("That ID does not refer not any Chat")
                }
            })
        });
    }

    getChatByUsers(users) {
        return new Promise((resolve, reject) => {
            let { ObjectId } = this
            this.collections.posts.find({ users: users }).toArray((erro, result) => {
                if (erro) {
                    reject(erro)
                    return
                }
                if (result.length > 0) {
                    resolve(result[0])
                }
                else {
                    reject("That ID does not refer not any post")
                }
            })
        });
    }

    registerChat(Chat) {
        return new Promise(async (resolve, reject) => {
            try {
                let insertionLog = await this.collections.posts.insertOne(post)
                //console.log({ insertionLog })
                resolve(insertionLog)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    addChatMessage(){

    }

    updateChat(){

    }

    deleteChat(id) {
        return new Promise(async (resolve, reject) => {
            let { ObjectId } = this

            try {
                await this.collections.posts.deleteOne({ _id: ObjectId(id) })
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    checkChat(id) {
        return new Promise((resolve, reject) => {
            let { ObjectId } = this
            this.collections.posts.find({ _id: ObjectId(id) }).project({ _id: 1 }).toArray((erro, result) => {
                if (erro) {
                    reject(erro)
                    return
                }
                if (result.length > 0) {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            })
        });
    }

    checkChatByUsers(id) {
        return new Promise((resolve, reject) => {
            let { ObjectId } = this
            this.collections.posts.find({ _id: ObjectId(id) }).project({ _id: 1 }).toArray((erro, result) => {
                if (erro) {
                    reject(erro)
                    return
                }
                if (result.length > 0) {
                    resolve(true)
                }
                else {
                    resolve(false)
                }
            })
        });
    }

}