module.exports = {
    config: {
        name: 'play',
        description: `Play's song with link`,
    },
    run: async (aqua, m, args) => {
        if (aqua.Shoukaku.getPlayer(m.guild.id)) return;
        if (!args[0]) return;
        const node = aqua.Shoukaku.getNode();
        const resolved = await node.rest.resolve(args.join(' '));
        if (!resolved) return;
        if (Array.isArray(resolved)) resolved = resolved[0];
        aqua.info(resolved);
        aqua.info(JSON.stringify(resolved.info));
        const link = await node.joinVoiceChannel({ guildID: m.guild.id, voiceChannelID: m.member.voice.channel.id});
        link.on('end', (reason) => {
            console.log(reason);
            link.disconnect();
        });
        thumbnail = getThumbnail(resolved);
        link.on('stuck', (reason) => {
            console.warn(reason);
            link.disconnect();
        });
        link.on('exception', console.log);
        link.on('nodeDisconnect', (reason) => {console.log(reason); link.disconnect()});
        link.on('voiceClose', (reason) => {console.log(reason); link.disconnect()});
        await link.playTrack(resolved.track);
        await m.channel.send(`Playing: ${resolved.info.title} --- ${thumbnail}`);
    },
};

function getThumbnail(resolved) {
    let video_id = resolved.info.identifier;
    let thumbnailUrl = `https://img.youtube.com/vi/${video_id}/mqdefault.jpg`;
    return thumbnailUrl;
};