const Aqua = require('./src/aqua');
new Aqua({ shardCount: 2, totalShardCount: 2, messageCacheLifetime: 1, messageSweepInterval: 300 });
