import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Bot } from '../../Configs/config.js';


export default async guild => {
    const { client } = guild;
    const rest = new REST({ version: '9' }).setToken(Bot.token);

    // Register commands
    const body = client.slash_commands.map(command => command.slash_data);
    try {
        await rest.put(
            Routes.applicationGuildCommands(client.user.id, guild.id),
            { body }
        )
    } catch (error) {
        console.log(error);
    }
}