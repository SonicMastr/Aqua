module.exports = (aqua, id) => {
    aqua.info(`Started Shard ${id}`);
    aqua.hook.send('', {
        'username': 'Aqua',
        'embeds': [{
            'color': 16777215,
            'timestamp': new Date(),
            'fields': [{
                'name': `Shard ${id}`,
                'value': 'Shard Started',
            }],
        }],
    })
}