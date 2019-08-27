module.exports = {
    config: {
        name: 'leave',
        description: `Leave voice channel`,
    },
    run: async (aqua, m) => {
        if (!m.member.voice.channel) return m.channel.send('Please connect to a Voice Channel.');
		if (!m.guild.me.voice.channel) return m.reply('I\'m not in a Voice Channel.');
        if (m.guild.me.voice.channelID !== m.member.voice.channelID) return m.channel.send('You aren\'t connected to the same Voice Channel');
        const link = await aqua.Shoukaku.getLink(m.guild.id);
        await link.disconnect();
        m.channel.send('Left the Channel');
    },
};