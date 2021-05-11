const config = require("./config.json"); 
const Discord = require("discord.js");
const client = new Discord.Client();
const Enmap = require('enmap');
const Utils = require('./scripts/Utils');
const FAQLink = require('./commands/faqlink');
const Prefix = require('./commands/prefix');
const Channel = require('./commands/channel');
const Question = require('./commands/question');
const Help = require('./commands/help');
const Misc = require('./commands/misc');

client.settings = new Enmap({
    name: "settings",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep'
});
  
const defaultSettings = {	
    prefix: ".b",	
    modRole: "",
    listenedChannel: "",
    matchpercentage: "0.8",
    faqLink: "",
    questions: []
}
  
client.on("guildDelete", guild => {
    // Removing an element uses `delete(key)`
    client.settings.delete(guild.id);
});


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async message => {
    if(!message.guild || message.author.bot) return;

    client.settings.ensure(message.guild.id, defaultSettings);
    const guildConf = client.settings.get(message.guild.id);

    var json = Utils.decodeMessage(message);
    var prefix = json.prefix;
    var cmd = json.cmd.toLowerCase();

    if(prefix== guildConf.prefix){
        switch(cmd){
            // .b setfaqlink <faq_link>
            case 'setprefix':
                Prefix.setprefix(message, guildConf);
                break;

            // .b faq
            case 'faq':
                FAQLink.getfaqlink(message, guildConf);
                break;
            
            // .b setfaqlink <faq_link>
            case 'setfaqlink':
                FAQLink.setfaqlink(message, guildConf);
                break;

            // .b setchannel 
            case 'setchannel':
                Channel.setchannel(message, guildConf);
                break;

            // .b addfaq 
            case 'addfaq':
                Question.add(message, guildConf);
                break;

            // .b allfaq 
            case 'allfaq':
                Question.all(message, guildConf);
                break;
            
            // .b removefaq 
            case 'removefaq':
                Question.remove(message, guildConf);
                break;

            // .b help 
            case 'help':
                Help.help(message, guildConf);
                break;

            // .b matchpercentage 
            case 'matchpercentage':
                Misc.match(message, guildConf);
                break;

            // .b modrole 
            case 'modrole':
                Misc.modrole(message, guildConf);
                break;

            // .b reset 
            case 'reset':
                Misc.reset(message, guildConf);
                break;
            
            // .b settings 
            case 'settings':
                Misc.currentsettings(client, message, guildConf);
                break;

            default:
                message.reply("En valitettavasti lyötänyt komentoa \"`" + cmd + "`\". Jos tarvitset apua käytä komentoa `" + guildConf.prefix + " help`!")
                break;

        }
    } else {
        if(message.channel.id !== guildConf.listenedChannel) return;
        if(guildConf.questions.length === 0) return;

        for(var i = 0; i < guildConf.questions.length; i++){
            var question = guildConf.questions[i].question;
            var asked = message.content;

            var parsedAsked = Utils.parseQuestion(asked);
            var parsedQuestion = Utils.parseQuestion(question);

            if(Utils.similarity(parsedQuestion, parsedAsked) > guildConf.matchpercentage){
                message.react('❌');
                var msgvar1;
                var msgvar2;
                var msgvar3;

                var answer = guildConf.questions[i].answer;
                msgvar1 = await message.reply("Hei! Ellen ole erehtynyt, havaitsin viestissäsi usein kysytyn kysymyksen Bittiin liittyen! \n"
                + "Viestisi: `" + asked + "` \n"
                + "Kysymys jonka havaitsin viestissäsi: `" + question + "`\n"
                + "Tässä vastaus jonka uskon vastaavan kysymykseesi: `" + answer + "`");
                if(guildConf.faqLink !== "") msgvar2 = await message.channel.send("Tässä myös linkki usein kysyttyjen kysymysten sivulle: <"+ guildConf.faqLink + ">");
                msgvar3 = await message.channel.send("Eikö minusta ollut apua? Lisäsin reaktion viestiisi! Jos painat reaktiota poistan vastaukseni ja jätän vastuun oikealle ihmiselle!");
                return;
            }


            // First argument is a filter function
            message.awaitReactions((reaction, user) => user.id == message.author.id && (reaction.emoji.name == '❌'),
            { max: 1, time: 30000 }).then(collected => {
                    if (collected.first().emoji.name == '❌') {
                        message.reply('Kurjaa, että minusta ei ollut hyötyä! \nJoku jolla on mahdollisuus järjelliseen ajatteluun auttaa sinua pian!');
                        if(msgvar1 !== undefined) msgvar1.delete();
                        if(msgvar2 !== undefined) msgvar2.delete();
                        if(msgvar3 !== undefined) msgvar3.delete();

                        return;
                    } else return;
            }).catch(() => { return });
        }
    }
});

exports.setSettings = function(message, key, value){
    if(!client.settings.has(message.guild.id, key)) {
        return message.reply("Error [#bb0001]! Contact the developer.");
      }

      client.settings.set(message.guild.id, value, key);
}

exports.setQuestions = function(message, json){
    var questions = client.settings.get(message.guild.id, "questions");
    questions.push(json);
    client.settings.set(message.guild.id, questions, "questions");
}

exports.resetQuestions = function(message, questions){
    client.settings.set(message.guild.id, questions, "questions");
}

exports.reset = function(message){
    // Removing an element uses `delete(key)`
    client.settings.delete(message.guild.id);
}

client.login(config.token);