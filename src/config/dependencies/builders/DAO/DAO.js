module.exports = class DAO {
    constructor({ db, ObjectId }) {
        this.db = db
        this.ObjectId = ObjectId
        this.collections = {
            
        }
    }

    get_post(id) {
        return new Promise((resolve, reject) => {
            let { ObjectId } = this
            this.collections.posts.find({ _id: ObjectId(id) }).toArray((erro, result) => {
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

    registerPost(post) {
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

    delete_post(id) {
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

    searchPosts(filters) {
        return new Promise((resolve, reject) => {

            //parsing data
            let pagination = {
                limit: filters.limit,
                offset: filters.offset
            }
            delete filters.limit
            delete filters.offset

            if (filters.location) {
                filters.location = { $elemMatch: filters.location }
            }

            if (filters.key_words) {
                let key_words = filters.key_words
                let keys = Object.keys(key_words)
                delete filters.key_words
        
                for (let key of keys) {
                    filters[`key_words.${key}`] = { $in: key_words[key] }
                }
                
            }

            if (filters.title) {
                filters.title = new RegExp(".*" + filters.title + ".*")
            }
            
            this.collections.posts.find(filters).limit(pagination.limit).skip(pagination.offset).toArray((erro, result) => {
                if (erro) {
                    return reject(erro)
                }
                resolve(result)
            })
        });
    }

    check_post(id) {
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