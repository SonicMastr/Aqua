module.exports = {
    config: {
        name: 'bella',
        description: 'Says Bella Best Girl',
    },
    run: async (aqua, m) => {
        m.delete();
        m.channel.send('Bella Best Girl');
    },
};