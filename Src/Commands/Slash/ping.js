import { SlashCommandBuilder } from "@discordjs/builders";

export const data = {
    name: 'ping', // Komutun ismi
    desc: 'Ping komutu', // Komutun açıklaması
    cooldown: 60,  // Komutun cooldown süresi
    slash: true, // Komut slash komut ise true değil ise false
    async execute(interaction, client) {
        interaction.reply('Pong!')        

    }
}


// Buraları ellemene gerek yok 
export const slash_data = new SlashCommandBuilder()
    .setName(data.name)
    .setDescription(data.desc)
