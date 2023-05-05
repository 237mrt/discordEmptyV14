import chalk from "chalk";
import { Client, Collection } from "discord.js";
import { readdirSync } from "fs";
import { Bot } from "./Src/Configs/config.js";


// Client
const client = new Client({
    intents: [
        'MessageContent',
        'GuildMembers',
        'Guilds',
        'GuildMessages',
    ]
})

// Collections
client.commands = new Collection();
client.slash_commands = new Collection()

// Events handler
readdirSync('./Src/Events/').forEach(async file => {
    const event = await import(`./Src/Events/${file}`).then(e => e.default);
    const eventName = file.split(".")[0];
    event(client);
    console.log(chalk.green.bold(`[Event] ${eventName} eventi başarıyla yüklendi`));
})

// Commands handler
readdirSync('./Src/Commands').forEach(async (category) => {
    readdirSync(`./Src/Commands/${category}`).forEach(async (file) => {
        const command = await import(`./src/commands/${category}/${file}`)
        if (command.data.slash == true) {
            console.log(chalk.blue.bold(`[Slash Command] ${command.data.name} yüklendi.`));

            client.slash_commands.set(command.data.name, command)
        }
        else {
            client.commands.set(command.data.name, command)
            console.log(chalk.blue.bold(`[Prefix Command] ${command.data.name} yüklendi.`));

        }
    });
});

client.login(Bot.token)
    .then(() => console.log(chalk.green.bold(`[Bot] Bot başarıyla giriş yaptı`)))
    .catch(err => console.log(chalk.red.bold(`[Bot] Bot giriş yaparken bir hata oluştu\n${err}`)))