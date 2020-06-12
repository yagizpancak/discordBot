const Discord = require('discord.js');
const bot = new Discord.Client();
const fetch = require("node-fetch");
const ytdl = require('ytdl-core');


const token = process.env.token;

const PREFIX = '!';

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

bot.on('ready', () => {
    console.log('This bot is online!')
})

bot.on('message', message=>{
    
    let args = message.content.substring(PREFIX.length).split(" ");
    const channel = message.member.voice.channel;

    switch(args[0]){
        case 'dolar':
            convertCurrency(1, 'USD', 'TRY', function(err, amount) {
                message.channel.send('1 USD = '+amount+' Türk Lirası');
            });

            if (!channel){
                return;
            }


            if(!message.guild.voiceConnection) 
                channel.join()
                .then(function(connection) {
                const dispatcher = connection.play(ytdl('https://youtu.be/90X3hdTfa28', {filter: "audioonly"}))
                dispatcher.on("finish", function(){
                    connection.disconnect();
                });
                
            })

            break;
        
        case 'euro':
            convertCurrency(1, 'EUR', 'TRY', function(err, amount) {
                message.channel.send('1 EUR = '+amount+' Türk Lirası');
            });

            if (!channel){
                return;
            }


            if(!message.guild.voiceConnection) 
                channel.join()
                .then(function(connection) {
                const dispatcher = connection.play(ytdl('https://youtu.be/90X3hdTfa28', {filter: "audioonly"}))
                dispatcher.on("finish", function(){
                    connection.disconnect();
                })
                
            })

        break;
    }
})


bot.login(token);

