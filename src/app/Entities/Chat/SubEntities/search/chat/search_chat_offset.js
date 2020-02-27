module.exports = (offset) => {
    return new Promise(async (resolve, reject) => {
        if (!offset) {
            resolve(0)
        }
        else {
            if (isNaN(parseInt(offset, 10))){
                return reject("Search offset must be avalid integer number")
            }
            resolve(offset)
        }
    })
}