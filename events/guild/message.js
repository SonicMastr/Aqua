const { prefix, ownerID } = require('../../config.json');

module.exports = async (bot, wss, redis, m) => {
    if (m.author.bot || m.channel.type === 'dm') return;

    console.log(`${m.channel.id}:${m.author.username}#${m.author.discriminator}: ${m.content}`);
    let channel = await redis.get('channel');

    wss.clients.forEach(ws => {
        if (channel !== m.channel.id) return;
          ws.send(`${m.author.username}#${m.author.discriminator}: ${m.content}`);
    });

    let args = m.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if (!m.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd));
    if (commandfile) {
        if (commandfile.config.owner) {
            if (m.author.id !== `${ownerID}`) return m.reply('you can\'t do that!').then(msg => { msg.delete(5000); });
        }
        commandfile.run(bot, m, args);
    }
}