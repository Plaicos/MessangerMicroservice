module.exports = class DAO {
    constructor({ db, ObjectId }) {
        this.db = db
        this.ObjectId = ObjectId
        this.collections = {
            chats: db.collection("chats"),
            chat_types: db.collection("chat_types"),
            messages: db.collection("messages")
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
                    let Chat = result[0]
                    Chat.id = Chat._id.toString()
                    delete Chat._id
                    resolve(Chat)
                }
                else {
                    reject("That ID does not refer not any Chat")
                }
            })
        });
    }

    getChatByUsers(users, type) {
        return new Promise((resolve, reject) => {
            let { ObjectId } = this

            this.collections.chats.find({ users: { $all: users }, type: type }).toArray((erro, result) => {
                if (erro) {
                    reject(erro)
                    return
                }
                if (result.length > 0) {
                    let Chat = result[0]
                    Chat.id = Chat._id.toString()
                    delete Chat._id
                    resolve(Chat)
                }
                else {
                    reject("Those users dont have a chat")
                }
            })
        });
    }

    registerChat(Chat) {
        return new Promise(async (resolve, reject) => {
            try {
                let insertionLog = await this.collections.chats.insertOne(Chat)
                //console.log({ insertionLog })
                resolve(insertionLog)
            }
            catch (erro) {
                reject(erro)
            }
        });
    }

    addChatMessage(Message) {
        let { ObjectId } = this
        return new Promise(async (resolve, reject) => {
            try {
                await this.collections.messages.insert(Message)
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    updateChat(id, Chat) {
        let { ObjectId } = this
        return new Promise(async (resolve, reject) => {
            try {
                await this.collections.chats.updateOne({ _id: ObjectId(id) }, Chat)
                resolve()
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

    deleteChat(id) {
        return new Promise(async (resolve, reject) => {
            let { ObjectId } = this

            try {
                await this.collections.chats.deleteOne({ _id: ObjectId(id) })
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
            this.collections.chats.find({ _id: ObjectId(id) }).project({ _id: 1 }).toArray((erro, result) => {
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

    checkChatByUsers(users, type) {
        return new Promise((resolve, reject) => {
            let { ObjectId } = this

            this.collections.chats.find({ users: { $all: users }, type: type }).toArray((erro, result) => {
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

    checkChatType(type) {
        return new Promise((resolve, reject) => {
            let { ObjectId } = this
            this.collections.chat_types.find({ type: type }).project({ _id: 1 }).toArray((erro, result) => {
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

    searchMessages(filters) {
        return new Promise(async (resolve, reject) => {

            let date = 0
            let pagination = {
                limit: pagination.limit,
                offset: pagination.offset
            }
            delete filters.limit
            delete filters.offset

            if (filters.date && typeof filters.date === "string") {
                date = `date.${filters.date}: 1`
                delete filters.date
            }

            try {
                this.collections.messages.find(filters).sort(date).limit(pagination.limit).skip(pagination.offset).toArray((erro, result) => {
                    if (erro) {
                        return reject(erro)
                    }
                    resolve(result)
                })
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

}