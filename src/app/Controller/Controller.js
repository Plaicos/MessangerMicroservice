module.exports = class Controller {
    constructor(dependencies) {
        this.dependencies = dependencies
        this.UseCases = new (require("../Use_Cases/UseCases"))(dependencies)
    }

    handleError(erro, callback) {
        console.log({ erro })
        callback(Error(erro), null)
    }


}