const Discord = require('discord.js');
const { prefix, token, ownerID } = require('../config.json');
const chalk = require('chalk');
const fs = require('fs');
const os = require('os-utils');

class Aqua extends Discord.Client {
    constructor(options) {
        super(options);
        //Define Commands
        this.commands = new Discord.Collection();
        this.aliases = new Discord.Collection();
        //config
        this.ownerID = ownerID;
        this.prefix = prefix;
        //OS Resource Uses Stats
        this.os = os;
        //Other Stuff
        this.embed = Discord;

        this._init();
    };
    //Command Handler
    loadCMDs() {
        const load = dir => {
            const commands = fs.readdirSync(`./commands/${dir}/`).filter(d => d.endsWith('.js'));
            for (let file of commands) {
                const cache = require.resolve(`../commands/${dir}/${file}`);
                delete require.cache[cache];
                const pull = require(`../commands/${dir}/${file}`);
                this.commands.set(pull.config.name, pull);
                if (pull.config.aliases) pull.config.aliases.forEach(a => this.aliases.set(a, pull.config.name));
                this.info(`Loaded Command: ${pull.config.name}`);
            }
        }
        ['misc', 'moderation', 'owner'].forEach(a => load(a));
        this.info('All Commands Successfully loaded', true);
        return ('Reloaded all Commands');
    };
    //Event Handler
    _loadEvents() {
        const load = dir => {
            const events = fs.readdirSync(`./events/${dir}/`).filter(d => d.endsWith('.js'));
            for (let file of events) {
                const evt = require(`../events/${dir}/${file}`);
                let eName = file.split('.')[0];
                this.on(eName, evt.bind(null, this));
                this.info(`Loaded Event: ${eName}`);
            }
        }
        ['client', 'guild', 'shard'].forEach(a => load(a));
        this.info('All Events Successfully loaded', true);
    };
    //Console Logging
    error(error) {
        console.log(new Date().toLocaleTimeString(), `[${chalk.bold.red('Error')}]:`, chalk.bold.red(error));
    };
    warning(warning) {
        console.log(new Date().toLocaleTimeString(), `[${chalk.bold.yellow('Warning')}]:`, chalk.bold.yellow(warning));
    };
    info(info, zucc) {
        if (zucc) return console.log(new Date().toLocaleTimeString(), `[${chalk.bold.green('Success')}]:`, chalk.bold.green(info));

        console.log(new Date().toLocaleTimeString(), `[${chalk.whiteBright('Info')}]:`, chalk.whiteBright(info));
    };

    async _init() {
        process.on('unhandledRejection', console.error);
        process.on('uncaughtException', console.error);
        this._loadEvents();
        this.loadCMDs();
        await this.login(token).catch(this.error);
        this.info(this.ws.shards.size);
    };

};

module.exports = Aqua;