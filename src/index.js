// DOCUMENTACION DISCORD.JS https://discord.js.org/#/docs/main/stable/general/welcome
// IMPORTA MODULOS DISCORD.JS
const Discord =  require('discord.js'); 
//IMPORTA MODULO PARA API
var request = require('request');

//CREDENCIALES API IMGUR
const refresh_token = '8dc5a1572592912dfb4f37b65ddebb566cbd2a32';
const client_id = '3e007d0c52b9f67';
client_secret = 'd430c8d2459cd355f31c09c24227d2efafdcb8bb';
//FORMATO REQUEST ACCESS TOKEN
var options_access_token = {
  'method': 'POST',
  'url': 'https://api.imgur.com/oauth2/token',
  'headers': {
  },
  formData: {
    'refresh_token': refresh_token,
    'client_id': client_id,
    'client_secret': client_secret,
    'grant_type': 'refresh_token'
  }
};
//FORMATO REQUEST ALBUM INFO MICHIS
var options_album_info_michis = {
  'method': 'GET',
  'url': 'https://api.imgur.com/3/album/haaRuGg',
  'headers': {
    'Authorization': 'Client-ID 3e007d0c52b9f67'
  },
  formData: {

  }
};
//FORMATO REQUEST ALBUM INFO LADY
var options_album_info_lady = {
  'method': 'GET',
  'url': 'https://api.imgur.com/3/album/wih2pxA',
  'headers': {
    'Authorization': 'Client-ID 3e007d0c52b9f67'
  },
  formData: {

  }
};
//FUNCION REQUEST ACCESS
request(options_access_token, function (error, AccessTokenResponse) {
    if (error) throw new Error(error);
    //Imprime el body de la respuesta original
    //console.log(AccessTokenResponse.body);
    //Almacenar el body de la respuesta(string) en una variable
    var AccessTokenResponse_JSON = AccessTokenResponse.body;
    //console.log(typeof(AccessTokenResponse_JSON));
    //Parsear el string como JSON
    var AccessTokenResponse_JSON_BODY = JSON.parse(AccessTokenResponse_JSON);
    //console.log(typeof(AccessTokenResponse_JSON_BODY));
    //Acceder a las propiedades del objeto JSON
    //console.log(AccessTokenResponse_JSON_BODY.account_username);
  
  });

//CREA EL CLIENTE(BOT)
const client = new Discord.Client();
//client.on escucha los eventos del cliente. client.on(ready) escucha el evento de conexion.
client.on('ready', () => {
    console.log(`Bot is ready as ${client.user.tag}!`);
});
//client.on escucha el evento mensaje, pasa el valor de mensaje en la var msg a la funcion para imprimir.
client.on('message', msg => {
    //recibiendo el mensaje
    console.log(msg.content);
    if (msg.content.includes('!restart')){
      request(options_access_token, function (error, AccessTokenResponse) {
        if (error) throw new Error(error);
        //Imprime el body de la respuesta original
        //console.log(AccessTokenResponse.body);
        //Almacenar el body de la respuesta(string) en una variable
        var AccessTokenResponse_JSON = AccessTokenResponse.body;
        //console.log(typeof(AccessTokenResponse_JSON));
        //Parsear el string como JSON
        var AccessTokenResponse_JSON_BODY = JSON.parse(AccessTokenResponse_JSON);
        //console.log(typeof(AccessTokenResponse_JSON_BODY));
        //Acceder a las propiedades del objeto JSON
        //console.log(AccessTokenResponse_JSON_BODY.account_username);
      });
        msg.channel.send('API Imgur reiniciada! ');
    }
    if (msg.content.includes('!test')){
        msg.channel.send('Test completo!');
    }
    //Comando !michis
    if (msg.content === '!michis') {
        request(options_album_info_michis, function (error, AlbumInfoResponse) {
            if (error) throw new Error(error);
            //Imprime el body de la respuesta original.
            //console.log(AlbumInfoResponse.body);
            var AlbumInfoResponse_txt_body = AlbumInfoResponse.body;
            //console.log(typeof(AlbumInfoResponse_txt_body));
            var AlbumInfoResponse_JSON_body = JSON.parse(AlbumInfoResponse_txt_body);
            //console.log(typeof(AlbumInfoResponse_JSON_body));
            //console.log(AlbumInfoResponse_JSON_body.data.images[0].id);
            var images = new Array();
            for (i in AlbumInfoResponse_JSON_body.data.images) {
              images.push(AlbumInfoResponse_JSON_body.data.images[i].id);
            }
            let rand = Math.floor(Math.random() * images.length);
            console.log(rand);
            let file_name = 'https://i.imgur.com/' + images[rand] + '.jpg';
            console.log(file_name);        
          const embed =  new Discord.MessageEmbed()
              .setTitle(`Una michis salvaje aparece ante ${msg.author}!`)
              .setColor(0x44F7BA)
              .setImage(file_name)
          msg.channel.send(embed);
          console.log(`${msg.author}`)
          });
    }
    if (msg.content === '!lady') {
      request(options_album_info_lady, function (error, AlbumInfoResponse) {
          if (error) throw new Error(error);
          //Imprime el body de la respuesta original.
          //console.log(AlbumInfoResponse.body);
          var AlbumInfoResponse_txt_body = AlbumInfoResponse.body;
          //console.log(typeof(AlbumInfoResponse_txt_body));
          var AlbumInfoResponse_JSON_body = JSON.parse(AlbumInfoResponse_txt_body);
          //console.log(typeof(AlbumInfoResponse_JSON_body));
          //console.log(AlbumInfoResponse_JSON_body.data.images[0].id);
          var images = new Array();
          for (i in AlbumInfoResponse_JSON_body.data.images) {
            images.push(AlbumInfoResponse_JSON_body.data.images[i].id);
          }
          let rand = Math.floor(Math.random() * images.length) ;
          console.log(rand);
          let file_name = 'https://i.imgur.com/' + images[rand] + '.jpg';
          console.log(file_name);        
        const embed =  new Discord.MessageEmbed()
            .setTitle('Una Lady salvaje !')
            .setColor(0x44F7BA)
            .setImage(file_name)
        msg.channel.send(embed);
        });

  }
});
client.login('NzY0NTQyODQ2NTQzNTkzNDgz.X4HyAw.wj_znIufBoD8QzY-ARPIqupB4BI');