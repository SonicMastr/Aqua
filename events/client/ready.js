const chalk = require('chalk');
module.exports = async (bot) => {
    console.log(chalk.bold.green('Logged in'));
    bot.user.setActivity('I don\'t want to be lonely')
}