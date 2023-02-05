import { Client, Collection } from 'discord.js';
import { readdirSync } from 'fs';
import { bot } from './src/config.js';


const client = new Client({
    intents: [
        'GuildMembers',
        'Guilds',
        'GuildMessages',
        'MessageContent',
    ],
})

// Collections
client.commands = new Collection()
client.slash_commands = new Collection()

// Events Handler
readdirSync('./src/events/').forEach(async file => {
    const event = await import(`./src/events/${file}`).then(e => e.default)
    event(client)
})


// Command Handler
readdirSync('./src/commands/').forEach(async category => {
    readdirSync(`./src/commands/${category}`).forEach(async file => {
        const command = await import(`./src/commands/${category}/${file}`)
        if (command.data.slash == true) { client.slash_commands.set(command.data.name, command) }
        else {
            client.commands.set(command.data.name, command)
        }
    })
})




client.login(bot.token).then(() => { console.log('Bot başarıyla giriş yaptı') }).catch((err) => { console.log(`Bot giriş yaparken bir sorunla karşılaştı Hata: ${err}`); })