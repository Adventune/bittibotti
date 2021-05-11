# BittiBotti
Botti Bitti2021 leiriä varten

## Käyttäminen
1. Lisää botti palvelimellesi
2. Aseta seuraavat asetukset [botin komennoilla](https://github.com/vil-mu/bittibotti/blob/main/README.md#komennot)

    a. Aseta botin kuuntelema kanava  
    b. Aseta rooli jolla on oikeudet botin komentoihin*  
    c. Aseta kysymyksiä ja niille vastauksia  
    d. Aseta FAQ linkki  
    
    *Ei pakollinen. Komentoja pystyy käyttämään myös järjestelmänvalvojana
3. Anna botin vastata automaattisesti määrittämiisi kysymyksiin

## Komennot

`faq`: Lähettää vastauksena FAQ linkin `Syntaksi`: faq

`help`: Lähettää vastauksena komennot ja niiden syntaksit `Syntaksi`: help

## Moderaattorin komennot

`setprefix`: Asettaa botin prefixin `Syntaksi`: setprefix <PREFIX>

`setfaqlink`: Asetta FAQ linkin `Syntaksi`: setfaqlink <LINKKI>

`setchannel`: Asettaa kanavan jolla komento suoritetaan botin kuuntelemaksi kanavaksi `Syntaksi`: setchannel

`addfaq`: Luo uuden kysymyksen, jota botti voi verrata käyttäjän esittämään kysymykseen* `Syntaksi`: addfaq <KYSYMYS>; <VASTAUS>

`allfaq`: Lähettää vastauksena listan kaikista kysymyksistä ja vastauksista, sekä niiden ID:t** `Syntaksi`: allfaq

`removefaq`: Poistaa kysymyksistä kysymyksen, jonka ID komennossa on määritetty** `Syntaksi`: removefaq <ID>

`matchpercentage`: Asettaa suodatinkynnyksen*** `Syntaksi`: matchpercentage <PROSENTTI_DESIMAALINA>

`modrole`: Asettaa roolin, jolla on oikeudet botin komentoihin `Syntaksi`: modrole <@ROOLIMAININTA>

`reset`: Asettaa botin asetukset oletusarvoihin**** `Syntaksi`: reset

`settings`: Lähettää vastauksena botin tämänhetkiset asetukset `Syntaksi`: settings

\* : esim. `.b addfaq Milloin Bitti avataan?; Bitti pyritään avaamaan kesäkuun alussa!`. Käyttäjän kysymyksestä poistetaan aina isot kirjaimet ja erikoisemerkit ja sitä verrataan kysymyksiin varastoituihin kysymyksiin joille on tehty verrattaessa vastaava käsittely. Esim. kysymys `Milloin bitti avataan?` muuttuu verrattaessa `milloin bitti avataan` (varastoidun kysymyksen muoto ei muutu käsitellessä ja botti käyttää viesteissään aina käsittelemättömiä kysymyksiä);

** : ID ei ole ennalta määrätty ja voi muuttua esimerkiksi kun jokin kysymys poistetaan. ID noudattaa aina lukujonoa `0,1,2,3...n`. ID:n saa selville komennolla `allfaq`. Jos poistat useampia kysymyksiä kerralla, on suositeltavaa aina välissä tarkistaa seuraavan poistettavan kysymyksen ID

*** : Suodatinkynnys on arvo desimaalimuotoisena prosenttina (`0-1` esim. `0.1, 0.5, 0.87, 1`), joka määrittää kuinka tarkasti viestin pitää olla täsmälleen sama kuin kysymyksiin ja vastauksiin on määritelty. Jos suodatinkynnys on `1`, täytyy viestin olla käsiteltynä (käsittely mainittu kohdassa *) tismalleen samanlainen kuin varastoitu kysymys käsiteltynä. Suodatinkynnyksen oletusarvo on `0.8` jolloin esimerkiksi botti tunnistaa kysymyksen `millon Bitti avtaan???!!!!` (muuttuu `millon bitti avataan` käsitellessä) varastoiduksi kysymykseksi `Milloin bitti avataan`.

**** : Tämä komento vaatii suorittajalta vahvistuksen kolmenkymmenen sekunnin sisään ja ilman vahvistusta komento perutaan