module.exports = (aqua, id) => {
    aqua.info(`Shard ${id} Reconnected!`, true);
    aqua.hook.send('', {
        'username': 'Aqua',
        'embeds': [{
            'color': 16777215,
            'timestamp': new Date(),
            'fields': [{
                'name': `Shard ${id}`,
                'value': 'Shard Successfully Reconnected',
            }],
        }],
    })
}