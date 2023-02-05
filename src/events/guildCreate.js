import register_commands from "../utils/register_commands.js";


export default client => { 


    client.on('guildCreate', guild => {
        register_commands(guild);
    });
}