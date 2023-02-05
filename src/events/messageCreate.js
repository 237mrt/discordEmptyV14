import { bot } from "../config.js"
import cooldown_control from "../utils/cooldown_control.js"

export default client => {
    
    client.on('messageCreate', async message => {
        const prefix = bot.prefix

        if (!message.content.startsWith(prefix) || message.author.bot) return

        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()

        const command = client.commands.get(commandName)
        if(!command) return

        // Cooldown Control
        const cooldown = cooldown_control(command, message.member.id)
        if(cooldown) return message.reply(`Bu komutu tekrar kullanabilmek için \`${cooldown}\` saniye beklemelisin`)

        try{
            command.data.execute(message, args)
        }catch(error){
            console.error(error)
            message.reply('Bu komut çalıştırılamadı')
        }
    })
}