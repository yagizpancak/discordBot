const Discord = require('discord.js');
const bot = new Discord.Client();
const fetch = require("node-fetch");
const ytdl = require('ytdl-core');


const PREFIX = '!';

const dolar = 'https://youtu.be/EpoHRAJX6fY';
const euro = "https://youtu.be/90X3hdTfa28";
const saat = 'https://www.youtube.com/watch?v=PEEs7oKntr4';
const sovyet = 'https://youtu.be/eymPAdrGCtE';
const oc = 'https://youtu.be/YL860wvtV2c';
const saat_2 = 'https://www.youtube.com/watch?v=1inxSk8FhtY';
const melih = 'https://www.youtube.com/watch?v=z8qC-aZ5XcY';
const simay = 'https://www.youtube.com/watch?v=ZfORrwPrEQ8';


var https = require('https');

function convertCurrency(amount, fromCurrency, toCurrency, cb) {
                  var apiKey = 'e335faad7ff938c35dbe';
                
                  fromCurrency = encodeURIComponent(fromCurrency);
                  toCurrency = encodeURIComponent(toCurrency);
                  var query = fromCurrency + '_' + toCurrency;
                
                  var url = 'https://free.currconv.com/api/v7/convert?q='
                            + query + '&compact=ultra&apiKey=' + apiKey;
                
                  https.get(url, function(res){
                      var body = '';
                
                      res.on('data', function(chunk){
                          body += chunk;
                      });
                
                      res.on('end', function(){
                          try {
                            var jsonObj = JSON.parse(body);
                
                            var val = jsonObj[query];
                            if (val) {
                              var total = val * amount;
                              cb(null, total);
                            } else {
                              var err = new Error("Value not found for " + query);
                              console.log(err);
                              console.log(jsonObj);
                              cb(err);
                            }
                          } catch(e) {
                            console.log("Parse error: ", e);
                            cb(e);
                          }
                      });
                  }).on('error', function(e){
                        console.log("Got an error: ", e);
                        cb(e);
                  });
}

function playSound(channel, voiceConnection, link) {

            try {
                const stream = ytdl(link,{
                filter:"audioonly",
                quality:"highestaudio"
                })


                if (!channel){
                    return;
                }
 
                if(!voiceConnection) 
                    channel.join()
                    .then(function(connection) {
                    const dispatcher = connection.play(stream)
                    dispatcher.on("finish", function(){
                    connection.disconnect();
                });
                
                })
            }
            catch(e){
                console.log("Error: "+e)
            }
}

bot.on('ready', () => {
    console.log('This bot is online!')
})

bot.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(" ");
    

    switch(args[0]){
        case 'dolar':
            convertCurrency(1, 'USD', 'TRY', function(err, amount) {
                message.reply('1 USD = '+amount+' Türk Lirası');
            });
            
            playSound(message.member.voice.channel, message.guild.voiceConnection, dolar);

            break;
        
        case 'euro':
            convertCurrency(1, 'EUR', 'TRY', function(err, amount) {
                message.reply('1 EUR = '+amount+' Türk Lirası');
            });

            playSound(message.member.voice.channel, message.guild.voiceConnection, euro);
            
            break;

        case 'saat':

            var today = new Date();
            var hour = parseInt(today.getHours())+3;
            if (hour >= 24) {hour = '0'+ (hour -24)}

            var minute = parseInt(today.getMinutes());
            if (minute <= 9) {minute = '0'+minute}
            
            var second = parseInt(today.getSeconds());
            if (second <= 9) {second = '0'+second}
            
            var time = hour + ":" + minute + ":" + second;

            message.reply(time);
            
            playSound(message.member.voice.channel, message.guild.voiceConnection, saat);
            
            break;
        
        case "komut":
            const embed = new Discord.MessageEmbed()
            .setTitle('Komutlar')
            .setDescription('!dolar \n!euro \n!saat \n!sovyet \n!saat-2.5')
            
            .setColor(0x33CFFB)
            message.reply(embed);

            break;

        case 'sovyet':
            const attachment = new Discord.MessageAttachment('./flag_su.png');
            message.reply(attachment);
            
            playSound(message.member.voice.channel, message.guild.voiceConnection, sovyet);
            
            break;

        case 'oc':
            
            playSound(message.member.voice.channel, message.guild.voiceConnection, oc);
            
            break;

        case 'oç':
            playSound(message.member.voice.channel, message.guild.voiceConnection, oc);
            
            break;
        
        case 'saat-2.5':
            playSound(message.member.voice.channel, message.guild.voiceConnection, saat_2);

            break;

        case 'melih':
            playSound(message.member.voice.channel, message.guild.voiceConnection, melih);

            break;

        case 'simay':
            playSound(message.member.voice.channel, message.guild.voiceConnection, simay);

            break;
    }
})


bot.login(process.env.token); //NzIwOTY1MjU3MTY5OTkzNzY4.XuNpWg.6Eyzi1cil6BbCnusJBHFVSu2L1I

