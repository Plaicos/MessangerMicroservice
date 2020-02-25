async function initialize() {
    //dependencies
    var dependencies = await new (require("./src/config/dependencies/Dependencies"))().build()
    var { initialize } = require("./src/config/GRPC/GRPC")

    initialize(dependencies)
}

initialize()