module.exports = (aqua) => {
    aqua.info(`Logged in on ${aqua.readyAt}`, true);
    aqua.user.setActivity('Being Useless');
}