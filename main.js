//Dépendances

const low = require("lowdb")
const FileSync = require("lowdb/adapters/FileSync")
const express = require('express');
const app = express();
const Discord = require("discord.js");

const adapter = new FileSync('database.json');
const shopadapter = new FileSync('shop.json');
const db = low(adapter);
const shopdb = low(shopadapter);

//DataBase
db.defaults({ histoires: [], xp: [], cols: [], inventory: [], level: []})
  .write();

//DEBUT PARAMETRES HEROKU
app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), function(){
  console.log(`Bot en fonctionnement sur le port ${app.get('port')}`);
})



var bot = new Discord.Client();
var prefix = ("/");
var randnum = 0;

var story_number = db.get('histoires').size().value();

bot.on('ready', () => {
    bot.user.setPresence({ game: { name: '/help for Cardinal user command', type: 0}});
  console.log("Bot Ready !");
});

bot.login('NDgwMzg2ODY5ODY4MTAxNjMy.DmBcrQ.UGJsO7E9sguIWOWmn5xVyAkx2Uo');

bot.on('message', message => {

  var msg_author = message.author.id;
  var msg_author_username = message.author.username
  if (message.author.bot)return;

  //XP for LEVEL
  if(!db.get("xp").find({user: msg_author}).value()){
    db.get("xp").push({user: msg_author, xp: 1, username: msg_author_username}).write();
  }else{
    let userxpdb = db.get("xp").filter({user: msg_author}).find('xp').value();
    let userxp = Object.values(userxpdb)
    console.log(message.author.username + ":")
    console.log(`Nombre d'xp : ${userxp[1]}`) 

    db.get("xp").find({user: msg_author}).assign({user: msg_author, xp: userxp[1] += 1}).write();
  }

  //COLS for ACHAT
  if(!db.get("cols").find({user: msg_author}).value()){
    db.get("cols").push({user: msg_author, cols: 1, username: msg_author_username}).write();
  }else{
    let usercolsdb = db.get("cols").filter({user: msg_author}).find('cols').value();
    let usercols = Object.values(usercolsdb)
    console.log(`Nombre de Cols : ${usercols[1]}`) 

    db.get("cols").find({user: msg_author}).assign({user: msg_author, cols: usercols[1] += 1}).write();
  }
 

  if(!db.get("inventory").find({user: msg_author}).value()){
    db.get("inventory").push({user: msg_author, items: "Vide", username: msg_author_username}).write();
  }

  if(!db.get("level").find({user: msg_author}).value()){
    db.get("level").push({level: "0", xp_level: "0", user: msg_author, username: msg_author_username}).write(); 
  }

  //Level BotRP
  let leveldb = db.get("level").filter({user: msg_author}).find("level").value();
  let level = Object.values(leveldb);
  let userxpdb = db.get("xp").filter({user: msg_author}).find('xp').value();
  let userxp = Object.values(userxpdb);
  /*let statut_lvldb = db.get("level").filter({user: msg_author}).find("statut").value();
  let statut_lvl = Object.values(statut_lvldb);*/
  
var ab_level = new Array();
ab_level[0] =  new Array(0, "1", "1", "1", "1")
ab_level[1] =  new Array(1, "30", "1000", "50", "15")
ab_level[2] =  new Array(2, "60", "1090", "51", "15")
ab_level[3] =  new Array(3, "90", "1180", "52", "15")
ab_level[4] =  new Array(4, "130", "1270", "53", "15")
ab_level[5] =  new Array(5, "170", "1360", "54", "15")
ab_level[6] =  new Array(6, "220", "1450", "55", "16")
ab_level[7] =  new Array(7, "270", "1540", "56", "16")
ab_level[8] =  new Array(8, "330", "1630", "57", "16")
ab_level[9] =  new Array(9, "390", "1720", "58", "16")
ab_level[10] =  new Array(10, "490", "1810", "59", "16")
ab_level[11] =  new Array(11, "570", "1900", "60", "17")
ab_level[12] =  new Array(12, "650", "1990", "61", "17")
ab_level[13] =  new Array(13, "740", "2080", "62", "17")
ab_level[14] =  new Array(14, "830", "2170", "63", "17")
ab_level[15] =  new Array(15, "930", "2260", "64", "17")
ab_level[16] =  new Array(16, "1030", "2350", "65", "18")
ab_level[17] =  new Array(17, "1140", "2350", "66", "18")
ab_level[18] =  new Array(18, "1250", "2440", "67", "18")
ab_level[19] =  new Array(19, "1370", "2620", "68", "18")
ab_level[20] =  new Array(20, "1570", "2710", "69", "18")

function tab_LVL() {
  for(i = 2; i < 19; i++){
    if (level[0] + 1 == ab_level[i][0]){
  return ab_level[i][0];
}}}


function tab_LVL1() {
  for(i = 2; i < 19; i++){
    if (level[0] + 2 == ab_level[i][0]){
  return ab_level[i][0];
}}}

for(i = 2; i < 19; i++){
  if (level[0] + 1 == ab_level[i][0]){
var val_LVL = tab_LVL()
var lvl = ab_level[val_LVL][1]
var val_LVL1 = tab_LVL1()
var lvl1 = ab_level[val_LVL1][1]
 if (userxp[1] >= lvl && userxp[1] < lvl1){
   console.log(i)
  if (level[0] == i - 2){
   db.get("level").shift({user: msg_author, level: i - 1}).write();
   db.get("level").push({level: i - 1, xp_level: i - 1, user: msg_author, username: msg_author_username}).write();
   let lvlup_embed = new Discord.RichEmbed()
    .addField("__**Level UP !**__", `Félicitations ${message.author},  vous êtes maintenant niveau` + " " + (i - 1) + "!")
    .setImage("https://cdn.discordapp.com/attachments/484688567973707778/485476520291467267/SAO_Congratulations-levelup.png")
    message.channel.sendEmbed(lvlup_embed);
        }
    }
  }}

if (userxp[1] >= 30 && userxp[1] < 60){
    if (level[0] == 0){
    db.get("level").shift({user: msg_author, level: "0"}).write();
    db.get("level").push({level: 1, xp_level: 1, user: msg_author, username: msg_author_username}).write();
    let lvlup_embed = new Discord.RichEmbed()
    .addField("__**Level UP !**__", `Félicitations ${message.author},  vous êtes maintenant niveau` + " 1 !")
    .setImage("https://cdn.discordapp.com/attachments/484688567973707778/485476520291467267/SAO_Congratulations-levelup.png")
    message.channel.sendEmbed(lvlup_embed);
    }}

    

//PingPong
if (message.content === "/ping"){
    message.reply("Pong !");
    console.log('PingPong');
  }


    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()){

//Créer une nouvelle histoire
      case "newstory":
      var value = message.content.substr(10);
      var author = message.author.toString();
      var pauthor = message.author;
      //var number = db.get('histoire').map('id').value();
      console.log("Nouvelle histoire de", pauthor);
      message.reply("Ajout de l'histoire à la base de donnée.");

      db.get('histoires')
        .push({ story_value: value, story_author: author, username: msg_author_username})
        .write();

      break;


//Lire une histoire      
      case "tellstory":

      story_random();
      console.log(randnum);

      var story = db.get(`histoires[${randnum}].story_value`).toString().value();
      var author_story = db.get(`histoires[${randnum}].story_author`).toString().value();
      console.log(story);

      message.channel.send(`Voici l'histoire : ${story} (Histoire de ${author_story})`)

      break;

//Afficher le shop
      case "shop":
      var shop_embed = new Discord.RichEmbed()
        .setTitle("__**LinkStart Shop:\n```Monnaie utilisé: le Col```**__")
        .setDescription("*Bienvenue à toi voyageur ! Tu trouveras ici des items et des badges à acheter !*")
        .addField("__**Items**:__", "**Élucidator**: [5000 Cols] {ID: 01} Description: Une des épées de Kirito.\n**Tenue ténèbreuse**: [1000 Cols] {ID: 02} Description: Possède un look ténébreux stylé.")
        .setColor ("#00FF")
      message.channel.send({embed: shop_embed});

      break;

//Acheter dans le shop      
      case "buyitem":

      var useritem = db.get("inventory").filter({user:  msg_author}).find("items").value();
      var itemsdb = Object.values(useritem);
      let usercolsdb = db.get("cols").filter({user: msg_author}).find('cols').value();
      let usercols = Object.values(usercolsdb)
        var itembuying = message.content.substr(9);
        if (!itembuying){
            itembuying = "Indeterminé"
            message.reply("ID introuvable.")
        }else{
          console.log(`ShopLog: Demande d'achat d'item ${itembuying}`)
          if (shopdb.get("shop_items").find({itemID: itembuying}).value()){
            console.log("Item trouvé!")
            var info = shopdb.get("shop_items").filter({itemID: itembuying}).find("name", "desc").value();
            var iteminfo = Object.values(info);
            console.log(iteminfo);
            if(usercols[1] >= iteminfo[3]){
              message.reply(`***Information: Votre achat (${iteminfo[1]}) a bien été effectué. Retrait de (${iteminfo[3]}) Cols.***`)
              if(!db.get("inventory").filter({user: msg_author}).find({items: "Vide"}).value()){
                console.log("Inventaire pas vide.")
                db.get("cols").filter({user: msg_author}).find("cols").assign({user : msg_author, cols: usercols[1] -= iteminfo[3]}).write();
                db.get("inventory").filter({user: msg_author}).find("items").assign({user: msg_author, items: itemsdb[1] + " , " + iteminfo[1]}).write();
                let buy_embed = new Discord.RichEmbed()
                .setTitle("LinkStart Shop - Ticket de Caisse")
                .setDescription("Ceci est une facture d'achat ! Merci de votre achat !")  
                .addField("Infos", `*ID:* ***${iteminfo[0]}***\n*Nom:* ***${iteminfo[1]}***\n*Description:* ***${iteminfo[2]}***\n*Price:* ***${iteminfo[3]}***`)
              message.author.send({embed: buy_embed});
              }else{
                console.log("Inventaire vide.")
                db.get("cols").filter({user: msg_author}).find("cols").assign({user: msg_author, cols: usercols[1] -= iteminfo[3]}).write();
                db.get("inventory").filter({user: msg_author}).find("items").assign({user: msg_author, items: iteminfo[1]}).write();
                let buy_embed = new Discord.RichEmbed()
                .setTitle("LinkStart Shop - Ticket de Caisse")
                .setDescription("Ceci est une facture d'achat ! Merci de votre achat !")  
                .addField("Infos", `*ID:* ***${iteminfo[0]}***\n*Nom:* ***${iteminfo[1]}***\n*Description:* ***${iteminfo[2]}***\n*Price:* ***${iteminfo[3]}***`)
              message.author.send({embed: buy_embed});
              }
            }else{
              message.reply("Erreur ! Tu es trop pauvre !");

            }
          }

        }

      break;

      case "inventory":
      let inventorydb_i = db.get("inventory").filter({user: msg_author}).find("items").value();
      let inventory_i = Object.values(inventorydb_i)
      if (!db.get("inventory").filter({user: msg_author}).find({items: "Vide"}).value()){
        let inventory_embed = new Discord.RichEmbed()
          .addField(`__**Inventaire de ${message.author.username}**__`, `\`\`\`${inventory_i[1]}\`\`\``)
      message.channel.sendEmbed(inventory_embed);
    }else{
      let inventory_embed = new Discord.RichEmbed()
          .addField(`__**Inventaire de ${message.author.username}**__`, "```Inventaire vide```")
      message.channel.sendEmbed(inventory_embed);
    }
      break;

//Afficher les stats
     /* case "stats":
      let inventorydb = db.get("inventory").filter({user: msg_author}).find("items").value();
      let inventory = Object.values(inventorydb)
      let userxpdb = db.get("xp").filter({user: msg_author}).find("xp").value();
      let userxp = Object.values(userxpdb);
      var usercreatedate = message.author.createdAt.toString().split(' ');
      
        var stats_embed = new Discord.RichEmbed()
          .setTitle(`Stats utilisateurs: ${message.author.username}`)
          .addField("XP", `${userxp[1]} XP`)
          .addField("Inventaire", inventory[1])
          //.addField("level", `${level[1]}`)
          .addField("Date de création de l'utilisateur", usercreatedate[1] + ' ' + usercreatedate[2] + ', ' + usercreatedate[3])
          .setThumbnail(message.author.avatarURL)

      message.channel.sendEmbed(stats_embed);
        
      break;*/

//Afficher les paliers      
     /* case "palier":
        var palier_embed = new Discord.RichEmbed()
          .setTitle("__***Liste des paliers:***__")
          .addField("Palier:", "```Palier 1: Novice\nPalier 2: Débutant \nPalier 3: Amateur\nPalier 4: Initié\nPalier 5: L'élève\nPalier 6: Le bleu\nPalier 7: Le mouton\nPalier 8: Le maladroit\nPalier 9: Chasseur de noob\nPalier 10: L'apprenti épéiste\nPalier 11: La victime\nPalier 12: Lèche-bottes\nPalier 13: Bouche-trou\nPalier 14: Pot de colle\nPalier 15: L'épéiste prometteur\nPalier 16: Idoles des jeunes\nPalier 17: L'ami de tous\nPalier 18: L'habitué de la VRMMO\nPalier 19: L'épée émoussé\nPalier 20: L'épéiste de petite renommé\nPalier 21: Le surdoué\nPalier 22: Le maître\nPalier 23: Joueur solo\nPalier 24: Chef de raid \nPalier 25: Bêta-testeur```")
          .setImage("https://www.nautiljon.com/images/univers/00/41/sword_art_online_aincrad_14.jpg?1516098934")
      message.channel.sendEmbed(palier_embed);

      break;*/

    }

//Ajouter de l'XP
let y = parseInt(message.content.substr(7))
if (message.content === prefix + "addxp" + " " + y){
  let userxpdb = db.get("xp").filter({user: msg_author}).find('xp').value();
  let userxp = Object.values(userxpdb)
  db.get("xp").find({user: msg_author}).assign({user: msg_author, xp: userxp[1] += y}).write();
console.log("+" + y)
message.reply("tu t'es bien ajouté" + " " + y + " " + "XP!")
}

//Enlever de l'XP
 let x = parseInt(message.content.substr(10))
    if (message.content === prefix + "removexp" + " " + x){
      let userxpdb = db.get("xp").filter({user: msg_author}).find('xp').value();
      let userxp = Object.values(userxpdb)
      db.get("xp").find({user: msg_author}).assign({user: msg_author, xp: userxp[1] -= x}).write();
    console.log("-" + x)
    message.reply("tu t'es bien enlevé" + " " + x + " " + "XP!")
  }
  
//Ajouter des Cols
let c = parseInt(message.content.substr(9))
if (message.content === prefix + "addcols" + " " + c){
  let usercolsdb = db.get("cols").filter({user: msg_author}).find('cols').value();
  let usercols = Object.values(usercolsdb)
  db.get("cols").find({user: msg_author}).assign({user: msg_author, cols: usercols[1] += c}).write();
console.log("+" + c)
message.reply("tu t'es bien ajouté" + " " + c + " " + "Cols!")
}

//Enlever des Cols
 let d = parseInt(message.content.substr(12))
    if (message.content === prefix + "removecols" + " " + d){
      let usercolsdb = db.get("cols").filter({user: msg_author}).find('cols').value();
      let usercols = Object.values(usercolsdb)
      db.get("cols").find({user: msg_author}).assign({user: msg_author, cols: usercols[1] -= d}).write();
    console.log("-" + d)
    message.reply("tu t'es bien enlevé" + " " + d + " " + "Cols!")
  }


//Afficher les commandes
    if (message.content === prefix + "help"){
      var help_embed = new Discord.RichEmbed()
          .setColor('#FF0000')
          .addField("Commandes affichage", "```-/help : Affiche les commandes du bot\n-/shop : Affiche la liste des items disponible!\n-/player stats : Affiche les statistiques du joueur !\n-/inventory : Affiche l'inventaire du joueur !```")
          .addField("Interaction", "```-/buyitem [ID] : Permet d'effectuer un achat si vous avez les crédits nécéssaires!\n-/addxp : Permet de s'ajouter de l'XP !\n-/removexp : Permet de s'enlever de l'XP !\n-/addcols : Permet de s'ajouter des Cols !\n-/removecols : Permet de s'enlever des Cols !```")
          .setDescription("__***Ceci est la liste des commandes utilisateurs :***__")
      message.channel.sendEmbed(help_embed);
    //message.channel.sendMessage("Voici les commandes du bot : \n /help pour afficher les commandes");
    console.log("Commande Help demandée !");
  }

  
//Afficher l'XP
/*if (message.content === prefix + "xp"){
  var xp = db.get("xp").filter({user: msg_author}).find('xp').value()
  var xpfinal = Object.values(xp);
  var xp_embed = new Discord.RichEmbed()
    .setDescription(`${message.author}, voici l'expérience que tu possèdes !`)
    .setTitle(`Nombre d'XP de ${message.author.username}`)
    .addField("XP :", `${xpfinal[1]} xp`)
  message.channel.send({embed: xp_embed});
}*/

//Bot RP

if (!message.content.startsWith(prefix)) return;
var args = message.content.substring(prefix.length).split(" ");

switch (args[0].toLowerCase()){

  case "mob":
    message.channel.send("**Un monstre apparait.**")
  break;


  case "inscription":
  let role_ID = "484347893940224011"
    if(message.member.roles.has(role_ID)) {
      console.log(`tu est déjà inscrit !`);
      message.reply(`tu est déjà inscrit !`);
    } else {
      let role = message.guild.roles.find("name", "Joueur de SAO");
      let member = message.member;
      member.addRole(role).catch(console.error);
      let insc_embed = new Discord.RichEmbed()
        .setColor('#FF0000')
        .addField("Inscription:", `\`\`\`•Language: French\n•Server: Exodyas & NerveGear.fr\n•Log In:\n         : account\n              ${message.author.username}\n         : password\n              [ * * * * * \*\ ]\n \n[Connexion en cours...]\`\`\``)
        .setImage("https://media.discordapp.net/attachments/335414781492199427/484407944935505931/ExcellentTightBilby.gif")
      message.channel.sendEmbed(insc_embed);
    }

  break;

  case "embed":
    let temp_embed = new Discord.RichEmbed()
      .setColor("#FFFFFF")
      .setTitle("__**Bienvenue à toi !**__")

    message.channel.sendEmbed(temp_embed);
  break;

  case "del":
  message.delete()
   .then(msg => console.log(`Deleted message from ${msg.author.username}`))
   .catch(console.error);
  break;

  //Afficher les stats
  case "stats":
  var usercreatedate = message.author.createdAt.toString().split(' ');
  
    var stats_embed = new Discord.RichEmbed()
      .setTitle(`Stats utilisateurs: ${message.author.username}`)
      .addField("Date de création de l'utilisateur", usercreatedate[1] + ' ' + usercreatedate[2] + ', ' + usercreatedate[3])
      .setThumbnail(message.author.avatarURL)

  message.channel.sendEmbed(stats_embed);
    
  break;

  case "playerstats":
  let userxpdb = db.get("xp").filter({user: msg_author}).find("xp").value();
  let userxp = Object.values(userxpdb);
  let leveldb = db.get("level").filter({user: msg_author}).find("level").value();
  let level = Object.values(leveldb);
  let usercolsdb = db.get("cols").filter({user: msg_author}).find('cols').value();
  let usercols = Object.values(usercolsdb)

//HP:
  function tab_HP() {
    for(i = 0; i < 21; i++){
      if (level[0] == ab_level[i][0]){
    return ab_level[i][0];
  }}}
  var val_HP = tab_HP()
  var hp = ab_level[val_HP][2]

//ATK:
function tab_ATK() {
  for(i = 0; i < 21; i++){
    if (level[0] == ab_level[i][0]){
  return ab_level[i][0];
}}}
var val_ATK = tab_ATK()
var atk = ab_level[val_ATK][3]

//DEF:
function tab_DEF() {
  for(i = 0; i < 21; i++){
    if (level[0] == ab_level[i][0]){
  return ab_level[i][0];
}}}
var val_DEF = tab_DEF()
var def = ab_level[val_DEF][4]

    var stats_embed = new Discord.RichEmbed()
      .addField(`Stats du joueurs ${message.author.username}`,`\`\`\`Tu es au level ${level[0]}!\n${userxp[1]} XP\n${usercols[1]} Cols\n${hp} HP\n${atk} ATK\n${def} DEF\`\`\``)

      .setThumbnail(message.author.avatarURL)

  message.channel.sendEmbed(stats_embed);
    
  break;

}



});

function story_random(min, max){
  min = Math.ceil(0);
  max = Math.floor(story_number);
  randnum = Math.floor(Math.random() * story_number);
}

function random(min, max){
  min = Math.ceil(1);
  max = Math.floor(3);
  randnum = Math.floor(Math.random() * (max - min + 1) + min);
}

 


/*   for(var j = 0; j < level[0]; j++){
        min *= coeff;
    }
    
    for(var j = 0; j < (level[0] + 1); j++){
        max *= coeff;
    }
    
    if (userxp[1] >= min && userxp[1] < max){
        if (level[0] == i){
            db.get("level").shift({user: msg_author, level: i}).write();
            db.get("level").push({level: i + 1, xp_level: i + 1, user: msg_author, username: msg_author_username}).write();
          let lvlup_embed = new Discord.RichEmbed()
            .addField("Level UP! :arrow_up:️", `Félicitations ${message.author},  vous êtes maintenant niveau` + " " + (i + 1) + "!")
            .setImage("https://cdn.discordapp.com/attachments/484688567973707778/485476520291467267/SAO_Congratulations-levelup.png")
            message.channel.sendEmbed(lvlup_embed);
        }
    }
}*/