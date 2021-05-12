exports.help = function(message, guildConf){
    message.reply("Tässä kaikki käytettävissäsi olevat komennot!");
    var p = guildConf.prefix;
    message.channel.send("`" + p + " faq`: Linkki usein kysyttyihin kysymyksiin \n"
    + "`" + p + " rules`: Linkki sääntöihin \n"
    + "`" + p + " help`: Lähettää tämän viestin");


    if (!message.member.hasPermission("ADMINISTRATOR")){        
        // Check if adminrole has been set
        const adminRole = message.guild.roles.cache.find(role => role.name === guildConf.modRole);
        if(!adminRole) return;
        // Exit if the user is not admin
        if(!message.member.roles.cache.has(adminRole.id)) return;   
    }

    message.channel.send("`" + p + " settings`: Näytä botin tämänhetkiset asetukset \n"
    + "`" + p + " setfaq <LINKKI>`: Muokkaa linkkiä usein kysyttyihin kysymyksiin \n"
    + "`" + p + " setrules <LINKKI>`: Muokkaa linkkiä sääntöihin \n"
    + "`" + p + " setprefix <PREFIX>`: Muokkaa botin prefixiä \n"
    + "`" + p + " setchannel`: Asettaa kanavan, jolle tämä viesti lähetetään botin kuuntelemaksi kanavaksi (Komennot toimivat edelleen kaikilla kanavilla) \n"
    + "`" + p + " addfaq <KYSYMYS>; <VASTAUS>`: Luo uuden usein kysytyn kysymyksen, jota botti vertaa pelaajan lähettämiin kysymyksiin \n"
    + "`" + p + " allfaq`: Listaa kaikki botin varastoimat kysymykset, niiden vastaukset ja kysymyksen ID:n \n"
    + "`" + p + " removefaq <ID>`: Poista kysymys \n" 
    + "`" + p + " matchpercentage <PROSENTTI>`: Kynnys jolla botti tunnistaa pelaajan viestin kysymykseksi. Luku prosentteina desimaalimuodossa (esim. 0.8) \n" 
    + "`" + p + " modrole <@ROOLIMAININTA>`: Asettaa roolin jolla on oikeudet kaikkiin komentoihin \n" 
    + "`" + p + " reset`: Nollaa kaikki botin asetukset oletusarvoisiksi \n\n"
    + "Mikäli havaitsit ongelman botin toiminnassa, ilmoitathan siitä githubissa!");
}