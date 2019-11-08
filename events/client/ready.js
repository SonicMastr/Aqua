module.exports = (aqua) => {
    aqua.Shoukaku.start([{
        name: 'My server',
        host: 'localhost',
        port: 8767,
        auth: 'frick'
    }], {
        id: aqua.user.id
    });
    aqua.user.setActivity('Being Useless');
    aqua.info(`Logged in and Ready on ${aqua.readyAt}`, true);
}