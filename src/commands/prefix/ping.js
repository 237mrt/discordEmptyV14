export const data ={
    name:'oy',
    desc:'Ping komutu',
    cooldown:70, // komutun kaç saniyede bir kullanılacağını belirtir
    slash:false, // slash komutu olup olmadığını belirtir
    execute(message, args){
        message.reply('Pong')
    }
}