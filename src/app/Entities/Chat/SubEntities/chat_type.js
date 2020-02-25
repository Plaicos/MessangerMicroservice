module.exports = ({ type, DAO }) => {
    return new Promise(async (resolve, reject) => {
        if (!type || typeof type !== "string") {
            return reject("Chat type must be a valid string")
        }
        
        try{
            if(!await DAO.checkChatType(type)){
                return reject(`Chat type '${type}' does not exist`)
            }
            resolve(type)
        }
        catch(erro){
            reject(erro)
        }
    })
}