const { SlashCommandBuilder } = require('@discordjs/builders');
const { refresh_token, client_id, client_secret, imgurApiUrl } = require('../../src/config.json');
let request = require('request');

class ImgurAccessRequest {
	constructor( apiUrl, refresh_token, client_id, client_secret){
	this.method = 'POST';
	this.url = apiUrl;
	this.headers = {};
	this.formData = {
	  'refresh_token' : refresh_token,
	  'client_id': client_id,
	  'client_secret': client_secret,
	  'grant_type': 'refresh_token'
	  };
	}
}

function imgurLogin (imgurAccessRequest){
    request(imgurAccessRequest, function (error, AccessTokenResponse) {
        if (error) throw new Error(error);
        imgurAccessRequest.response = JSON.parse(AccessTokenResponse.body);
        //console.log(imgurAccessRequest);
    });
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('restart')
		.setDescription('Re-Login on Imgur API'),
	async execute(interaction) {
        console.log('/restart Command Used!');
		let imgurAccessRequest = new ImgurAccessRequest(imgurApiUrl, refresh_token, client_id, client_secret);
		//console.log(imgurAccessRequest);
        imgurLogin(imgurAccessRequest);
		await interaction.reply('Imgur API restarted!');
	},
};