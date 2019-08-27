module.exports = {
    config: {
        name: 'ping',
        description: 'Returns Ping of the Bot',
        owner: true,
    },
    run: async (aqua, m) => {
        const embed = new aqua.embed.MessageEmbed();
		embed.setAuthor('Shard Pings', aqua.user.avatarURL());
		embed.setDescription('Results');
		embed.setColor('3099F0');
		for (let i = 0; i < aqua.ws.shards.size; i++) {
			let ping = aqua.ws.shards.get(i).ping;
			embed.addField(`Shard ${i}`, '```js\n' + Math.floor(ping) + 'ms```', true);
		}
		return m.channel.send({ embed });
    },
};