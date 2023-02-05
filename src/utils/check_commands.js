import registerCommands from './register_commands.js';

export default client => {
    client.guilds.cache.forEach(async guild => {
        const commands = await guild.commands.fetch().catch(err => console.log(err)) || client.slash_commands.size

        if(commands.size != client.slash_commands.size) registerCommands(guild);
    });
}