module.exports = (offset) => {
    return new Promise(async (resolve, reject) => {
        if (offset) {
            if (!isNaN(parseInt(offset, 10))) {
                resolve(offset)
            }
        }
        else {
            
        }
        
        else if (offset && isNaN(parseInt(offset, 10))) {
            reject()
        }
        else {
            resolve
        }
    })
}