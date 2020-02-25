module.exports = {
    Tools: new (require("./builders/Tools/Tools"))(),
    DAO: new (require("./builders/DAO/DAObuilder"))(),
    Factories: new(require("./builders/Factory/Factories"))(),
    SCI: new (require("./builders/SCI/SCI"))()
}

// var dependencies = {
//     router: router,
//     db: db,
//     ObjectId: ObjectId,
//     links,
//     base64: {
//         decode: base64decode,
//         encode: base64encode
//     },
//     TokenFactory: TokenFactory, //Instance
//     Authenticator: Authenticator, //constructor
//     Interpreters: {
//         DAO: {
//             System: require("./src/app/DAO/system/SysDao"),
//             User: require("./src/app/DAO/user/UserDao")
//         },
//         Controller: {
//             System: require("./src/app/Controller/system/SysController"),
//             User: require("./src/app/Controller/user/UserController")
//         },
//         Requester: {
//             HTTP: Http_Requester
//         }
//     }
// }