module.exports = {
	config: {
		name: 'rc',
		description: 'Reloads Commands',
		owner: true,
	},
	run: async (aqua, m, args) => {
		let promise = aqua.loadCMDs();
		m.channel.send(promise);
	},
};