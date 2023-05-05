import register_commands from "../../../invite_bot/Src/Utils/register_commands.js";

export default client => { 
    client.on('guildCreate', guild => {
        register_commands(guild);
    });
}