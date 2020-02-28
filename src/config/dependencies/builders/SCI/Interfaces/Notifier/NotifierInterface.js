module.exports = class NotifierInterface {
    constructor(Interface) {
        this.Interface = Interface
    }

    queue_notification(notification_data) {
        return new Promise(async (resolve, reject) => {
            try {
                this.Interface.Notifier.queue({ notification_data }, (erro, response) => {
                    if(erro){
                        return reject(erro)
                    }
                    if(response.status === "ok"){
                        resolve()
                    }
                    else {
                        reject(response)
                    }
                })
            }
            catch (erro) {
                reject(erro)
            }
        })
    }

}