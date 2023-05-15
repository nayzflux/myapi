import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/fr'

export const getConversationDisplayName = (conversation, user) => {
    if (conversation.name) return conversation.name;
    return conversation.name ? conversation.name : conversation.users.filter(u => u._id !== user._id).map((u, i) => i === (conversation.users.filter(u => u._id !== user._id).length - 1) ? u.username : `${u.username}, `)
}

export const formatMessageDate = (message) => {
    dayjs.locale('fr')
    dayjs.extend(relativeTime)
    return dayjs(message.created_at).fromNow()
}