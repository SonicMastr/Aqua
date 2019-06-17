let lastTime = 0
module.exports = (aqua, id) => {
    aqua.warning(`Shard ${id} Lost Connection. Reconnecting...`);
    if(Date.now() - lastTime > 60000) {
        aqua.hook.send('', {
            'username': 'Aqua',
            'embeds': [{
                'color': 16777215,
                'timestamp': new Date(),
                'fields': [{
                    'name': `Shard ${id}`,
                    'value': 'Lost Connection. Reconnecting...',
                }],
            }],
        })
        lastTime = Date.now();
    };
    
}