module.exports = {
    config: {
        name: 'play',
        description: `Play's song with link`,
    },
    run: async (aqua, m, args) => {
        if (aqua.Shoukaku.getLink(m.guild.id)) return;
        if (!args[0]) return;
        const node = aqua.Shoukaku.getNode();
        const resolved = await node.rest.resolve(args.join(' '));
        if (!resolved) return;
        if (Array.isArray(resolved)) resolved = resolved[0];
        aqua.info(resolved);
        aqua.info(JSON.stringify(resolved.info));
        const link = await node.joinVoiceChannel({ guild_id: m.guild.id, channel_id: m.member.voice.channel.id});
        link.player.on('TrackEnd', (reason) => {
            console.log(reason);
            link.disconnect();
        });
        thumbnail = getThumbnail(resolved);
        await link.player.playTrack(resolved.track);
        link.player.on('TrackStuck', (reason) => {
            console.warn(reason);
            link.player.stopTrack().catch(console.error);
        });
        link.player.on('TrackException', console.log);
        link.player.on('WebSocketClosed', (reason) => {console.log(reason); link.disconnect()});
        /* 
        Other Player Methods you can use
        .setBands(Array of Bands)
        .seek(time to skip to)
        .pause() or .pause(false)
        .volume(0-999)
        .moveShoukakuNode(host, track, startTime in ms)
        .stop()
        .destroy()
        */
        
        await m.channel.send(`Playing: ${resolved.info.title} --- ${thumbnail}`);
    },
};

function getThumbnail(resolved) {
    let video_id = resolved.info.identifier;
    let thumbnailUrl = `https://img.youtube.com/vi/${video_id}/mqdefault.jpg`;
    return thumbnailUrl;
};