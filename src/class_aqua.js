const Discord = require('discord.js');
const fs = require('fs');
const os = require('os');

class Aqua extends Discord.Client {
    constructor(options) {
        super(options);
        //Define Commands
        this.commands = new Discord.Collection();
        this.aliases = new Discord.Collection();
        //CPU Cores
        this.cpuInfo = os.cpus().length;
    };
    //Command Handler Function
    async loadCMDs() {
        const load = dir => {
            const commands = fs.readdirSync(`./commands/${dir}/`).filter(d => d.endsWith('.js'));
            for (let file of commands) {
                const cache = require.resolve(`../commands/${dir}/${file}`);
                delete require.cache[cache];
                const pull = require(`../commands/${dir}/${file}`);
                this.commands.set(pull.config.name, pull);
                if (pull.config.aliases) pull.config.aliases.forEach(a => this.aliases.set(a, pull.config.name));
                console.log(`Loaded Command: ${pull.config.name}`);
            }
        }
        ['misc', 'moderation', 'owner'].forEach(a => load(a));
        console.log('All Commands Successfully loaded');
    }
};

module.exports = Aqua;