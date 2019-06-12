const time = require('../../src/TimeUtil');
const calc = require('../../src/Calculations');
module.exports = {
    config: {
        name: 'stats',
        description: 'Returns the Stats of the Bot',
        owner: true,
    },
    run: async (aqua, m) => {
        const embed = new aqua.embed.MessageEmbed();
        let seconds = Math.floor(aqua.os.processUptime());
        let total = Math.ceil(aqua.os.totalmem() * 100) / 100;
        let used = process.memoryUsage().rss
        embed.setAuthor('Aqua Stats');
        embed.setThumbnail(aqua.user.avatarURL());
		embed.setDescription('Results');
		embed.setColor('3099F0');
        embed.addField('**Uptime**', time.formatSec(seconds), true);
        embed.addField('**Resource Usage**', `Memory Used: ${calc.convertBytes(used)}\nTotal Memory: ${calc.convertMBytes(total)}`, true);
        embed.addField('**Shard Pings**', ping(aqua), true);
        embed.addField('**Discord Stats**', `${aqua.guilds.size} Guilds\n${aqua.users.size} Users\n${aqua.ws.shards.size} Shards`, true);
		return m.channel.send({ embed });
    }
};
function ping(aqua) {
    let pings = [];
	for (let i = 0; i < aqua.ws.shards.size; i++) {
		let ping = aqua.ws.shards.get(i).ping;
		pings.push(`Shard ${i}: ${Math.floor(ping)}ms`);
	}
	return pings;
};