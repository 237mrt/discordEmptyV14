import { Collection } from "discord.js"
import { GlobalConfig } from "../../Configs/config.js"
const cooldowns = new Collection()


export default (command, user_id, member) => {
    
    if(member.roles.cache.some(r => GlobalConfig.Roles.Owner.includes(r.id))) return false

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection())
    }

    const now = Date.now()
    const timestamps = cooldowns.get(command.name)
    const cooldownAmount = (command.cooldown || 5) * 1000

    if (timestamps.has(user_id)) {
        const expirationTime = timestamps.get(user_id) + cooldownAmount

        if (now < expirationTime) {
            const timeLeft = Math.round((expirationTime - now) / 1000)
            return timeLeft
        }

    } else {
        timestamps.set(user_id, now)
        setTimeout(() => timestamps.delete(user_id), cooldownAmount)
        return false
    }
}