const Discord =  require('discord.js'); 
let request = require('request');
const { refresh_token, client_id, client_secret, imgurApiUrl, authHeader, michisUrl, ladyUrl, momosUrl, akiraUrl, discordToken } = require('./config.json');

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

let imgurAccessRequest = new ImgurAccessRequest(imgurApiUrl, refresh_token, client_id, client_secret);
let imgurAlbumRequest = {};
    imgurAlbumRequest.michis  = new ImgurAlbumRequest(michisUrl, authHeader);
    imgurAlbumRequest.lady  = new ImgurAlbumRequest(ladyUrl, authHeader);
    imgurAlbumRequest.momos  = new ImgurAlbumRequest(momosUrl, authHeader);
    imgurAlbumRequest.akira  = new ImgurAlbumRequest(akiraUrl, authHeader);

function imgurLogin (imgurAccessRequest){
    request(imgurAccessRequest, function (error, AccessTokenResponse) {
        if (error) throw new Error(error);
        imgurAccessRequest.response = JSON.parse(AccessTokenResponse.body);
        //console.log(imgurAccessRequest);
    });
}

function imgurGetAlbumImages (imgurAlbumRequest, msg, animal){
  let response = {};
  request(imgurAlbumRequest, function (error, AlbumInfoResponse) {
      if (error) throw new Error(error);
      imgurAlbumRequest.response = JSON.parse(AlbumInfoResponse.body)
      let response = imgurAlbumRequest.response.data.images;
      imageUrl = getRandomImage(response);
      discordMessageResponse(imageUrl, msg, animal);
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

function discordMessageResponse (file_name, msg, mascot){
  const embed =  new Discord.MessageEmbed()
      .setDescription(`${mascot.prefix} ${mascot.name} salvaje aparece ante ${msg.author}!`)
      .setColor(0x44F7BA)
  .setImage(imageUrl)
  msg.channel.send(embed);
}

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Bot is ready as ${client.user.tag}!`);
});

client.on('message', msg => {
    let mascot = {};
        mascot.name ='';
        mascot.prefix = '';
    //!restart Command
    if (msg.content.includes('!restart')){
      imgurLogin();
        msg.channel.send('IMGUR API Restarted');
    }
    //!test Command
    if (msg.content.includes('!test')){
        msg.channel.send('Test Completed!');
    }
    //!michis Command
    if (msg.content === '!michis') {
      mascot.name = 'Michis';
      mascot.prefix = 'Una';
      imgurGetAlbumImages(imgurAlbumRequest.michis, msg, mascot);
    }
    //!lady Command
    if (msg.content === '!lady') {
      mascot.name = 'Lady';
      mascot.prefix = 'Una';
      imgurGetAlbumImages(imgurAlbumRequest.lady, msg, mascot);
    }
    //!momos Command
    if (msg.content === '!momos') {
      mascot.name = 'Momos';
      mascot.prefix = 'Un';
      imgurGetAlbumImages(imgurAlbumRequest.momos, msg, mascot);
    }
    //!akira Command
    if (msg.content === '!akira') {
      mascot.name = 'Akira';
      mascot.prefix = 'Una';
      imgurGetAlbumImages(imgurAlbumRequest.akira, msg, mascot);
    }
});
client.login(discordToken);