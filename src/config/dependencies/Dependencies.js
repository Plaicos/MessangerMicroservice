module.exports = class Dependencies {
    constructor() {
        this.list = require("./depList")
    }

    build() {
        return new Promise(async (resolve, reject) => {
            let { list } = this
            let list_iterable = Object.keys(list)

            try {
                let Dependency = {}
                for (let i of list_iterable) {
                    Dependency[i] = await list[i].build()
                }
                //console.log(Dependency)
                resolve(Dependency)
            }
            catch (erro) {
                console.log(Error("Dependency Creation Error:" + erro))
                process.abort()
            }
        });
    }

}