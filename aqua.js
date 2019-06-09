const Discord = require('discord.js');
const { prefix, token, ownerID } = require('./config.json');
const fs = require('fs');
const _Aqua = require('./src/class_aqua');
const aqua = new _Aqua();

aqua.on('ready', () => {
    console.log('Ready!');
    // Bot Status
    aqua.user.setActivity('Being Useless');
});
    
aqua.on('message', async m => {
    const args = m.content.slice(prefix.length).split(/ +/);
    if (m.author.bot) return;
    const command = args.shift().toLowerCase();
    if (m.content.startsWith('a!hi')) {
        m.channel.send('hi');
    } else {
        return;
    }
});
process.on('unhandledRejection', console.error);
process.on('uncaughtException', console.error);
    
console.log(`Aqua Started(${process.pid})`);
console.log(`${aqua.cpuInfo} CPUs`);
aqua.loadCMDs();
aqua.login(token);
