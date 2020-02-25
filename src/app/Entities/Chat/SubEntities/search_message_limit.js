module.exports = (limit) => {
    return new Promise(async (resolve, reject) => {
        if(limit && !isNaN(parseInt(limit, 10)) ){
            resolve(limit)
        }
        else {
            resolve(10)
        }
    })  
}