import cooldown_control from "../Utils/Bot/cooldown_control.js";

export default client => {

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
        // isCommand
        const command = client.slash_commands.get(interaction.commandName);
        if (!command) return;

        // Cooldown Sistemi
        const cooldown = cooldown_control(command.data, interaction.member.id, interaction.member);
        
        if (cooldown) return interaction.reply({ content: `Bu komutu tekrar kullanabilmek için \`${cooldown}\` saniye beklemelisin!`, ephemeral: true })

        try {
            await command.data.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Bu komut sorunlu gibi gözüküyor!', ephemeral: true });
        }

    });


}