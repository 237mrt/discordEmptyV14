
export const data = {
    name: 'ping', // Komutun ismi
    aliases: ['test', 'pingg'],  // Komutun farklı kullanımları
    desc: 'Ping komutu', // Komutun açıklaması
    cooldown: 60,  // Komutun cooldown süresi
    slash: false, // Komut slash komut ise true değil ise false
    async execute(client, message, args) {
        message.reply('Pong!')        

    }
}
