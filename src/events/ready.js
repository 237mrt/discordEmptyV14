import { ActivityType } from "discord.js"
import { bot } from "../config.js"
import check_commands from "../utils/check_commands.js"


export default (client) => {
    client.once('ready', () => {
        client.user.setPresence({
            activities: [{ name: bot.presence.name, type: ActivityType.Watching }],
            status: bot.presence.status,
        })
        check_commands(client)

    })

}