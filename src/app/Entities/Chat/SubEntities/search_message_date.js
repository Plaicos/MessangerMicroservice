module.exports = (date) => {
    return new Promise(async (resolve, reject)=>{
        if(!data || typeof date !== "number"){
            return reject("Message Search date must be a valid number")
        }
        resolve(date)
    })
}