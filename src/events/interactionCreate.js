import cooldown_control from "../utils/cooldown_control.js";

export default client => {

    client.on('interactionCreate', async interaction => { 
        if (!interaction.isCommand()) return;

        const command = client.slash_commands.get(interaction.commandName);
        if(!command) return;

        // Cooldown Sistemi
        const cooldown = cooldown_control(command, interaction.member.id);
        if(cooldown) return interaction.reply({ content: `Bu komutu tekrar kullanabilmek için \`${cooldown}\` saniye beklemelisin!`, ephemeral: true })

        try {
            await command.data.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Bu komut sorunlu gibi gözüküyor!', ephemeral: true });
        }

    });


}