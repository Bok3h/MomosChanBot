const Discord =  require('discord.js'); 
var request = require('request');
const { refresh_token, client_id, client_secret, imgurApiUrl, authHeader, michisUrl, ladyUrl, momosUrl, akiraUrl, discordToken } = require('./config.json');

var options_access_token = {
  'method': 'POST',
  'url': imgurApiUrl,
  'headers': {
  },
  formData: {
    'refresh_token': refresh_token,
    'client_id': client_id,
    'client_secret': client_secret,
    'grant_type': 'refresh_token'
  }
};

//IMGUR Album Request 1 
var options_album_info_michis = {
  'method': 'GET',
  'url': michisUrl,
  'headers': {
    'Authorization': authHeader
  },
  formData: {

  }
};
//IMGUR Album Request 2
var options_album_info_lady = {
  'method': 'GET',
  'url': ladyUrl,
  'headers': {
    'Authorization': authHeader
  },
  formData: {

  }
};
//IMGUR Album Request 3 
var options_album_info_momos = {
  'method': 'GET',
  'url': momosUrl,
  'headers': {
    'Authorization': authHeader
  },
  formData: {

  }
};
//IMGUR Album Request 4 
var options_album_info_akira = {
  'method': 'GET',
  'url': akiraUrl,
  'headers': {
    'Authorization': authHeader
  },
  formData: {

  }
};

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Bot is ready as ${client.user.tag}!`);
});

client.on('message', msg => {

    console.log(msg.content);
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
        request(options_album_info_michis, function (error, AlbumInfoResponse) {
            if (error) throw new Error(error);
            var AlbumInfoResponse_txt_body = AlbumInfoResponse.body;
            var AlbumInfoResponse_JSON_body = JSON.parse(AlbumInfoResponse_txt_body);
            var images = new Array();
            for (i in AlbumInfoResponse_JSON_body.data.images) {
              images.push(AlbumInfoResponse_JSON_body.data.images[i].id);
            }
            let rand = Math.floor(Math.random() * images.length);
            console.log(rand);
            let file_name = 'https://i.imgur.com/' + images[rand] + '.jpg';
            console.log(file_name);        
          const embed =  new Discord.MessageEmbed()
              .setDescription(`Una Michis salvaje aparece ante ${msg.author}!`)
              .setColor(0x44F7BA)
              .setImage(file_name)
          msg.channel.send(embed);
          console.log(`${msg.author}`)
          });
    }
    //!lady Command
    if (msg.content === '!lady') {
      request(options_album_info_lady, function (error, AlbumInfoResponse) {
          if (error) throw new Error(error);
          var AlbumInfoResponse_txt_body = AlbumInfoResponse.body;
          var AlbumInfoResponse_JSON_body = JSON.parse(AlbumInfoResponse_txt_body);
          var images = new Array();
          for (i in AlbumInfoResponse_JSON_body.data.images) {
            images.push(AlbumInfoResponse_JSON_body.data.images[i].id);
          }
          let rand = Math.floor(Math.random() * images.length) ;
          console.log(rand);
          let file_name = 'https://i.imgur.com/' + images[rand] + '.jpg';
          console.log(file_name);        
        const embed =  new Discord.MessageEmbed()
            .setDescription(`Una Lady salvaje aparece ante ${msg.author}!`)
            .setColor(0x44F7BA)
            .setImage(file_name)
        msg.channel.send(embed);
        });

    }
    //!momos Command
    if (msg.content === '!momos') {
    request(options_album_info_momos, function (error, AlbumInfoResponse) {
        if (error) throw new Error(error);
        var AlbumInfoResponse_txt_body = AlbumInfoResponse.body;
        var AlbumInfoResponse_JSON_body = JSON.parse(AlbumInfoResponse_txt_body);
        var images = new Array();
        for (i in AlbumInfoResponse_JSON_body.data.images) {
          images.push(AlbumInfoResponse_JSON_body.data.images[i].id);
        }
        let rand = Math.floor(Math.random() * images.length) ;
        console.log(rand);
        let file_name = 'https://i.imgur.com/' + images[rand] + '.jpg';
        console.log(file_name);        
      const embed =  new Discord.MessageEmbed()
          .setDescription(`Un momos gordo aparece ante ${msg.author}!`)
          .setColor(0x44F7BA)
          .setImage(file_name)
      msg.channel.send(embed);
      });
    }
    //!akira Command
    if (msg.content === '!akira') {
  request(options_album_info_akira, function (error, AlbumInfoResponse) {
      if (error) throw new Error(error);
      var AlbumInfoResponse_txt_body = AlbumInfoResponse.body;
      var AlbumInfoResponse_JSON_body = JSON.parse(AlbumInfoResponse_txt_body);
      var images = new Array();
      for (i in AlbumInfoResponse_JSON_body.data.images) {
        images.push(AlbumInfoResponse_JSON_body.data.images[i].id);
      }
      let rand = Math.floor(Math.random() * images.length) ;
      console.log(rand);
      let file_name = 'https://i.imgur.com/' + images[rand] + '.jpg';
      console.log(file_name);        
    const embed =  new Discord.MessageEmbed()
        .setDescription(`Una Akira aparece ante ${msg.author}!`)
        .setColor(0x44F7BA)
        .setImage(file_name)
    msg.channel.send(embed);
    });
    }
});
client.login(discordToken);