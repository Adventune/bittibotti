const Utils = require('../scripts/Utils');
const Index = require('../index');

exports.add = function(message, guildConf) {
    var json = Utils.decodeMessage(message);
    var args = json.args;
    var content = json.content;

 // Check if user has permission to use this command
    if (!message.member.hasPermission("ADMINISTRATOR")){
        const adminRole = message.guild.roles.cache.find(role => role.name === guildConf.modRole);
        if(!adminRole) return message.reply("Roolia jolla tämä komento voidaan suorittaa ei ole määritelty!");

        // Exit if the user is not admin
        if(!message.member.roles.cache.has(adminRole.id)) {
            return message.reply("Sinulla ei valitettavasti ole oikeuksia tähän komentoon!");
        }
    }

    if(args.length === 0 || !content.includes(";")) return message.reply("`Komennon käyttö:` " + guildConf.prefix + " addfaq <Kysymys>; <Vastaus>");
    var question = content.substring(
        content.lastIndexOf("addfaq ") + 7, 
        content.lastIndexOf(";")
    );
    var answer = content.substring(content.indexOf(";"));
    answer = answer.substring(1);
    answer = answer.trim();

    var json = Utils.qaToJson(question, answer);
    Index.setQuestions(message,json);
    message.reply("Uusi kysymys lisätty!");
}

exports.remove = function(message, guildConf) {
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

    if(args.length === 0 || !Utils.isNum(args[0])) return message.reply("`Komennon käyttö:` " + guildConf.prefix + " removefaq <ID>");
    var questions = guildConf.questions;
    var i = 0;
    var index = -1;
    questions.forEach(element => {
        if(i.toString() === args[0]){
            index = i; 
        }
        i++
    });
    if(index !== -1) questions.splice(parseInt(index), 1);
    else return message.reply("Kysymystä ID:llä \"" + args[0] + "\" ei löytynyt!")
    Index.resetQuestions(message, questions);
    message.reply("Kysymys ("+index+") poistettu!");
}

exports.all = function(message, guildConf) {
    var json = Utils.decodeMessage(message);

 // Check if user has permission to use this command
    if (!message.member.hasPermission("ADMINISTRATOR")){
        const adminRole = message.guild.roles.cache.find(role => role.name === guildConf.modRole);
        if(!adminRole) return message.reply("Roolia, jolla tämä komento voidaan suorittaa ei ole määritelty!");

        // Exit if the user is not admin
        if(!message.member.roles.cache.has(adminRole.id)) {
            return message.reply("Sinulla ei valitettavasti ole oikeuksia tähän komentoon!");
        }
    }

    message.reply("Tässä kaikki listatut kysymykset: ")
    if(guildConf.questions.length === 0) return message.channel.send("Lista on vielä toistaiseksi tyhjä!");
    var i = 0;
    var s = "";
    guildConf.questions.forEach(element => {
        question = element.question;
        answer = element.answer;
        s = s + "`ID:` " + i + " `Kysymys:` " + question + " `Vastaus:` " + answer + "\n";
        i++;
    });
    message.channel.send(s);
}