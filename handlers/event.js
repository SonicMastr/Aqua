const { readdirSync } = require('fs');

module.exports = (bot, wss, redis) => {
    const load = dir => {
        const events = readdirSync(`./events/${dir}/`).filter(d => d.endsWith('.js'));
        for (let file of events) {
            const evt = require(`../events/${dir}/${file}`);
            let eName = file.split('.')[0];
            bot.on(eName, evt.bind(null, bot, wss, redis));
        }
    }
    ['client', 'guild'].forEach(a => load(a));
}