const { prefix, ownerID } = require('../../config.json');

module.exports = async (aqua, m) => {
    if (m.author.bot || m.channel.type === 'dm') return;

    console.log(`${m.channel.id}:${m.author.username}#${m.author.discriminator}: ${m.content}`);

    let args = m.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if (!m.content.startsWith(prefix)) return;
    let commandfile = aqua.commands.get(cmd) || aqua.commands.get(aqua.aliases.get(cmd));
    if (commandfile) {
        if (commandfile.config.owner) {
            if (m.author.id !== `${ownerID}`) return m.reply('you can\'t do that!').then(msg => { msg.delete(5000); });
        }
        commandfile.run(aqua, m, args);
    }
}