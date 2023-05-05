import { Bot } from "../Configs/config.js"
import cooldown_control from "../Utils/Bot/cooldown_control.js"


export default client => {

    client.on('messageCreate', async message => {
        const prefix = Bot.prefix

        if (!message.content.startsWith(prefix) || message.author.bot) return

        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()

        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.data.aliases && cmd.data.aliases.includes(commandName))
        if (!command) return

        // Cooldown Control
        const cooldown = cooldown_control(command.data, message.member.id, message.member)
        if (cooldown) return message.reply(`Bu komutu tekrar kullanabilmek için \`${cooldown}\` saniye beklemelisin`).then(x => { setTimeout(() => { x.delete() }, 3000) })

        try {
            command.data.execute(client,message, args)
        } catch (error) {
            console.error(error)
            message.reply('Bu komut çalıştırılamadı').then(x => { setTimeout(() => { x.delete() }, 3000) })
        }
    })
}