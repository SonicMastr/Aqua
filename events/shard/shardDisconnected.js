module.exports = (aqua, reason, id) => {
    aqua.error(`Shard ${id} Disconnected: ${reason.code}`);
    aqua.setImmediate(() => {
        aqua.ws.shards.get(id)
            .connect()
            .then(() => {
                aqua.info(`Shard ${id} Reconnected after Disconnection`, true);
            })
            .catch((error) => aqua.error(`Shard ${id} Failed to Reconnect`));
    });
};