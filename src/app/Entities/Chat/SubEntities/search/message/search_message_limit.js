module.exports = (limit) => {
    return new Promise(async (resolve, reject) => {
        if (!limit) {
            resolve(10)
        }
        else {
            if (isNaN(parseInt(limit, 10))){
                return reject("Search limit must be avalid integer number")
            }
            resolve(limit)
        }
    })
}