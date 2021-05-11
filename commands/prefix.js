const Utils = require('../scripts/Utils');
const Index = require('../index');

exports.setprefix = function(message, guildConf) {
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

    if(args.length === 0) return message.reply("`Komennon käyttö:` " + guildConf.prefix + " setprefix <uusi_prefix>");

    var prefix = args[0];
    Index.setSettings(message, "prefix", prefix);
    message.reply("Botin prefix on päivitetty!");
}