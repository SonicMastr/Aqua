module.exports = (aqua, err, id) => {
    aqua.error(`{Shard ${id}} ${err.toString()}`);
}