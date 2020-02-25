module.exports = {
    users: require("./chat_users"),
    type: require("./chat_type"),
    search: {
        text: require("./search_message_text"),
        limit: require("./search_message_limit"),
        offset: require("./search_message.offset")
    }
}