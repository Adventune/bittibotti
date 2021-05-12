const Utils = require('../scripts/Utils');
const Index = require('../index');

exports.setruleslink = function(message, guildConf) {
    var json = Utils.decodeMessage(message);
    var args = json.args;

 // Check if user has permission to use this command
    if (!message.member.hasPermission("ADMINISTRATOR")){
        const adminRole = message.guild.roles.cache.find(role => role.name === guildConf.modRole);
        if(!adminRole) return message.reply("Roolia jolla tämä komento voidaan suorittaa ei ole määritelty!");

        // Exit if the user is not admin
        if(!message.member.roles.cache.has(adminRole.id)) {
            return message.reply("Sinulla ei valitettavasti ole oikeuksia tähän komentoon!");
        }
    }

    if(args.length === 0) return message.reply("`Komennon käyttö:` " + guildConf.prefix + " setrules <LINKKI>");
    const url = args[0]; 
    if(isValidHttpUrl(url)){
        Index.setSettings(message, "rulesLink", url);
        message.reply("Sääntöjen linkki on päivitetty!");
    }
    else {
        message.reply("Syöttämäsi linkki ei vaikuta olevan pätevä! Varmista että kirjoitit linkin oikein!")
    }
}

exports.getruleslink = function(message, guildConf) {
    var link = guildConf.rulesLink;
    if(link === "") link = "Linkkiä ei määritelty"
    message.reply("Tässä linkki sääntöihin: " + link)
}

function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return true;
  }