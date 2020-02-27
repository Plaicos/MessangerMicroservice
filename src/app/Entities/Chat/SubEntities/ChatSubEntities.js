module.exports = {
    users: require("./chat_users"),
    type: require("./chat_type"),
    search: {
        message: {
            text: require("./search/message/search_message_text"),
            limit: require("./search/message/search_message_limit"),
            offset: require("./search/message/search_message_offset")
        },
        chat: {
            user: require("./search/chat/search_chat_user"),
            limit: require("./search/chat/search_chat_limit"),
            offset: require("./search/chat/search_chat_offset")
        }
    }
}