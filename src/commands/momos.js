const { SlashCommandBuilder } = require('@discordjs/builders');
const { momosUrl, authHeader } = require('../../src/config.json');
let request = require('request');
const { MessageEmbed } = require('discord.js');
class ImgurAlbumRequest {
	constructor( albumUrl, authHeader){
	this.method = 'GET';
	this.url = albumUrl;
	this.headers = {
	  'Authorization': authHeader
	};
	this.formData = {};
	}
}

let imgurAlbumRequest = {};
    imgurAlbumRequest.momos  = new ImgurAlbumRequest(momosUrl, authHeader);


function imgurGetAlbumImages (imgurAlbumRequest, interaction, mascot){
  let response = {};
	request(imgurAlbumRequest, function (error, AlbumInfoResponse) {
      if (error) throw new Error(error);
      imgurAlbumRequest.response = JSON.parse(AlbumInfoResponse.body)
      let response = imgurAlbumRequest.response.data.images;
      imageUrl = getRandomImage(response);
      discordMessageResponse(imageUrl, interaction, mascot);
  });
}

function getRandomImage (albumInfoReponseImages){
	let images = new Array();
	for (i in albumInfoReponseImages) {
		images.push(albumInfoReponseImages[i].id);
	}
	let rand = Math.floor(Math.random() * images.length);
	let file_name = 'https://i.imgur.com/' + images[rand] + '.jpg';
	return file_name;
}

async function discordMessageResponse (file_name, interaction, mascot){
	const embed =  new MessageEmbed()
		.setColor(0x44F7BA)
		.setTitle('Momos!')
		.setDescription(`${mascot.prefix} ${mascot.name} salvaje aparece ante ${interaction.user}!`)
		.setImage(imageUrl)
	await interaction.deferReply();
	await interaction.editReply({ embeds: [embed] });
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('momos')
		.setDescription('Replies With a Photo of Momos!'),
	async execute(interaction) {
		console.log(`/momos Command Used by ${interaction.user}!`);
		let mascot = {};
        mascot.name ='Momos';
        mascot.prefix = 'Un';	
		imgurGetAlbumImages(imgurAlbumRequest.momos, interaction, mascot);
	},
};