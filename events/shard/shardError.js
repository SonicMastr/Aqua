module.exports = (aqua, err, id) => {
    aqua.error(`{Shard ${id}} Enountered Error: ${err.toString()}`);
}