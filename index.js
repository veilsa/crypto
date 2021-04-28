const Discord = require('discord.js');
const client = new Discord.Client();
const price = require('crypto-price');
const fs = require('fs');
const {table} = require('table');
const settings = require('./settings.json')
var prefix = settings.prefix;

config = {
  border: {
    topBody: `─`,
    topJoin: `┬`,
    topLeft: `┌`,
    topRight: `┐`,
 
    bottomBody: `─`,
    bottomJoin: `┴`,
    bottomLeft: `└`,
    bottomRight:  `┘`,
 
    bodyLeft: `│`,
    bodyRight: `│`,
    bodyJoin: `│`,
 
    joinBody: `─`,
    joinLeft: `├`,
    joinRight: `┤`,
    joinJoin: `┼`
  }
};

client.on('ready', () => {
  client.user.setActivity(settings.oynuyor, { type: 'WATCHING' })
})

client.on('ready', () => {
  setInterval(async() => {
    var try_btc = await price.getCryptoPrice('TRY', 'BTC');    
    var usd_btc = await price.getCryptoPrice('USD', 'BTC');
    var eur_btc = await price.getCryptoPrice('EUR', 'BTC');
    var try_eth = await price.getCryptoPrice('TRY', 'ETH');   
    var usd_eth = await price.getCryptoPrice('USD', 'ETH');
    var eur_eth = await price.getCryptoPrice('EUR', 'ETH');
    var try_ltc = await price.getCryptoPrice('TRY', 'LTC');
    var usd_ltc = await price.getCryptoPrice('USD', 'LTC');
    var eur_ltc = await price.getCryptoPrice('EUR', 'LTC');
  let data = [
  ["COIN", "TRY", "USD", "EUR"],
  ["BTC", try_btc.price, usd_btc.price, eur_btc.price],
  ["ETH", try_eth.price, usd_eth.price, eur_eth.price],
  ["LTC", try_ltc.price, usd_ltc.price, eur_ltc.price],
  ];

  let out = table(data, config);
  const g = client.guilds.cache.find(g => g.id === settings.guildid);
  const channel = g.channels.cache.find(ch => ch.id === settings.channelid)
  channel.send('```'+ out + '```');
  }, 30000)
  console.log(`${client.user.tag} adıyla giriş yapıldı!`);
});

client.on('message', msg => {
  if (msg.content === `${prefix}ping`) {
    msg.channel.send(`:ping_pong:  Pingim : ${client.ws.ping}`);
  }
});

client.on('message', async(msg) => {
  if (msg.content.startsWith(`${prefix}`)) {
    var crypto = msg.content.slice(prefix.length);
    var try_all = await price.getCryptoPrice('TRY', crypto);    
    var usd_all = await price.getCryptoPrice('USD', crypto);
    var eur_all = await price.getCryptoPrice('EUR', crypto);
    let data = [
      ["COIN", "TRY", "USD", "EUR"],
      [crypto, try_all.price, usd_all.price, eur_all.price],
    ];
    let out = table(data, config);
    msg.channel.send('```'+ out + '```');
  }
});

client.login(settings.token);