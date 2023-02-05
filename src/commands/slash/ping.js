import { SlashCommandBuilder } from "@discordjs/builders";


export const data = {
    name:'ping',
    desc:'Ping komutu',
    cooldown:70, // komutun kaç saniyede bir kullanılacağını belirtir
    execute(interaction, client){
        interaction.reply('Pong!');

    }
}


export const slash_data = new SlashCommandBuilder()
.setName(data.name)
.setDescription(data.desc)
