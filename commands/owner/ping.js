module.exports = {
    config: {
        name: 'ping',
        description: 'Returns Ping of the Bot',
        owner: true,
    },
    run: async (aqua, m) => {
        try {
            m.channel.send({
                'embed': {
                    'color': 7337974,
                    'author': {
                        'name': 'Aqua',
                        'icon_url': aqua.user.avatarURL,
                    },
                    'fields': [
                        {
                            'name': '**Ping**',
                            'value': aqua.ws.ping + 'ms',
                        },
                    ],
                },
            });
        }
        catch (err) {
            m.channel.send(`\`ERROR\` \`\`\`xl\n${err}\n\`\`\``);
            aqua.error(err);
        }
    },
};