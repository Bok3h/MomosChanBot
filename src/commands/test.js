const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Test Command'),
	async execute(interaction) {
		await interaction.reply('Test Completed~!');
	},
};