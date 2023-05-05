import { ActivityType } from "discord.js"
import { Bot } from "../Configs/config.js"
import check_commands from "../Utils/Bot/check_commands.js"

export default client => {
    
    client.once('ready', () => {
        client.user.setPresence({
            activities: [{ name: Bot.presence.name, type: ActivityType.Watching }],
            status: Bot.presence.status,
        })
        check_commands(client)
    })

}