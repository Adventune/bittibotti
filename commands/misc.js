const Utils = require('../scripts/Utils');
const Index = require('../index');

exports.match = function(message, guildConf){
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

    if(args.length === 0 || args[0] > 1 || !Utils.isNum(args[0])) return message.reply("`Komennon käyttö:` " + guildConf.prefix + " matchpercentage <PROSENTTI_DESIMAALINA (<= 1)>");

    Index.setSettings(message, "matchpercentage", args[0]);
    message.reply("Uusi suodatinkynnys asetettu!")
}

exports.modrole = function(message, guildConf){
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

    var role = message.mentions.roles.first();

    if(args.length === 0 || role === undefined) return message.reply("`Komennon käyttö:` " + guildConf.prefix + " modrole <@ROOLIMAININTA>");
    var roleName = role.name;

    Index.setSettings(message, "modRole", roleName);
    message.reply("Rooli komentojen suorittamiselle päivitettiin!");
}

exports.reset = function(message, guildConf){
     // Check if user has permission to use this command
     if (!message.member.hasPermission("ADMINISTRATOR")){
        const adminRole = message.guild.roles.cache.find(role => role.name === guildConf.modRole);
        if(!adminRole) return message.reply("Roolia jolla tämä komento voidaan suorittaa ei ole määritelty!");

        // Exit if the user is not admin
        if(!message.member.roles.cache.has(adminRole.id)) {
            return message.reply("Sinulla ei valitettavasti ole oikeuksia tähän komentoon!");
        }
    }

    message.reply('Oletko varma että haluat nollata botin asetukset?\n'
    + 'Vahvista reagoimalla! Pyyntö perutaan automaattisesti 30 sekunnin päästä!');

    // Reacts so the user only have to click the emojis
    message.react('👍').then(r => {
        message.react('👎');
    });

    // First argument is a filter function
    message.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '👍' || reaction.emoji.name == '👎'),
        { max: 1, time: 30000 }).then(collected => {
                if (collected.first().emoji.name == '👍') {
                        Index.reset(message);
                        message.reply('Botin asetukset nollattu!');
                        return;
                }
                else
                        message.reply('Nollaaminen peruttu');
                        return;
        }).catch(() => {
                message.reply('Ei vastausta 30 sekunnissa, nollaaminen peruttu');
        });
}

exports.currentsettings = function(client, message, guildConf){

     // Check if user has permission to use this command
     if (!message.member.hasPermission("ADMINISTRATOR")){
        const adminRole = message.guild.roles.cache.find(role => role.name === guildConf.modRole);
        if(!adminRole) return message.reply("Roolia jolla tämä komento voidaan suorittaa ei ole määritelty!");

        // Exit if the user is not admin
        if(!message.member.roles.cache.has(adminRole.id)) {
            return message.reply("Sinulla ei valitettavasti ole oikeuksia tähän komentoon!");
        }
    }
    var channel = client.channels.cache.get(guildConf.listenedChannel);
    if(channel === undefined) channel = "";

    var role = message.guild.roles.cache.find(r => r.name === guildConf.modRole);
    if(role === undefined) role = "";

    message.reply("Tämän hetkiset asetukset: \n" 
    + "`Prefix:` " + guildConf.prefix + "\n"
    + "`Kuunneltu kanava:` " + channel + "\n"
    + "`Suodatinkynnys:` " + guildConf.matchpercentage + "\n"
    + "`FAQ Linkki:` <" + guildConf.faqLink + ">\n"
    + "`Sääntöjen Linkki:` <" + guildConf.rulesLink + ">\n"
    + "`Rooli komentojen käyttöön:` <@&" + role + ">\n");
}