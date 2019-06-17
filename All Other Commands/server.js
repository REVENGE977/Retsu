const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const client = new Discord.Client({disableEveryone: true});
const configp = require("./config.json");
var prefix = configp.prefix;
const figlet = require('figlet');
const members = JSON.parse(fs.readFileSync("./Data/members.json"))
const onoffmembers = JSON.parse(fs.readFileSync("./Data/onoffmembers.json"))
const emojiss = require("node-emoji");
let rab6 = JSON.parse(fs.readFileSync('./Data/rab6.json' , 'utf8'));
let ar = JSON.parse(fs.readFileSync(`./Data/AutoRole.json`, `utf8`))
const welcome = JSON.parse(fs.readFileSync('./Data/welcomer.json' , 'utf8'));
const pics = JSON.parse(fs.readFileSync('./Data/pics.json' , 'utf8'));
const antijoin = JSON.parse(fs.readFileSync('./Data/antijoin.json' , 'utf8'))
const log = JSON.parse(fs.readFileSync('./Data/log.json' , 'utf8'));
const points = JSON.parse(fs.readFileSync('./Data/points.json' , 'utf8'));
const warnings = JSON.parse(fs.readFileSync('./Data/warnings.json' , 'utf8'));
let spread = JSON.parse(fs.readFileSync('./Data/spread.json' , 'utf8'));
var print = console.log;


client.on('ready', () => {

  print(`Logged in as ${client.user.tag}!`);
  print('')
  print('')
  print('╔[═════════════════════════════════════════════════════════════════]╗')
  print(`[Start] ${new Date()}`);
  print('╚[═════════════════════════════════════════════════════════════════]╝')
  print('')
  print('╔[═════════════════════════════════════]╗');
  print(`Logged in as * [ " ${client.user.username} " ]`);
  print('')
  print(`Informations About ${client.user.username}:`)
  print('')
  print(`Servers! [ " ${client.guilds.size} " ]`);
  print(`Users! [ " ${client.users.size} " ]`);
  print(`Channels! [ " ${client.channels.size} " ]`);
  print(`Arch! [ " ${process.arch} " ]`);
  print(`Platform! [ " ${process.platform} " ]`);
  print(`Node Version! [ " ${process.version}" ]`);
  print(`Prefix! [ " ${prefix}" ]`);
  print(`Language! [ " NodeJS " ]`);
  print(`Ram Usage! [ " ${(process.memoryUsage().rss / 1048576).toFixed()}MB " ]`);
  print('╚[════════════════════════════════════]╝')
  print('')
  print('╔[════════════]╗')
  print(`${client.user.username} Is Online`)
  print('╚[════════════]╝')
  print('')
  print('╔[════════════]╗')
  print('Created By: Revenge')
  print('╚[════════════]╝')
    client.user.setGame("$help | The bot is under development", "https://www.twitch.tv/retsu");

});

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://retsu.glitch.me/`);
}, 280000);

client.on('message', msg => {
  if (msg.content === `${prefix}ownerbot`) {
    msg.reply(`**@! ℛx | REVENGE ♛#2310 **`);
  }
});


var temp = JSON.parse(fs.readFileSync('./Data/temp.json' , 'utf8'));

client.on("message",(message) => {
    if (message.channel.type !== "text") return;
    if (!message.content.startsWith(prefix)) return;
        if(message.content.startsWith(prefix + "temp on")) {
            if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("** You Don't Have Permission `Manage channels` To Do This Command");
            temp[message.guild.id] = {
                work : true,
                channel : "Not Yet"
            };
            message.guild.createChannel("Click Here", 'voice').then(c => {
                c.setPosition(1);
                temp[message.guild.id].channel = c.id
                message.channel.send("** Done.**");
            });
        if(message.content.startsWith(prefix + "temp off")) {
            if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply("** You Don't Have Permission `Manage channels` To Do This Command");
        message.guild.channels.get(temp[message.guild.id]).delete();
            temp[message.guild.id] = {
                work : false,
                channel : "Not Yet"
            };
        message.channel.send("** Done.**");
    };
       fs.writeFile("./Data/temp.json", JSON.stringify(temp) ,(err) =>{
          if (err) print(err.message);
      });
}})
client.on("voiceStateUpdate", (o,n) => {
    if (!temp[n.guild.id]) return;
    if (temp[n.guild.id].work == false) return;
    if (n.voiceChannelID == temp[n.guild.id].channel) {
        n.guild.createChannel(n.user.username, 'voice').then(c => {
            n.setVoiceChannel(c);
            c.overwritePermissions(n.user.id, {
                CONNECT:true,
                SPEAK:true,
                MANAGE_CHANNEL:true,
                MUTE_MEMBERS:true,
                DEAFEN_MEMBERS:true,
                MOVE_MEMBERS:true,
                VIEW_CHANNEL:true  
            });
        })
    };
    if (!o.voiceChannel) return;
    if (o.voiceChannel.name == o.user.username) {
        o.voiceChannel.delete();
    };
           fs.writeFile("./Data/temp.json", JSON.stringify(temp) ,(err) =>{
          if (err) print(err.message);
      });
});

const hastebins = require('hastebin-gen');
client.on('message', message => {
    if(message.content.startsWith(prefix + 'discrim')) {
            var args = message.content.split(' ').slice(1).join(' ');
	    if(!args) return message.reply('Please Type The Discrim Tag')
}
      var array = [];
      var i = 0;
      if(args){
client.users.filter(u => u.discriminator == args).map(u => {
    if(i > 4){
     return;
    }
    i = i + 1;
 
   array.push(`${u.tag}`);
});
}
hastebins(`${array.slice(0, 30).join('\n')}`, 'txt').then(l => {
    message.channel.send(`${l}`);
}).catch(console.error);
});



client.on('message', message => {
  if(message.content == (prefix + 'role')) {
      if(!message.member.hasPermission('MANAGE_ROLES')) return
    let role = new Discord.RichEmbed()
  .setDescription(`
  Examples : 
  ${prefix}role @mention rolename : To give a role to a particular member
  ${prefix}role all rolename : To give role to all 
  ${prefix}role humans rolename : To give role to people only
  ${prefix}role bots rolename : To give role to bots only`)
  .setFooter('Requested by '+message.author.username, message.author.avatarURL)
message.channel.sendEmbed(role)
  }


if(message.content == (prefix + 'warn' || prefix + 'warning'))  {
    var  men  =  message.mentions.users.first();
    var  reason  =  message.content.split(' ').slice(2).join(' ');
    if(!message.member.hasPermission('MUTE_MEMBERS')) return message.channel.send('**Sorry But You Dont Have Permission** `MUTE_MEMBERS`' );
    if(!men)  return  message.channel.send(":x: | You Should Mention The Target")
    if(!reason)  return  message.channel.send(":x: | You Should Type The Reason")
  
let embed = new Discord.RichEmbed()
.setDescription(`**:warning: | ${men.tag} has been warned ! Reason: ${reason}**`)
    message.channel.sendEmbed(embed)
  if(!warnings[message.guild.id]) warnings[message.guild.id] = {}
    warnings[message.guild.id][men.id] = {
warnings: 0
    }
   warnings[message.guild.id][men.id].warnings ++ 
  save()
}
if(message.content.startsWith(prefix + 'warnings' || prefix + "warns"))  {
let ment = message.mentions.users.first()
if(!ment) message.channel.send(":x: | Mention the member to view the warnings !")


  if(ment) {
        if(!warnings[message.guild.id][ment.id]) warnings[message.guild.id][ment.id] = {
    warnings: 0
  }
    if(warnings[message.guild.id][ment.id].warnings === '0') return message.channel.send(":x: | This user has not warned never ! ")
let embed = new Discord.RichEmbed()
.setDescription(`<@${ment.id}> number of warnings: ${warnings[message.guild.id][ment.id].warnings}`)
message.channel.sendEmbed(embed)
  save()
  }

}



})
  


 client.on('message', message => {
    let args = message.content.split(' ').slice(1);
    if(message.content.startsWith(prefix + 'role')) {
        if(!message.member.hasPermission('MANAGE_ROLES')) return      message.channel.send('**You Dont Have Permission** `MANAGE_ROLES`' );
    let member = message.mentions.users.first();
    let role = args.join(' ').replace(member, '').replace(args[0], '').replace(' ', '');
    print(role);
    if(member) {
         if(role.startsWith('-')) {
           let roleRe = args.join(' ').replace(member, '').replace(args[0], '').replace('-', '').replace(' ', '');
           print(roleRe);

           let role1 = message.guild.roles.find(ch => ch.name.includes(roleRe))
           print(`hi`);
    const ee =new Discord.RichEmbed()
    .setDescription('**:x: I can’t find the role.**')
    .setFooter('Requested By '+message.author.username,message.author.avatarURL)
    if(!role1) return message.channel.send(ee);                message.guild.member(member).removeRole(role1.id);
    
                const e = new Discord.RichEmbed()
    
            .setDescription(':white_check_mark:** Changed Roles For **'+member+'**,** '+'**'+'-'+role1.name+'**')
           .setFooter('Requested By '+message.author.username,message.author.avatarURL)
           .setColor('BLACK')
            message.channel.send(e)
       } else if(!role.startsWith('-')) {
           let roleRe = args.join(' ').replace(member, '').replace(args[0], '').replace('-', '').replace(' ', '');
           let role1 = message.guild.roles.find(ch => ch.name.includes(roleRe))
    const ee =new Discord.RichEmbed()
    .setDescription('**:x: I can’t find the role.**')
    .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
    if(!role1) return message.channel.send(ee);                message.guild.member(member).addRole(role1);
           const e = new Discord.RichEmbed()
    
           .setDescription(':white_check_mark:** Changed Roles For **'+member+'**,** '+'**'+'+'+role1.name+'**')
           .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
           .setColor('BLACK')
            message.channel.send(e)
       } else {
           message.reply(`You Should Type The Role Name`);
       }
    }
    else if(args[0] == 'all') {
    if(role.startsWith('-')) {
    let roleRe = args.join(' ').replace(member, '').replace(args[0], '').replace('-', '').replace(' ', '');
    let role1 = message.guild.roles.find(ch => ch.name.includes(roleRe))
message.channel.send(`Please wait until the order is finished`).then(msg =>{
      message.guild.members.forEach(m => {
       message.guild.member(m).removeRole(role1.id);
    });
    msg.edit(`** :white_check_mark:   Done...\n**` +role1.name+`** Has Taken From __${message.guild.members.size}__ Member**`);
    });
    }
    if(role) {
    let role1 =  message.guild.roles.find(ch => ch.name.includes(role))
    if(!role1) return;
    message.channel.send(`Please wait until the order is finished`).then(msg =>{
    message.guild.members.forEach(m => {
       message.guild.member(m).addRole(role1);
    });
    msg.edit(`** :white_check_mark:   Done...\n**` +  role1.name+`** Has Given To __${message.guild.members.size}__ Members **`);
    });
    }
    } else if(args[0] == 'humans') {
    if(role.startsWith('-')) {
    let roleRe = args.join(' ').replace(member, '').replace(args[0], '').replace('-', '').replace(' ', '');
    let role1 = message.guild.roles.find(ch => ch.name.includes(roleRe))
message.channel.send(`Please wait until the order is finished`).then(msg =>{
      message.guild.members.forEach(m => {
       message.guild.member(m).removeRole(role1.id);
    });
    msg.edit(`** :white_check_mark:   Done...\n**` +role1.name+`** Has Taken From __${message.guild.members.size}__ Member**`);
    });
    }
    
    if(role) {
    let role1 =  message.guild.roles.find(ch => ch.name.includes(role))
    
    const ee =new Discord.RichEmbed()
    .setDescription('I Cann’t Find This Role')
    .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
    if(!role1) return message.channel.send(ee);
    message.channel.send(`Please wait until the order is finished`).then(msg =>{
       message.guild.members.filter(m =>m.user.bot == false).forEach(m => {
           message.guild.member(m).addRole(role1);
       });
    msg.edit(`** :white_check_mark:   Done...**`);
    });
    }
    } else if(args[0] == 'bots') {
    if(role.startsWith('-')) {
    let roleRe = args.join(' ').replace(member, '').replace(args[0], '').replace('-', '').replace(' ', '');
    let role1 = message.guild.roles.find(ch => ch.name.includes(roleRe))
message.channel.send(`Please wait until the order is finished`).then(msg =>{
      message.guild.members.forEach(m => {
       message.guild.member(m).removeRole(role1.id);
    });
    msg.edit(`** :white_check_mark:  Done...**`);
    });
    }
    if(role) {
    let role1 =  message.guild.roles.find(ch => ch.name.includes(role))
    const ee =new Discord.RichEmbed()
    .setDescription('I Cann’t Find This Role')
    .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
    if(!role1) return message.channel.send(ee);
    message.channel.send(`Please wait until the order is finished`).then(msg =>{
       message.guild.members.filter(m =>m.user.bot == true).forEach(m => {
           message.guild.member(m).addRole(role1);
       });
    msg.edit(`** :white_check_mark:  Done...\n**` +role1.name+`** Has Given To __${message.guild.members.size}__ Member**`);
    });
    }
    }
    }
    });
  


client.on('message', message => {
  let args = message.content.split(' ').slice(1);
  if(message.content.split(' ')[0] == '$color'){
  const embedd = new Discord.RichEmbed()
  .setFooter('Requested by '+message.author.username, message.author.avatarURL)
  .setDescription(`**No Color With This Name/Number ** :x: `)
  .setColor(`ff0000`)
   
  if(!isNaN(args) && args.length > 0)
  
  
  if    (!(message.guild.roles.find("name",`${args}`))) return  message.channel.sendEmbed(embedd);
  
  
  var a = message.guild.roles.find("name",`${args}`)
   if(!a)return;
  const embed = new Discord.RichEmbed()
  
  .setFooter('Requested by '+message.author.username, message.author.avatarURL)
  .setDescription(`**Done , Your Colors Has Been Changed . :white_check_mark: **`)
  
  .setColor(`${a.hexColor}`)
  message.channel.sendEmbed(embed);
  if (!args)return;
  setInterval(function(){})
     let count = 0;
     let ecount = 0;
  for(let x = 1; x < 201; x++){
  
  message.member.removeRole(message.guild.roles.find("name",`${x}`))
  
  }
   message.member.addRole(message.guild.roles.find("name",`${args}`));
  
  
  }
  });


client.on('message', async message => {
    if(!points) points = {}
    
        if(message.channel.type !== 'text') return;
        
        
        var command = message.content.toLowerCase().split(" ")[0];
        var args = message.content.toLowerCase().split(" ");
        var userM = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.id == args[1]));
          const embed  = new Discord.RichEmbed()
          .setDescription(`
          **No points have been recorded yet **
          ** Command Examples: **
          **:small_orange_diamond:** ${prefix}points ${message.author} 1 \`to change someone points\`
          **:small_orange_diamond:** ${prefix}points ${message.author} +1 \`to add points to someone\`
          **:small_orange_diamond:** ${prefix}points ${message.author} -1 \`to remove points from soneone \`
          **:small_orange_diamond:** ${prefix}points ${message.author} 0 \`to clean someone points\`
          **:small_orange_diamond:** ${prefix}points reset \`to reset all points\``)
          .setFooter('Requested by '+message.author.username, message.author.avatarURL)
          .setColor(`BLACK`)
            const error  = new Discord.RichEmbed()
          .setDescription(`
          **:x: | No points have been recorded yet **
          ** Command Examples: **
          **:small_orange_diamond:** ${prefix}points ${message.author} 1 \`to change someone points\`
          **:small_orange_diamond:** ${prefix}points ${message.author} +1 \`to add points to someone\`
          **:small_orange_diamond:** ${prefix}points ${message.author} -1 \`to remove points from soneone \`
          **:small_orange_diamond:** ${prefix}points ${message.author} 0 \`to clean someone points\`
          **:small_orange_diamond:** ${prefix}points reset \`to reset all points\``)
          .setFooter('Requested by '+message.author.username, message.author.avatarURL)
          .setColor(`BLACK`)
    if(command == prefix + 'points') {
         
            if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return message.channel.send(':no_entry: | I dont have Embed Links permission.');
            if(!args[1]) {
                if(!points) return message.channel.send(embed);
                var members = Object.values(points);
                var memb = members.filter(m => m.points >= 1);
                if(memb.length == 0) return message.channel.send(embed);
                var x = 1;
                let pointsTop = new Discord.RichEmbed()
                .setAuthor('Points:')
                .setColor('#FBFBFB')
                .setDescription(memb.sort((second, first) => first.points > second.points).slice(0, 10).map(m => `**:small_blue_diamond:** <@${m.id}> \`${m.points}\``).join('\n'))
                .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
                message.channel.send({
                    embed: pointsTop
                });
            }else if(args[1] == 'reset') {
                let pointsReset = new Discord.RichEmbed()
                .setDescription('**:white_check_mark: | points reset sucsessfuly !**')
                .setFooter('Requested by '+message.author.username, message.author.avatarURL)
                if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("You dont have Manage Server permission.");
                if(!points) return message.channel.send(pointsReset);
                var members = Object.values(points);
                var memb = members.filter(m => m.points >= 1);
                if(memb.length == 0) return message.channel.send(pointsReset);
                points = {};
                message.channel.send(pointsReset);
            }else if(userM) {
                if(!message.member.hasPermission('MANAGE_GUILD')) return  message.channel.send("You dont have Manage Server permission.");
                if(!points[userM.user.id]) points[userM.user.id] = {
                    points: 0,
                    id: userM.user.id
                };
                if(!args[2]) {
                    if(points[userM.user.id].points == 0) return message.channel.send( `${userM.user.username} Not have any points.`);
                    var userPoints = new Discord.RichEmbed()
                    .setColor('#d3c325')
                    .setAuthor(`${userM.user.username} have ${points[userM.user.id].points} points.`);
                    message.channel.send({
                        embed: userPoints
                    });
                }else if(args[2] == 'reset') {
                    if(points[userM.user.id].points == 0) return message.channel.send(error);
                    points[userM.user.id].points = 0;
                    message.channel.send(`Successfully reset ${userM.user.username} points.`);
                }else if(args[2].startsWith('+')) {
                    args[2] = args[2].slice(1);
                    args[2] = parseInt(Math.floor(args[2]));
                    if(points[userM.user.id].points == 1000000) return message.channel.send(error);
                    if(!args[2]) return message.channel.send(error);
                    if(isNaN(args[2])) return message.channel.send(error);
                    if(args[2] > 1000000) return message.channel.send(error);
                    if(args[2] < 1) return message.channel.send(error);
                    if((points[userM.user.id].points + args[2]) > 1000000) args[2] = 1000000 - points[userM.user.id].points;
                    points[userM.user.id].points += args[2];
                    let add = new Discord.RichEmbed()
                    .setDescription(`**:small_blue_diamond:** <@${userM.id}> \`${points[userM.user.id].points}\``)
                    .setAuthor('Points:')
                    .setColor('#FBFBFB')
                    .setFooter('Requested by' + message.author.username, message.author.avatarURL)
                    message.channel.send(add);
                }else if(args[2].startsWith('-')) {
                    args[2] = args[2].slice(1);
                    args[2] = parseInt(Math.floor(args[2]));
                    if(points[userM.user.id].points == 0) return message.channel.send(error);
                    if(!args[2]) return message.channel.send(error);
                    if(isNaN(args[2])) return message.channel.send(error);
                    if(args[2] > 1000000) return message.channel.send(error);
                    if(args[2] < 1) return message.channel.send(error);
                    if((points[userM.user.id].points - args[2]) < 0) args[2] = points[userM.user.id].points;
                    points[userM.user.id].points -= args[2];
                        let rem = new Discord.RichEmbed()
                    .setDescription(`**:small_blue_diamond:** <@${userM.id}> \`${points[userM.user.id].points}\``)
                    .setAuthor('Points:')
                    .setColor('#FBFBFB')
                    .setFooter('Requested by' + message.author.username, message.author.avatarURL)
                    message.channel.send(rem);
                }else if(!args[2].startsWith('+') || !args[2].startsWith('-')) {
                    args[2] = parseInt(Math.floor(args[2]));
                    if(isNaN(args[2])) return message.channel.send(error);
                    if(args[2] > 1000000) return message.channel.send(error);
                    if(args[2] < 1) return message.channel.send(error);
                    if(points[userM.user.id].points == args[2]) return message.channel.send(`${userM.user.username} points is already ${args[2]}.`);
                    points[userM.user.id].points = args[2];
                        let set = new Discord.RichEmbed()
                    .setDescription(`**:small_blue_diamond:** <@${userM.id}> \`${points[userM.user.id].points}\``)
                    .setAuthor('Points:')
                    .setColor('#FBFBFB')
                    .setFooter('Requested by' + message.author.username, message.author.avatarURL)
                    message.channel.send(set);
                }
                }
                }
      
    });


let moment = require('moment')
client.on('message' , message => {
if(message.content.startsWith(prefix+"user")) {
  
    let user = message.mentions.users.first() || message.author;
    message.delete();
    let game;
    if (user.presence.game === null) {
        game = 'Not playing now';
    } else {
        game = user.presence.game.name;
    }
    let messag;
    if (user.lastMessage === null) {
        messag = 'Did not send a message';
    } else {
        messag = user.lastMessage;
    }
    let status;
    if (user.presence.status === 'online') {
        status = ':green_heart:';
    } else if (user.presence.status === 'dnd') {
        status = ':heart:';
    } else if (user.presence.status === 'idle') {
        status = ':yellow_heart:';
    } else if (user.presence.status === 'offline') {
        status = ':black_heart:';
    }
    if (user.presence.status === 'offline') {
        stat = 0x000000;
    } else if (user.presence.status === 'online') {
        stat = 0x00AA4C;
    } else if (user.presence.status === 'dnd') {
        stat = 0x9C0000;
    } else if (user.presence.status === 'idle') {
        stat = 0xF7C035;
    }
    const embed = new Discord.RichEmbed()
  .addField('**UserInfo:**', `**name:** ${user.username}#${user.discriminator}\n**JoinedDiscord:**  ${moment(user.createdTimestamp).format('YYYY/M/D HH:mm:ss')} **\n** \`${moment(user.createdTimestamp).fromNow()}\n**LastMessage:** ${messag}\n**Playing:** ${game}\n**Status:** ${status}\n**Bot?** ${user.bot}`, true)
  .setThumbnail(user.displayAvatarURL)
  .addField(`Roles:`, message.guild.members.get(user.id).roles.array(role => role.name).slice(1).join(', '))
  .addField('DiscordInfo:', `**Discriminator:** #${user.discriminator}\n**ID:** ${user.id}\n**Username:** ${user.username}`)
  .setAuthor(`informations:  ${user.username}`, user.displayAvatarURL)
  .setColor("BLACK");
    message.channel.send({embed})
  .catch(e => print(e))
}
 });


client.on('message', message => {
  if(message.content === prefix + 'createcolors') {
                       if(!message.channel.guild) return;
       if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('**You Dont Have** `ADMINISTRATOR` **premission**').then(msg => msg.delete(6000))
    message.guild.createRole({
                name: "1",
                  color: "#FFB6C1",
                  permissions: []
   })
         message.guild.createRole({
                name: "2",
                  color: "#FFC0CB",
                  permissions: []
   })
              message.guild.createRole({
                name: "3",
                  color: "#FF69B4",
                  permissions: []
   })
                   message.guild.createRole({
                name: "4",
                  color: "#FF1493",
                  permissions: []
   })
                   message.guild.createRole({
                name: "5",
                  color: "#DB7093",
                  permissions: []
   })
                   message.guild.createRole({
                name: "6",
                  color: "#C71585",
                  permissions: []
   })
                   message.guild.createRole({
                name: "7",
                  color: "#E6E6FA",
                  permissions: []
   })
                   message.guild.createRole({
                name: "8",
                  color: "#D8BFD8",
                  permissions: []
   })
                   message.guild.createRole({
                name: "8",
                  color: "#DDA0DD",
                  permissions: []
   })
                   message.guild.createRole({
                name: "9",
                  color: "#DA70D6",
                  permissions: []
   })
                   message.guild.createRole({
                name: "10",
                  color: "#EE82EE",
                  permissions: []
   })
                   message.guild.createRole({
                name: "11",
                  color: "#FF00FF",
                  permissions: []
   })
                   message.guild.createRole({
                name: "12",
                  color: "#BA55D3",
                  permissions: []
   })
                   message.guild.createRole({
                name: "13",
                  color: "#9932CC",
                  permissions: []
   })
                        message.guild.createRole({
                name: "14",
                  color: "#9400D3",
                  permissions: []
   })
                        message.guild.createRole({
                name: "15",
                  color: "#8A2BE2",
                  permissions: []
   })
                             message.guild.createRole({
                name: "16",
                  color: "#8B008B",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "17",
                  color: "#800080",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "18",
                  color: "#9370DB",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "19",
                  color: "#7B68EE",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "20",
                  color: "#6A5ACD",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "21",
                  color: "#483D8B",
                  permissions: []
   }) 
                                  message.guild.createRole({
                name: "22",
                  color: "#663399",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "23",
                  color: "#4B0082",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "24",
                  color: "#FFA07A",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "25",
                  color: "#FA8072",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "26",
                  color: "#E9967A",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "27",
                  color: "#F08080",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "28",
                  color: "#CD5C5C",
                  permissions: []
   })
                                  message.guild.createRole({
                name: "29",
                  color: "#DC143C",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "30",
                  color: "	#FF0000",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "31",
                  color: "#B22222",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "32",
                  color: "#8B0000",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "33",
                  color: "#FFA500",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "34",
                  color: "#FF8C00",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "35",
                  color: "#FF7F50",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "36",
                  color: "#FF6347",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "37",
                  color: "#FF4500",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "38",
                  color: "#FFD700",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "39",
                  color: "#FFFFE0",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "40",
                  color: "#FFFACD",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "41",
                  color: "#FAFAD2",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "42",
                  color: "	#FFEFD5",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "43",
                  color: "#FFE4B5",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "44",
                  color: "#FFDAB9",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "45",
                  color: "#EEE8AA",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "46",
                  color: "#F0E68C",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "47",
                  color: "#BDB76B",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "48",
                  color: "#ADFF2F",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "49",
                  color: "#7FFF00",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "50",
                  color: "#7CFC00",
                  permissions: []
   })
                                       message.guild.createRole({
                name: "51",
                  color: "#00FF00",
                  permissions: []
   })  
   
                                       message.guild.createRole({
                name: "52",
                  color: "#32CD32",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "53",
                  color: "#98FB98",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "54",
                  color: "#90EE90",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "55",
                  color: "#00FA9A",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "56",
                  color: "#00FF7F",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "57",
                  color: "#3CB371",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "58",
                  color: "#2E8B57",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "59",
                  color: "#2E8B57",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "60",
                  color: "#008000",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "61",
                  color: "#006400",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "62",
                  color: "#9ACD32",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "63",
                  color: "#6B8E23",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "64",
                  color: "#556B2F",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "65",
                  color: "#66CDAA",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "66",
                  color: "#8FBC8F",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "67",
                  color: "#20B2AA",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "68",
                  color: "#008B8B",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "69",
                  color: "#008080",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "70",
                  color: "#00FFFF",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "71",
                  color: "#E0FFFF",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "72",
                  color: "#AFEEEE",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "73",
                  color: "#7FFFD4",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "74",
                  color: "#40E0D0",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "75",
                  color: "#48D1CC",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "76",
                  color: "#00CED1",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "77",
                  color: "#5F9EA0",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "78",
                  color: "#4682B4",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "79",
                  color: "#B0C4DE",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "80",
                  color: "#ADD8E6",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "81",
                  color: "#B0E0E6",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "82",
                  color: "#87CEFA",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "83",
                  color: "#87CEEB",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "84",
                  color: "#6495ED",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "85",
                  color: "#00BFFF",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "86",
                  color: "#1E90FF",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "87",
                  color: "#4169E1",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "88",
                  color: "#0000FF",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "89",
                  color: "#0000CD",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "90",
                  color: "#00008B",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "91",
                  color: "#000080",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "92",
                  color: "#191970",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "93",
                  color: "#FFF8DC",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "94",
                  color: "#FFEBCD",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "95",
                  color: "#FFE4C4",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "96",
                  color: "#FFDEAD",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "97",
                  color: "#F5DEB3",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "98",
                  color: "#DEB887",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "99",
                  color: "#D2B48C",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "100",
                  color: "#BC8F8F",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "101",
                  color: "#F4A460",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "102",
                  color: "#DAA520",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "103",
                  color: "#B8860B",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "104",
                  color: "#CD853F",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "105",
                  color: "#D2691E",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "106",
                  color: "#808000",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "107",
                  color: "#8B4513",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "108",
                  color: "#A0522D",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "109",
                  color: "#A52A2A",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "110",
                  color: "#800000",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "111",
                  color: "#FFFFFF",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "112",
                  color: "#FFFAFA",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "113",
                  color: "#F0FFF0",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "114",
                  color: "#F5FFFA",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "115",
                  color: "#F0FFFF",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "116",
                  color: "#F0F8FF",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "117",
                  color: "#F8F8FF",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "118",
                  color: "#F5F5F5",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "119",
                  color: "#FFF5EE",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "120",
                  color: "#F5F5DC",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "121",
                  color: "#FDF5E6",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "122",
                  color: "#FFFAF0",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "123",
                  color: "#FFFFF0",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "124",
                  color: "#FAEBD7",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "125",
                  color: "#FAF0E6",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "126",
                  color: "#FFF0F5",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "127",
                  color: "#FFE4E1",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "128",
                  color: "#DCDCDC",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "129",
                  color: "#D3D3D3",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "130",
                  color: "#C0C0C0",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "131",
                  color: "#f7f7f7",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "132",
                  color: "#b2b2b2",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "133",
                  color: "#6f6c6c",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "134",
                  color: "#4d4646",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "135",
                  color: "#4c4c4c",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "136",
                  color: "#2F4F4F",
                  permissions: []
   })     
                                       message.guild.createRole({
                name: "137",
                  color: "#040000",
                  permissions: []
   })     

   
        message.channel.sendMessage({embed: new Discord.RichEmbed()
   .setColor('#502faf').setAuthor(`${message.author.username}'`, message.author.avatarURL).setDescription('``Colors Has Been Created``')});
  }




client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '1');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '2');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '3');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '4');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '5');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '6');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '7');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '8');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '9');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '10');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '11');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '12');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '13');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '14');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '15');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '16');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '17');
  
  role.delete()
  }

});



client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '18');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '19');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '20');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith("+!deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '21');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '22');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '23');
  
  role.delete()
  }

});



client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '24');
  
  role.delete()
  }

});



client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '25');
  
  role.delete()
  }

});



client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '26');
  
  role.delete()
  }

});


client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '27');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '28');
  
  role.delete()
  }

});


client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '29');
  
  role.delete()
  }

});


client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '30');
  
  role.delete()
  }

});


client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '31');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '32');
  
  role.delete()
  }

});


client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '33');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '34');
  
  role.delete()
  }

});


client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '35');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '36');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '37');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '38');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '39');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '40');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '41');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '42');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '43');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '44');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '45');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '46');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '47');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '48');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '49');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '50');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '51');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '52');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '53');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '54');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '55');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '56');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '57');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '58');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '59');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '60');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '-61');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '62');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '63');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '64');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '65');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '66');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '67');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '68');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '69');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '70');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '71');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '72');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '73');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '74');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '75');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '76');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '77');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '78');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '79');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '80');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '81');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '82');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '83');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '84');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '85');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '86');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '87');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '88');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '89');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '90');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '91');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '92');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '93');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '94');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '95');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '96');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith (">deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '97');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '98');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '99');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '100');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '101');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '102');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '103');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '104');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '105');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith (">deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '106');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '107');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '108');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '109');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '110');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '111');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '112');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '113');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '114');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '115');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '116');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '117');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '118');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '119');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '121');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '122');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '123');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '124');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '125');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '126');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '127');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '128');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '129');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '130');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '131');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '132');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '133');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '134');
  
  role.delete()
  }

});
client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '135');
  
  role.delete()
  }

});

client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '136');
  
  role.delete()
  }

});



client.on('message', async message => {
  
    let args = message.content.split(' ').slice(1);
if (message.content.startsWith(prefix +"deletecolors")) {
  if(!message.member.hasPermission('ADMINISTRATOR')) return
  let role = message.guild.roles.find('name', '137');
  
  role.delete()
  }

});
})

const shorten = require('isgd');
client.on('message', message => {
 if (message.content.startsWith(prefix + 'short')) {
    let args = message.content.split(" ").slice(1);
  if (!args[0]) return message.channel.send('**Usage**: '+ prefix +'short <link>')
  if (!args[1]) { 
    shorten.shorten(args[0], function(res) {
      if (res.startsWith('Error:')) return message.channel.send('**Usage**: '+ prefix +'short <link>');
      message.channel.send(`The Short Link:**<${res}>**`); 
    })
  } else { 
    shorten.custom(args[0], args[1], function(res) { 
      if (res.startsWith('Error:')) return message.channel.send(`The Short Link:**${res}**`); 
      message.channel.send(`The Short Link:**<${res}>**`); 
 })}}});

client.on("message", async message => {
if(message.author.bot) return;
if(message.channel.type.toLowerCase() == "dm") return;
let messageArray = message.content.split (" ");
let args = messageArray.slice(1);

if (message.content.startsWith(prefix + "8ball")) {


if(!args[1]) return message.reply("?");
let replies = ["Yes", "Yup.", "No.", "I dont know.", "Please ask me later"];

let result = Math.floor((Math.random() * replies.length));
let question = args.slice(1).join(" ");

message.channel.sendMessage(`${replies[Math.floor(Math.random() * replies.length)]}`);   ///Alpha Codes
            if (!args[0]) {
       message.edit('1')
       return;
     }
 }
});

client.on('message', async message => {
    if (message.author.bot || message.channel.type.toLowerCase() == 'dm') return;
    let args = message.content.split(" ").slice(1);
    let command = message.content.split(" ")[0];
    let request = require('snekfetch');
    if (command === `$npm`) {
        // https://www.npmjs.com/package/snekfetch
        if (!args[0]) return message.channel.send(`**:x: | Specify an arg to search for in npmjs.com.**`);
        let url = args.includes(" ") ? args.replace(" ", "-") : args;
        url = `https://registry.npmjs.com/${url[0].toLowerCase()}`;
        request.get(url).then(r => {
                message.channel.send(new Discord.RichEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL)
                    .setThumbnail("https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png")
                    .setTitle(`❯ \`${args[0]}\`.`)
                    .setColor("#000")
                    .addField("» **Version**", `- ${r.body['dist-tags'].latest}`, true)
                    .addField("» **License**", `- ${r.body.license}`, true)
                    .addField("» **Homepage**", `- [\`Click Here\`](${r.body.homepage})`, true)
                    .addField("» **Description**", `- ${r.body.description || "- Without description."}`, true)
                    .addField("» **Contributors**", `- ${r.body.contributors ? r.body.contributors.map(r => r.name).join(', ') : "None"}`, true)
                    .addField("» **Keyboards**", `- ${r.body.keywords ? r.body.keywords.map(r => r).join(', ') : "None"}`, true));
            })
            .catch(e => {
                if (e) message.channel.send(`**:x: |  Couldn't find the package \`${args[0]}\` .**`);
                if (e) print(e.message);
            });
    }
}); 
client.on('message', message => {//new msg event
if(!message.channel.guild) return;
  if(message.content.startsWith(prefix + 'setRainbow')) {//to create the rainbow role
	  let role = message.guild.roles.find('name', 'Rainbow bot.')
    if(role) return message.channel.send(`This Step Already Completed !`)//if the role already created return with this msg
  //start of create role 
  if(!role){
    let rainbow =  message.guild.createRole({
   name: "Rainbow bot.",//the role will create name
   color: "#000000",//the default color
   permissions:[]//the permissions
 //end of create role
})

}
message.channel.send('Done The Rainbow Role Setup Has Been Completed')//if the step completed
}})

client.on('ready', () => {//new ready event
  setInterval(function(){
      client.guilds.forEach(g => {
                  var role = g.roles.find('name', 'Rainbow bot.');//rainbow role name
                  if (role) {
                      role.edit({color : "RANDOM"});
                  };
      });
  }, 5000);//the rainbow time
})



client.on("message" ,async message => {
  if (message.author.bot || message.channel.type.toLowerCase() == 'dm') return;
  let args = message.content.split(" ");
  if(message.content.startsWith(`${prefix}ping` || `${prefix}Ping`)) {
  let embed = new Discord.RichEmbed()
  .setTitle("My Ping Is:")
  .setDescription(`${Math.round(client.ping)}`)
  .setColor("BLUE")
  message.channel.sendEmbed(embed)
  }


    
if(args[0] == `${prefix}djs`) {
const fetch = require('node-fetch');
const query = message.content.split(" ").slice(1)
const url = `https://djsdocs.sorta.moe/main/stable/embed?q=${encodeURIComponent(query)}`;
fetch(url)
  .then(res => res.json())
  .then(embed => {
    if(embed && !embed.error) {
      message.channel.send({ embed });
    } else {
      message.reply(`I don't know mate, but "${query}" doesn't make any sense!`);
    }
  })
  .catch(e => {
    // Whoops, some error occured, let's log it and notify the user
    console.error(e);
    message.reply('Darn it! I failed!');
  })
}


if(args[0] === `${prefix}server`) {
  let embed = new Discord.RichEmbed()
  .setTitle(`**${message.guild.name} Informations:**`)
  .addField("Server Name:", `${message.guild.name}`)
  .addField("Server ID:", `${message.guild.id}`)
  .addField("Server Owner:", `${message.guild.owner.user.tag}`)
  .addField("Server Owner ID:", `${message.guild.owner.id}`)
  .addField("Server Members:", `${message.guild.memberCount}`)
  .addField("Server Created At:", `${message.guild.createdAt.toLocaleString()}`)
  .addField("Server Bots:", `${message.guild.members.filter(m=>m.user.bot).size}`)
  .addField("Server Channels",`${message.guild.channels.filter(m => m.type.toLowerCase() == 'text').size}` + ' text | Voice  '+ `${message.guild.channels.filter(m => m.type.toLowerCase() == 'voice').size} `)
  .addField("Server Roles",`${message.guild.roles.size}`)
  .setThumbnail(message.guild.IconURL)
  .setColor("BLACK")
  message.channel.sendEmbed(embed)
}
if(args[0] == `${prefix}help`) { //helpcommand
let embed = new Discord.RichEmbed()
.setTitle("**The Prefix Is $**")
.addField("**❯ Commands**", `A list of available commands.`)
.addField("❯ Docs", `\`$djs\` \`$npm\` \`$syt (search youtube)\` \`$anime\` \`$mcskin\``)
.addField("❯ Info", `\`$server\` \`$user\``)
.addField("❯ Guard", `\`$settings limitsban\` \`$settings limitskick\` \`$settings limitsroleC (create)\` \`$settings limitsroleD (delete)\` \`$settings limitschannelD (delete)\` \`$antibots (bots joining)\` \`$antifake (accounts)\` \`$toggleroles (restore roles after leave)\` \`$antispread (on/off)\``)
.addField("❯ Control", `\`$setWelcomer\` \`$setLeave (Leave Message)\` \`$toggleLeave\` \`$toggleWelcome\` \`$toggleInvitedby\` \`$toggleDmwelcome\` \`$toggleLink (server link)\` \`$autorole\` \`$setRole (ReactionRole)\` \`$temp on / off (Temp Rooms)\` \`$setLog\``)
.addField("❯ Utils", `\`$discrim\` \`$slots\` \`$8ball\` \`$bc (broadcast)\` \`$short (link)\` \`$figlet (ascii)\` \`$hack\` \`$webhooksay\` \`$say\``)
.addField("❯ Moderator", `\`$prune (chat)\` \`$points\` \`$ban\` \`$mute\` \`$warn\` \`$roles\` \`$bans (size)\` \`$role (give/pull)\` \`$allunban\` \`$unban\` \`$mute\` \`$kick\` \`$banslist\``)
.addField("❯ Music", `\`$play\` \`$stop\` \`$skip\` \`$queue\` \`$loop\``)
.addField("❯ Colors", `\`$createcolors\` \`$deletecolors\` \`$colors\` \`$setRainbow\``)
.setColor("BLACK")
message.channel.sendEmbed(embed)
}
              let msgsargs = message.content.split(" ").slice(1).join(" ")
            if (message.content.startsWith(prefix + 'prune')) {
              if(message.author.bot) undefined;
              if(!msgsargs || !msgsargs > 101) {
              let messagesDeleted = await clearChannel(message.channel);
          
              message.channel.sendMessage("The Chat Has Been Pruned").then(messages => messages.delete(5000));
              print('Number of deleted messages: ' + messagesDeleted)
            }
            if(msgsargs || msgsargs < 101) {
                message.channel.fetchMessages().then(() => 
                    message.channel.bulkDelete(msgsargs));
                message.channel.send(`The Chat Has Been Pruned`).then(messages => messages.delete(5000));
              }
            if(log[message.guild.id].onoff === "On") {
        let ch = message.guild.channels.find("name", `${log[message.guild.id].channel}`)
        let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField("**Channel:**", message.channel.name)
        .addField("**Action:**", `Prune Chat`)
        .setColor("#500c0c")
          ch.sendEmbed(embed)
            }
            }
        
        
          async function clearChannel(channel, n = 0, old = false) {
            let collected = await channel.fetchMessages();
            if (collected.size > 0) {
              if (old) {
                for (let msg of collected.array()) {
                  await msg.delete();
                  n++;
                }
              } else {
                let deleted = await channel.bulkDelete(100, true);
                if (deleted.size < collected.size) old = true;
                n += deleted;
              }
          
              return n + await clearChannel(channel, old);
            } else return 0;
          }

if(args[0] == `${prefix}syt`) {
    var search = require('youtube-search');
    const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU');
        let filter = m => m.author.id === message.author.id
message.channel.send(':x: | Please Type Anything To Search')
let chaLan = message.channel.awaitMessages(filter, { max: 1, time: 40000, errors: ['time'] })
    .then(collected => {
      var yt = collected.first().content
var opts = {
  maxResults: 10,
  key: 'AIzaSyB1OOSpTREs85WUMvIgJvLTZKye4BVsoFU'
};
search(yt , opts, function(err, results) {
  if(err) return print(err);
  var e = new Discord.RichEmbed()
  .setTitle(`Info about : `)
  .addField(`Title` , results[0].title)
  .addField(`Channel` , results[0].channelTitle , true)
  .addField(`Published At` , results[0].publishedAt , true)
  .setDescription(`**Description** \n \`${results[0].description}\``)
  .addField(`Channel ID` , results[0].channelId , true)
  .addField(`Link ` , ` [\`Click Here اظغط هنا\`](${results[0].link})`)
.setFooter(`${client.user.tag}`)
.setColor('#36393e')
  .setImage(`https://img.youtube.com/vi/${results[0].id}/hqdefault.jpg`)
   message.channel.send(e)
});
 })
  }

            if(args[0] == `${prefix}anime`) {
              const { getInfoFromName } = require('myanimelists');
              let anime = message.content.split(" ").slice(1).join(" ")
                if(!anime) return message.channel.send('Please Write The Anime Name Example: !anime dragon ball')
            getInfoFromName(anime)
                .then(result => {
                    let embed = new Discord.RichEmbed()
                .setTitle(result.title)
                .addField('Trailer:', `${result.trailer}` || `Unknown`)
                .addField('Episodes:', `${result.episodes}` || `Unknown`)
                .addField('Status:', `${result.status}` || `Unknown`)
                .addField('Studios:', `${result.studios}` || `Unknown`)
                .addField('Genres:', `${result.genres}` || `Unknown`)
                .addField('Ranked:', `${result.ranked}` || `Unknown`)
                .addField('Favorites', `${result.favorites}` || `Unknown`)
                .addField('Rating:', `${result.rating}` || `Unknown`)
                .addField('Premiered:', `${result.premiered}` || `Unknown`)
                .addField('Duration:', `${result.duration}` || `Unknown`)
                .addField('Score:', `${result.score}` || `Unknown`)
                .addField('Scored By:', `${result.scoreStats} ` || `Unknown`)
                .setDescription(`${result.synopsis || 'Unknown'}`)
                .setImage(result.picture)
                .setColor('#0a0000')
                message.channel.sendEmbed(embed)
                })
                .catch(error => print(error));
            }
  
  if(message.content.startsWith(prefix + "slots")) {
let slot1 = ['🍏', '🍇', '🍒', '🍍', '🍅', '🍆', '🍑', '🍓'];
let slot2 = ['🍏', '🍇', '🍒', '🍍', '🍅', '🍆', '🍑', '🍓'];
let slot3 = ['🍏', '🍇', '🍒', '🍍', '🍅', '🍆', '🍑', '🍓'];
let slots1 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
let slots2 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
let slots3 = `${slot1[Math.floor(Math.random() * slot1.length)]}`;
let we;
if(slots1 === slots2 && slots2 === slots3) {
we = "😀You Won !😀"
} else {
we = "😣You Lost !😣"
}
message.channel.send(`${slots1} | ${slots2} | ${slots3} - ${we}`)
}

            if(args[0] == `${prefix}toggleroles`) {
                if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
                if(!onoffmembers[message.guild.id]) onoffmembers[message.guild.id] = {
                    onoff: 'Off'
                  }
                  if(onoffmembers[message.guild.id].onoff === 'Off') return [message.channel.send(`**✅ The BackRoles Is __𝐎𝐍__ !**`), onoffmembers[message.guild.id].onoff = 'On']
                  if(onoffmembers[message.guild.id].onoff === 'On') return [message.channel.send(`**⛔ The BackRoles Is __𝐎𝐅𝐅__ !**`), onoffmembers[message.guild.id].onoff = 'Off']
                  fs.writeFile("./onoffmembers.json", JSON.stringify(onoffmembers), (err) => {
                    if (err) console.error(err)
                    .catch(err => {
                      console.error(err);
                  });
                    });
                  }

                  if(args[0] == `${prefix}setLog`) {
                    let room = message.content.split(" ").slice(1);
                    let findroom = message.guild.channels.find('name', `${room}`)
                      if(!message.channel.guild) return;
                      if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
              if(!room) return message.channel.send('Please Type The Channel Name')
              if(!findroom) return message.channel.send('Please Type The Log Channel Name')
              let embed = new Discord.RichEmbed()
              .setTitle('**Done The Log Code Has Been Setup**')
              .addField('Channel:', `${room}`)
              .addField('Requested By:', `${message.author}`)
              .setThumbnail(message.author.avatarURL)
              .setFooter(`${client.user.username}`)
              message.channel.sendEmbed(embed)
              log[message.guild.id] = {
              channel: room,
              onoff: 'On'
              }
              fs.writeFile("./Data/log.json", JSON.stringify(log), (err) => {
              if (err) console.error(err)
              })
                  }
                  if(message.content.startsWith(prefix + "toggleLog")) {
                    if(!message.channel.guild) return;
                    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
                    if(!log[message.guild.id]) log[message.guild.id] = {
                      onoff: 'Off'
                    }
                      if(log[message.guild.id].onoff === 'Off') return [message.channel.send(`**The log Is __𝐎𝐍__ !**`), log[message.guild.id].onoff = 'On']
                      if(log[message.guild.id].onoff === 'On') return [message.channel.send(`**The log Is __𝐎𝐅𝐅__ !**`), log[message.guild.id].onoff = 'Off']
                      fs.writeFile("./Data/log.json", JSON.stringify(log), (err) => {
                        if (err) console.error(err)
                        .catch(err => {
                          console.error(err);
                      });
                        });
                      }
                    
                      if (args[0] == `${prefix}figlet`) {
                      if (!message.channel.guild) return;
                      var argsmessage = message.content.split(" ").slice(1).join(" ");
                      if (!argsmessage) return message.channel.send(`**Hey There , Type SomeThing to ASCII** 🌦.`);
                  figlet(argsmessage, function(err, dataed) {
                      if (err) {
                          message.channel.send(`\`\`\`apache\nErr; ${err}\`\`\``);
                          }
                      var messagehere = "";
                      var messageem = new Discord.RichEmbed()
                      .setColor(message.member.displayHexColor || "36393e")
                      .setAuthor(`figlet Service;`,message.author.avatarURL || message.author.defaultAvatarURL)
                      .setDescription(`|| ------------------------------------------------------------------- ||\`\`\`fix\n${dataed} ${messagehere}\`\`\``)
                      .setThumbnail(message.guild.iconURL || message.author.displayAvatarURL)
                      .setTimestamp()
                  if (argsmessage.length <= 6){
                      message.channel.send(messageem);
                          }
                  if (argsmessage.length >= 7){
                      message.channel.send(`\`\`\`fix\n${dataed}\`\`\``);
                       }
                      })
                    }    

                      if (!message.guild || message.author.bot) return;
                        if (args[0] == `${prefix}colors`) {
                            var fsn = require('fs-nextra');
                            fs.readdir('./colors', async (err, files) => {
                                var f = files[Math.floor(Math.random() * files.length)];
                                var {
                                    Canvas
                                } = require('canvas-constructor');
                                var x = 0;
                                var y = 0;
                                if (message.guild.roles.filter(role => !isNaN(role.name)).size <= 0) return;
                                message.guild.roles.filter(role => !isNaN(role.name)).sort((b1, b2) => b1.name - b2.name).forEach(() => {
                                    x += 100;
                                    if (x > 100 * 12) {
                                        x = 100;
                                        y += 80;
                                    }
                                });
                                var image = await fsn.readFile(`./colors/${f}`);
                                var xd = new Canvas(100 * 11, y + 350) // كانت 250 يلي هو الحين 350
                                    .addBeveledImage(image, 0, 0, 100 * 11, y + 350, 100) // يلي هي الحين 350 كانت 250 و يلي هي الحين 100 كانت 50
                                    .setTextBaseline('middle')
                                    .setColor('white')
                                    .setTextSize(60)
                                    .addText(`Colors Menu`, 375, 40);
                                x = 0;
                                y = 150;
                                message.guild.roles.filter(role => !isNaN(role.name)).sort((b1, b2) => b1.name - b2.name).forEach(role => {
                                    x += 75;
                                    if (x > 100 * 10) {
                                        x = 75;
                                        y += 80;
                                    }
                                    xd
                                        .setTextBaseline('middle')
                                        .setTextAlign('center')
                                        .setColor(role.hexColor)
                                        .addBeveledRect(x, y, 60, 60, 15)
                                        .setColor('white');
                                    if (`${role.name}`.length > 2) {
                                        xd.setTextSize(30);
                                    } else if (`${role.name}`.length > 1) {
                                        xd.setTextSize(40);
                                    } else {
                                        xd.setTextSize(50);
                                    }
                                    xd.addText(role.name, x + 30, y + 30);
                                });
                                message.channel.sendFile(xd.toBuffer());
                            });
                        }


                          if(args[0] == `${prefix}setRole`) {
    let newemoji;
    let stringNew;
    let roleNew;
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("you don't have permission").then(s => {s.delete(1600);})
  message.reply("Mention The Channel Now").then(messages=>{
    const filter = response => response.author.id === message.author.id;
    message.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
    .then( collected =>{
      message.delete();
      let idC = message.guild.channels.find(c=>c.id == collected.first().mentions.channels.first().id)
      if(!idC) return messages.edit("Cant Find This Channel");
       idC = idC.id;
       messages.edit(`${message.author}, Write The Emoji You Want`)
  const filter = response => response.author.id === message.author.id;
  message.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
  .then( collected =>{
  if(!emojiss.hasEmoji(collected.first().mentions._content)) return messages.edit("ادخل ايموجي صحيح !");
  newemoji = collected.first().mentions._content;
  message.delete();
  messages.edit(`${message.author},  Mention The Role You Want`)
  const filter = response => response.author.id === message.author.id;
  message.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
  .then( collected =>{
  let roleW = collected.first().mentions.roles.first()
  if(!roleW) {
    let embed = new Discord.RichEmbed()
    .setColor("#42f4f4")
    .setTitle(`:x: - Mention The Role `);
    message.reply(embed).then( z => z.delete(3000)); return
  };
  let role = message.guild.roles.find(`name`, roleW.name);
  if(!role) {
    let embed = new Discord.RichEmbed()
    .setColor("#42f4f4")
    .setTitle(`:x: - Could't find \`${roleW.name}\` role.`);
  message.reply(embed).then( messages => messages.delete(3000));
  return
  }
  roleNew = role;
  messages.edit(`${message.author}, Write The Message`)
  const filter = response => response.author.id === message.author.id;
  message.channel.awaitMessages(filter, { maxMatches: 1, time: 30000, errors: ['time'] })
  .then( collected =>{
  stringNew = collected.first().mentions._content;
  let channel = message.guild.channels.get(idC);
  if(!channel) {
    let embed = new Discord.RichEmbed()
    .setColor("#42f4f4")
    .setTitle(`:x: - Could't find \`${idC}\` Channel.`);
  message.reply(embed).then( messages => messages.delete(3000));
  return
  }
  channel.bulkDelete(100)
  channel.send(`@here || @everyone
  ${message.guild.name}© :arrow_down:
  ${stringNew}
  `).then( messageA =>{
  messageA.react(newemoji).then(()=>{
    const Ac = (reaction, user) => reaction.emoji.name === newemoji && !user.bot;
    const Acc = messageA.createReactionCollector(Ac, {time: 120000});
    Acc.on("collect", r=>{
    let member = message.guild.members.get(r.users.last().id);
    if(!member) return;
    r.remove(member.user);
  if(member.roles.find(r=>r.name == roleNew.name)) return;
      member.addRole(roleNew);
    channel.send(`${member.user}, Done Activated !`).then(z => z.delete(1500));
  })})})
  }).catch(e => {print(e.message)});
  }).catch(e => {print(e.message)});
  }).catch(e => {print(e.message)});
  }).catch(e => {print(e.message)});
  })
  
}
  
  	   if(message.content.startsWith(`${prefix}invite`)){
		   if(!message.channel.guild) return;
		   var embed = new Discord.RichEmbed()
		   .setTitle(">> ClickHere To Add" + ` ${client.user.username}` + " <<")
		   .setURL("https://discordapp.com/oauth2/authorize?client_id=" + `${client.user.id}` + "&scope=bot&permissions=2080374975")
		   .setTimestamp()
		   .setFooter(`Requested By | ${message.author.username}`)
		   .setColor("RANDOM")
		   message.channel.send(":white_check_mark: | Check Your DM!")
		   message.author.send({embed})
	   }
  
         
    if(args[0] == `${prefix}bc`) {
     let filter = m => m.author.id === message.author.id;
 
 let recembed = new Discord.RichEmbed()
 .setTitle(`${client.user.username}`)
 .setDescription(`
 -=-=-=-=-=-=-=-=-=-=
 🎖 Broadcast sends to a specific role without embed
 
 🏅 Broadcast sends to a specific role with embed
 
 📭 Broadcast sends for all members with embed
 
 📧 Broadcast sends for all members without embed
 
 🔵 Broadcast sends for online members only without embed
 
 🔷 Broadcast sends for online members only with embed
 
 ❌ To Cancel the process
 -=-=-=-=-=-=-=-=-=-=
 `)
 
 message.channel.sendEmbed(recembed).then(msg => { 
     msg.react('🎖')
     .then(() => msg.react('🏅'))
     .then(() => msg.react('📭'))
     .then(() =>  msg.react('📧'))
     .then(() => msg.react('🔵'))
     .then(() => msg.react('🔷'))
     .then(() => msg.react('❌'))

 
             let embedmsgFilter = (reaction, user) => reaction.emoji.name === '📭' && user.id === message.author.id;
 
             let normalmsgFilter = (reaction, user) => reaction.emoji.name === '📧' && user.id === message.author.id;
 
             let cancelFilter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
 
             let onlyroleFilter = (reaction, user) => reaction.emoji.name === '🎖' && user.id === message.author.id;8
 
             let onlineonlyFilter = (reaction, user) => reaction.emoji.name === '🔵' && user.id === message.author.id;8

             let embedonlineonlyFilter = (reaction, user) => reaction.emoji.name === '🔷' && user.id === message.author.id;8

             let embedonlyroleFilter = (reaction, user) => reaction.emoji.name === '🏅' && user.id === message.author.id;8
 
             let embedmsg = msg.createReactionCollector(embedmsgFilter, { time: 0 });
 
             let normalmsg = msg.createReactionCollector(normalmsgFilter, { time: 0 });
     
             let onlyrole = msg.createReactionCollector(onlyroleFilter, { time: 0 });
 
             let embedonlyrole = msg.createReactionCollector(embedonlyroleFilter, { time: 0 });

             let onlineonly = msg.createReactionCollector(onlineonlyFilter, { time: 0 });
                 
             let embedonlineonly = msg.createReactionCollector(embedonlineonlyFilter, { time: 0 });

             let cancel = msg.createReactionCollector(cancelFilter, { time: 0 });
 
 embedonlineonly.on('collect', r => {

    let msge;
    message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
    
           message.channel.awaitMessages(filter, {
             max: 1,
             time: 90000,
             errors: ['time']
           })
           .then(collected => {
               collected.first().delete();
               msge = collected.first().content;
               msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
                 message.channel.awaitMessages(filter, {
                   max: 1,
                   time: 90000,
                   errors: ['time']
                 })
                 .then(collected => {
                   if(collected.first().content === 'yes') {
   message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
   
   
   message.guild.members.filter(m => m.presence.status === 'online').forEach(m => {
    var bc = new Discord.RichEmbed()
           .setColor('RANDOM')
           .setTitle(`:mega: New Broadcast`)
           .addField('🔰Server🔰', message.guild.name)
           .addField('🚩Sender🚩', message.author.username)
           .addField('📜Message📜', `${msge}`)
           .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
           m.send({ embed: bc })
           m.send(`${m}`)
           
       })
   }})
   if(collected.first().content === 'no') {
   message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
   message.guild.members.filter(m => m.presence.status === 'online').forEach(m => {
    var bc = new Discord.RichEmbed()
           .setColor('RANDOM')
           .setTitle(`:mega: New Broadcast`)
           .addField('🔰Server🔰', message.guild.name)
           .addField('🚩Sender🚩', message.author.username)
           .addField('📜Message📜', `${msge}`)
           .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
           m.send({ embed: bc })
           
       })
   }
                 
   })
               })
           })
       })
 
       
 onlineonly.on('collect', r => {
    let msge;
    message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
 
        message.channel.awaitMessages(filter, {
          max: 1,
          time: 90000,
          errors: ['time']
        })
        .then(collected => {
            collected.first().delete();
            msge = collected.first().content;
            msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 90000,
                errors: ['time']
              })
              .then(collected => {

                if(collected.first().content === 'yes') {
message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
                

message.guild.members.filter(m => m.presence.status === 'online').forEach(m => {
    m.send(`${msge}`) 
m.send(`${m}`)       
        
    })
}
if(collected.first().content === 'no') {
message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
message.guild.members.filter(m => m.presence.status === 'online').forEach(m => {
    m.send(`${msge}`) 
                
    })}
})
})
        })
    })
})

 embedmsg.on('collect', r => {
     let msge;
  message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
  
         message.channel.awaitMessages(filter, {
           max: 1,
           time: 90000,
           errors: ['time']
         })
         .then(collected => {
             collected.first().delete();
             msge = collected.first().content;
             msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
               message.channel.awaitMessages(filter, {
                 max: 1,
                 time: 90000,
                 errors: ['time']
               })
               .then(collected => {
                 if(collected.first().content === 'yes') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
 
 
     message.guild.members.forEach(m => {
         var bc = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setTitle(`:mega: New Broadcast`)
         .addField('🔰Server🔰', message.guild.name)
         .addField('🚩Sender🚩', message.author.username)
         .addField('📜Message📜', `${msge}`)
         .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
         m.send({ embed: bc })
         m.send(`${m}`)
         
     })
 }})
 if(collected.first().content === 'no') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
     message.guild.members.forEach(m => {
         var bc = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setTitle(`:mega: New Broadcast`)
         .addField('🔰Server🔰', message.guild.name)
         .addField('🚩Sender🚩', message.author.username)
         .addField('📜Message📜', `${msge}`)
         .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
         m.send({ embed: bc })
         
     })
 }
               
 })
             })
         })
     })
 
 
    
 
 
 
 normalmsg.on('collect', r => {
     let msge;
     message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
  
         message.channel.awaitMessages(filter, {
           max: 1,
           time: 90000,
           errors: ['time']
         })
         .then(collected => {
             collected.first().delete();
             msge = collected.first().content;
             msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
               message.channel.awaitMessages(filter, {
                 max: 1,
                 time: 90000,
                 errors: ['time']
               })
               .then(collected => {
 
                 if(collected.first().content === 'yes') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
                 
 
     message.guild.members.forEach(m => {
 m.send(`${msge}`) 
 m.send(`${m}`)       
         
     })
 }
 if(collected.first().content === 'no') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
     message.guild.members.forEach(m => {
         m.send(`${msge}`) 
                 
     })}
 })
 })
         })
     })
 })
 
 onlyrole.on('collect', r => {
     let msge;
     let role;
     message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
  
         message.channel.awaitMessages(filter, {
           max: 1,
           time: 90000,
           errors: ['time']
         })
 
         .then(collected => {
             collected.first().delete();
             msge = collected.first().content;
                 msg.edit('✅ **| Now Please Write The Role Name**').then(msg => {
                 message.channel.awaitMessages(filter, {
                     max: 1,
                     time: 90000,
                     errors: ['time']
                   })
         
         .then(collected => {
             collected.first().delete();
             role = collected.first().content;
                 let rolecheak = message.guild.roles.find('name', `${role}`)
             msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
               message.channel.awaitMessages(filter, {
                 max: 1,
                 time: 90000,
                 errors: ['time']
               })
               .then(collected => {
 
                 if(collected.first().content === 'yes') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
                 
 
             message.guild.members.filter(m => m.roles.get(rolecheak.id)).forEach(m => {
 
 m.send(`${msge}`) 
 m.send(`${m}`)       
         
     })
 }
 if(collected.first().content === 'no') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
         message.guild.members.filter(m => m.roles.get(rolecheak.id)).forEach(m => {
 
         m.send(`${msge}`) 
                 
     })}
 })
 })
         })
     })
 })
 })


 });
 
 
 
 embedonlyrole.on('collect', r => {
     let msge;
     let role;
     message.channel.send(':pencil: **| Please Write Now The Message To Send :pencil2: **').then(msg => {
  
         message.channel.awaitMessages(filter, {
           max: 1,
           time: 90000,
           errors: ['time']
         })
 
         .then(collected => {
             collected.first().delete();
             msge = collected.first().content;
                 msg.edit('✅ **| Now Please Write The Role Name**').then(msg => {
                 message.channel.awaitMessages(filter, {
                     max: 1,
                     time: 90000,
                     errors: ['time']
                   })
         
         .then(collected => {
             collected.first().delete();
             role = collected.first().content;
                 let rolecheak = message.guild.roles.find('name', `${role}`)
             msg.edit('✅ **| Do You Want A Mention In The Msg ? [yes OR no] **').then(msg => {
               message.channel.awaitMessages(filter, {
                 max: 1,
                 time: 90000,
                 errors: ['time']
               })
               .then(collected => {
 
                 if(collected.first().content === 'yes') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
                 
 
                     message.guild.members.filter(m => m.roles.get(rolecheak.id)).forEach(m => {
                         var bc = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setTitle(`:mega: New Broadcast`)
         .addField('🔰Server🔰', message.guild.name)
         .addField('🚩Sender🚩', message.author.username)
         .addField('📜Message📜', `${msge}`)
         .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
         m.send({ embed: bc })
 m.send(`${m}`)       
         
     })
 }
 if(collected.first().content === 'no') {
 message.channel.send(`**:white_check_mark: The Message Has Been Sent The Members :loudspeaker:**`);
 message.guild.members.filter(m => m.roles.get(rolecheak.id)).forEach(m => {
         var bc = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setTitle(`:mega: New Broadcast`)
         .addField('🔰Server🔰', message.guild.name)
         .addField('🚩Sender🚩', message.author.username)
         .addField('📜Message📜', `${msge}`)
         .setThumbnail('https://a.top4top.net/p_1008gqyyd1.png')
                  m.send({ embed: bc })
         
                 
     })}
 })
 })
         })
     })
 })
 })
 })
     cancel.on('collect', r => {
         let cancelembed = new Discord.RichEmbed()
         .setTitle('Successfully Canceled :x:')
      message.channel.sendEmbed(cancelembed)
         embedmsg.stop();
         normalmsg.stop();
         onlyrole.stop();
         embedonlyrole.stop();
         embedonlineonly.stop()
         onlineonly.stop()
         cancel.stop();
     })
 })
    }//--


      if (args[0] == `${prefix}unmute`) {
        let mention = message.mentions.members.first();
        let command = message.content.split(" ")[0];
           command = command.slice(prefix.length);
          let args = message.content.split(" ").slice(1);	 
        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.sendMessage("**You Donot HavePermission Mute_Members**").then(m => m.delete(5000));
    if(!message.guild.member(client.user).hasPermission("MUTE_MEMBERS")) return message.reply("**I donot Have Permission Mute_Members**").then(msg => msg.delete(6000))
    
      let kinggamer = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
         if(!kinggamer) return message.channel.send('Mention Someone')
    
    
      let role = message.guild.roles.find (r => r.name === "Muted");
      
      if(!role || !kinggamer.roles.has(role.id)) return message.channel.sendMessage(`**:information_source:${mention.user.username} لقد تم فك الميوت عنه مسبقا**`)
    
      await kinggamer.removeRole(role) 
    message.channel.sendMessage(`Successfully unmuted **${mention.user.tag}**`);
            if(log[message.guild.id].onoff === "On") {
        let ch = message.guild.channels.find("name", `${log[message.guild.id].channel}`)
        let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField("**Member:**", `${mention.user.tag} (${mention.id})`)
        .addField("**Action:**", `Unmute`)
        .setColor("BLUE")
          ch.sendEmbed(embed)
            }
      return;
    
      }
      if(args[0] == `${prefix}antifake on`) {
        if(!message.channel.guild) return;
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
antijoin[message.guild.id] = {
onoff: 'On',
}
message.channel.send(`**✅ The AntiFake Is __𝐎𝐍__ !**`)
          fs.writeFile("./antijoin.json", JSON.stringify(antijoin), (err) => {
            if (err) return console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }

          if(args[0] == `${prefix}antifake off`) {
            if(!message.channel.guild) return;
            if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
    antijoin[message.guild.id] = {
    onoff: 'Off',
    }
    message.channel.send(`**⛔ The AntiFake Is __𝐎𝐅𝐅__ !**`)
              fs.writeFile("./antijoin.json", JSON.stringify(antijoin), (err) => {
                if (err) return console.error(err)
                .catch(err => {
                  console.error(err);
              });
                });
              }
              if(args[0] == `${prefix}setFake`) {
                let time = message.content.split(" ").slice(1).join(" ");
             if(!message.channel.guild) return;
             if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
      if (!time) return message.channel.send('Please Type The Account Created Time [Days]');
      let embed = new Discord.RichEmbed()
      .setTitle('**Done The AntiFake Has Been Setup**')
      .addField('Account Create Time:', `${time}.`)
      .addField('Requested By:', `${message.author}`)
      .setThumbnail(message.author.avatarURL)
      .setFooter(`${client.user.username}`)
      message.channel.sendEmbed(embed)
      antijoin[message.guild.id] = {
      created: time,
      onoff: 'On',
      }
      fs.writeFile("./antijoin.json", JSON.stringify(antijoin), (err) => {
      if (err) console.error(err)
      })
         }
         if(args[0] === `${prefix}mcskin`) {
          const args = message.content.split(" ").slice(1).join(" ")
  if (!args) return message.channel.send("** write the skin name **");
  const image = new Discord.Attachment(`https://minotar.net/armor/body/${args}`, "skin.png");
message.channel.send(image)
  }
      
  if(args[0] == `${prefix}allbots`) {
    let i = 1;
        const botssize = message.guild.members.filter(m=>m.user.bot).map(m=>`${i++} - <@${m.id}>`);
          const embed = new Discord.RichEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setDescription(`**Found ${message.guild.members.filter(m=>m.user.bot).size} bots in this Server**
${botssize.join('\n')}`)
.setTimestamp();
message.channel.send(embed)

  }
  if (args[0] == `${prefix}hack`) {
           let args = message.content.split(' ').slice(1);
                 let virusname = args.join(' ');
               if (virusname < 1) {
                   return message.channel.send("``write the name of user``");
                                   }
               message.channel.send({embed: new Discord.RichEmbed().setTitle('Loading ' + virusname + "...").setColor(0xFF0000)}).then(function(m) {
           setTimeout(function() {
             m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓ ] 1%').setColor(0xFF0000)})
           }, 1000)
          setTimeout(function() {
             m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓] 25%').setColor(0xFF0000)})
           }, 2000)
         setTimeout(function() {
             m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Loading Discord Virus [▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ] 100%').setColor(0xFF0000)})
           }, 3000)
              setTimeout(function() {
             m.edit({embed: new Discord.RichEmbed().setTitle('[' + virusname + ']: Uploaded! Initiating explosion in 1...').setColor(0xFF0000)})
           }, 4000)
            setTimeout(function() {
             m.delete()
         }, 5000)
           setTimeout(function() {
             message.channel.send(':white_check_mark: | Hacked')
         }, 6000)
  }, 6000)
}
if (args[0] == `${prefix}webhooksay`) {
  if(!message.member.hasPermission("MANAGE_GUILD")) return;

  const args = message.content.substring(prefix.length).split(' ');

 message.delete();
args.shift() 
let msg = args.join(' ') 
message.channel.createWebhook(message.author.username, message.author.avatarURL) 
    .then(wb => {
        const user = new Discord.WebhookClient(wb.id, wb.token) 
        user.send(msg); 
        user.delete() 
    })
    .catch(console.error)
 }
 if(args[0] == `${prefix}botinvite`) {
const user = message.mentions.users.first();
if(!user) return message.channel.send('``' + '****' + '``')
if(!user.bot) return message.reply('\`You have made a mention for user not bot\`');
message.channel.send(`**Bot InviteURL : ** https://discordapp.com/oauth2/authorize?client_id=${user.id}&scope=bot&permissions=384064`)
  }
  if(message.content.startsWith(prefix + "toggleLink")) {
    if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
    if(!rab6[message.guild.id]) rab6[message.guild.id] = {
      onoff: 'Off'
    }
      if(rab6[message.guild.id].onoff === 'Off') return [message.channel.send(`**✅ The Invite Link Cmd Is __𝐎𝐍__ !**`), rab6[message.guild.id].onoff = 'On']
      if(rab6[message.guild.id].onoff === 'On') return [message.channel.send(`**⛔ The Invite Link Cmd Is __𝐎𝐅𝐅__ !**`), rab6[message.guild.id].onoff = 'Off']
      fs.writeFile("./rab6.json", JSON.stringify(rab6), (err) => {
        if (err) console.error(err)
        .catch(err => {
          console.error(err);
      });
        });
      }
      if (args[0] == `${prefix}link`) {
        const coolDown = new Set();

            if(!rab6[message.guild.id]) rab6[message.guild.id] = {
onoff: 'Off'
  }
if(rab6[message.guild.id].onoff === 'Off') return;
if(coolDown.has(message.author.id)) return message.channel.send(`**:stopwatch: | ${message.author.username}, your invite :yen: link refreshes in \`\`1 Day\`\`.**`);

message.channel.createInvite({

thing: true,

maxUses: 5,

maxAge: 86400

}).then(invite =>

message.author.sendMessage(invite.url)

)

message.channel.send("**The link was sent with a private message**")   .then(() => {     
coolDown.add(message.author.id);
});


message.author.send(`**Link duration: day
Number of uses of the link: 5**`)
setTimeout(() => {
  coolDown.remove(message.author.id);
  },86400000);
}
if(message.content.startsWith(prefix + "banslist")) {
  if(!message.guild) return;
          if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('**Sorry But You Dont Have Permission** `BAN_MEMBERS`' );
  message.guild.fetchBans()
  .then(bans => {
      let b = bans.size;
      let bb = bans.map(a => `${a}`).join(" - ");
      message.channel.send(`**\`${b}\` | ${bb}**`);
  });
}


if(args[0] == `${prefix}unban`) {
var uu = message.content.toLowerCase().split(" ");
var userM = message.mentions.users.first()
    if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(':x: | You dont have **BAN_MEMBERS** Permission!');
    if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.channel.send(':x: | I dont have **BAN_MEMBERS** Permission!');
    if(!uu[1]) return  message.channel.send(':x: | Please type the ID of user');
    if(uu[1].length < 16) return message.reply(':x: | This ID is not id user!');
    message.guild.fetchBans().then(bans => {
        var Found = bans.find(m => m.id === uu[1]);
        if(!Found) return message.channel.send(`:x: | <@${message.author.id}> This preson not have any ban from this server! :unlock:`);
        message.guild.unban(uu[1]);
        message.channel.send(`:white_check_mark: Successfully UNBANNED <@${args[1]}> From the server!`);
             if(log[message.guild.id].onoff === "On") {
        let ch = message.guild.channels.find("name", `${log[message.guild.id].channel}`)
        let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField("**Member:**", `${userM.user.tag} (${userM.id})`)
        .addField("**Action:**", `Unban`)
        .setColor("BLUE")
          ch.sendEmbed(embed)
               }
                     })    
  }

  if(args[0] == `${prefix}setMedia`) {
    const pics = JSON.parse(fs.readFileSync('./Data/pics.json' , 'utf8'));  
    let room = message.content.split(" ").slice(1);
    let findroom = message.guild.channels.find('name', `${room}`)
      if(!message.channel.guild) return;
      if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
      if(!room) return message.channel.send('Please Type The Channel Name')
      if(!findroom) return message.channel.send('Cant Find This Channel')
      let embed = new Discord.RichEmbed()
      .setTitle('**Done The MediaOnly Code Has Been Setup**')
      .addField('Channel:', `${room}`)
      .addField('Requested By', `${message.author}`)
      .setThumbnail(message.author.avatarURL)
      .setFooter(`${client.user.username}`)
      message.channel.sendEmbed(embed)
      pics[message.guild.id] = {
      channel: room,
      onoff: 'On'
      },
      fs.writeFile("./pics.json", JSON.stringify(pics), (err) => {
      if (err) console.error(err)
      
      })
    }
    if(args[0] == `${prefix}toggleMedia`) {
      if (!message.channel.guild) return;

  if(!message.channel.guild) return;
  if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
  if(!pics[message.guild.id]) pics[message.guild.id] = {
    onoff: 'Off'
  }
    if(pics[message.guild.id].onoff === 'Off') return [message.channel.send(`**The MediaCode Is __𝐎𝐍__ !**`), pics[message.guild.id].onoff = 'On']
    if(pics[message.guild.id].onoff === 'On') return [message.channel.send(`**The MediaCode Is __𝐎𝐅𝐅__ !**`), pics[message.guild.id].onoff = 'Off']
    fs.writeFile("./pics.json", JSON.stringify(pics), (err) => {
      if (err) console.error(err)
      
      })
    }
    if(message.content.startsWith(prefix + "infoMedia")) {
      let embed = new Discord.RichEmbed()
      .addField('Channel Status', `${pics[message.guild.id].onoff}`)
      .addField('Media Channel', `${pics[message.guild.id].channel}`)
      .addField('Requested By', `${message.author}`)
      .setThumbnail(message.author.avatarURL)
      .setFooter(`${client.user.username}`)
      message.channel.sendEmbed(embed)
        } 
        if (args[0] === `${prefix}say`) {
  var arg = message.content.split(" ").slice(1).join(" ")
          if(!message.member.hasPermission("MANAGE_GUILD")) return;

                message.delete()
                message.channel.sendMessage(`**${arg}**`) 
        }
  
          if (args[0] === `${prefix}embedsay`) {
  var arg = message.content.split(" ").slice(1).join(" ")
          if(!message.member.hasPermission("MANAGE_GUILD")) return;

                message.delete()
            let embed = new Discord.RichEmbed()
                .setDescription(`**${arg}**`) 
            message.channel.send(embed)
        }

          if(args[0] == `${prefix}autorole`) {
            if(!ar[message.guild.id]) ar[message.guild.id] = {
              onoff: 'Off',
              role: 'Member'
              }
              if(ar[message.guild.id].onoff === 'Off') return;
              
              if(!message.guild) return
              if(!ar[message.guild.id]) ar[message.guild.id] = {
              onoff: 'Off',
              role: 'Member'
              }
          let perms = message.member.hasPermission(`MANAGE_ROLES`)
          if(!perms) return message.reply(`You don't have permissions, required permission : Manage Roles.`)
          let args = message.content.split(" ").slice(1)
          if(!args.join(" ")) return message.reply(`${prefix}autorle toggle/setrole [ROLE NAME]`)
          let state = args[0]
          if(!state.trim().toLowerCase() == 'toggle' || !state.trim().toLowerCase() == 'setrole') return message.reply(`Please type a right state, ${prefix}modlogs toggle/setrole [ROLE NAME]`)
          if(state.trim().toLowerCase() == 'toggle') {
          if(ar[message.guild.id].onoff === 'Off') return [message.channel.send(`**The Autorole Is __𝐎𝐍__ !**`), ar[message.guild.id].onoff = 'On']
          if(ar[message.guild.id].onoff === 'On') return [message.channel.send(`**The Autorole Is __𝐎𝐅𝐅__ !**`), ar[message.guild.id].onoff = 'Off']
          }
          if(state.trim().toLowerCase() == 'set') {
          let newRole = message.content.split(" ").slice(2).join(" ")
          if(!newRole) return message.reply(`${prefix}autorole setrole [ROLE NAME]`)
          if(!message.guild.roles.find(`name`,newRole)) return message.reply(`I Cant Find This Role.`)
          ar[message.guild.id].role = newRole
          message.channel.send(`**The AutoRole Has Been Changed to ${newRole}.**`)
          }
            }
          if(message.content === prefix + 'info') {
          let perms = message.member.hasPermission(`MANAGE_GUILD`)
          if(!perms) return message.reply(`You don't have permissions.`)
          var embed = new Discord.RichEmbed()
          .addField(`Autorole : :sparkles:  `, `
          State : __${ar[message.guild.id].onoff}__
          Role : __${ar[message.guild.id].role}__`)
          .setColor(`BLUE`)
          message.channel.send({embed})
          }
          fs.writeFile("./AutoRole.json", JSON.stringify(ar), (err) => {
          if (err) console.error(err)
          });
          

//hello
   if(args[0] === `${prefix}setLeave`) {
    let messageArray = message.content.split(" ");

    let filter = m => m.author.id === message.author.id;
    let thisMessage;
    let thisFalse;

    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send('You don\'t have permission').then(msg => {
       msg.delete(4500);
       message.delete(4500);
    });
    
    message.channel.send(':pencil: **| Now write the message... :pencil2: **').then(msg => {

        message.channel.awaitMessages(filter, {
          max: 1,
          time: 90000,
          errors: ['time']
        })
        .then(collected => {
            collected.first().delete();
            thisMessage = collected.first().content;
            let boi;
            msg.edit(':scroll: **| Now write the channel name... :pencil2: **').then(msg => {
      
                message.channel.awaitMessages(filter, {
                  max: 1,
                  time: 90000,
                  errors: ['time']
                })
                .then(collected => {
                    collected.first().delete();
                    boi = collected.first().content;
                    msg.edit('✅ **| Done successfully..  **').then(msg => {
        
                      message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 90000,
                        errors: ['time']
                      })
                      let embed = new Discord.RichEmbed()
                      .setTitle('**Done The Leave Msg Code Has Been Setup**')
                      .addField('Message:', `${thisMessage}`)
                      .addField('Channel:', `${boi}`)
                      .setThumbnail(message.author.avatarURL)
                      .setFooter(`${client.user.username}`)
                     message.channel.sendEmbed(embed)
    welcome[message.guild.id] = {
leavechannel: boi,
leavemsg: thisMessage,
onoff: 'On',
leave: 'On'
    }
    fs.writeFile("./welcomer.json", JSON.stringify(welcome), (err) => {
    if (err) console.error(err)
  })
   } 
            )
        })
    })
})
    })
}


    if(args[0] == `${prefix}setWelcomer`) {
    let room = message.content.split(" ").slice(1);
    let findroom = message.guild.channels.find('name', `${room}`)
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
if(!room) return message.channel.send('Please Type The Channel Name')
if(!findroom) return message.channel.send('Cant Find This Channel')
let embed = new Discord.RichEmbed()
.setTitle('**Done The Welcome Code Has Been Setup**')
.addField('Channel:', `${room}`)
.addField('Requested By:', `${message.author}`)
.setThumbnail(message.author.avatarURL)
.setFooter(`${client.user.username}`)
message.channel.sendEmbed(embed)
welcome[message.guild.id] = {
channel: room,
onoff: 'On',
by: 'On',
dm: 'Off',
leave: 'Off'
}
fs.writeFile("./welcomer.json", JSON.stringify(welcome), (err) => {
if (err) console.error(err)
})
    }
    if(args[0] == `${prefix}toggleLeave`) {
      if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
      if(!welcome[message.guild.id]) welcome[message.guild.id] = {
          onoff: 'Off',
        leave: 'Off'
      }
        if(welcome[message.guild.id].leave === 'Off') return [message.channel.send(`**The Leave Msg Is __𝐎𝐍__ !**`), welcome[message.guild.id].leave = 'On']
        if(welcome[message.guild.id].leave === 'On') return [message.channel.send(`**The Leave Msg Is __𝐎𝐅𝐅__ !**`), welcome[message.guild.id].leave = 'Off']
        fs.writeFile("./welcome.json", JSON.stringify(welcome), (err) => {
          if (err) console.error(err)
          .catch(err => {
            console.error(err);
        });
          })
        }
        if(message.content.startsWith(prefix + "toggleWelcome")) {
          if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
          if(!welcome[message.guild.id]) welcome[message.guild.id] = {
            onoff: 'Off'
          }
            if(welcome[message.guild.id].onff === 'Off') return [message.channel.send(`**The Welcome Is __𝐎𝐍__ !**`), welcome[message.guild.id].onoff = 'On']
            if(welcome[message.guild.id].onoff === 'On') return [message.channel.send(`**The Welcome Is __𝐎𝐅𝐅__ !**`), welcome[message.guild.id].onoff = 'Off']
            fs.writeFile("./welcome.json", JSON.stringify(welcome), (err) => {
              if (err) console.error(err)
              .catch(err => {
                console.error(err);
            });
              })
            }
            if(message.content.startsWith(prefix + "toggleDmwelcome")) {
              if(!message.channel.guild) return;
              if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
              if(!welcome[message.guild.id]) welcome[message.guild.id] = {
                dm: 'Off'
              }
                if(welcome[message.guild.id].dm === 'Off') return [message.channel.send(`**The Welcome Dm Is __𝐎𝐍__ !**`), welcome[message.guild.id].dm = 'On']
                if(welcome[message.guild.id].dm === 'On') return [message.channel.send(`**The Welcome Dm Is __𝐎𝐅𝐅__ !**`), welcome[message.guild.id].dm = 'Off']
                fs.writeFile("./welcome.json", JSON.stringify(welcome), (err) => {
                  if (err) console.error(err)
                  .catch(err => {
                    console.error(err);
                });
                  })
                }
                if(message.content.startsWith(prefix + "toggleInvitedby")) {
                  if(!message.channel.guild) return;
                  if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
                  if(!welcome[message.guild.id]) welcome[message.guild.id] = {
                    by: 'Off'
                  }
                    if(welcome[message.guild.id].by === 'Off') return [message.channel.send(`**The Invited By Is __𝐎𝐍__ !**`), welcome[message.guild.id].by = 'On']
                    if(welcome[message.guild.id].by === 'On') return [message.channel.send(`**The Invited By Is __𝐎𝐅𝐅__ !**`), welcome[message.guild.id].by = 'Off']
                    fs.writeFile("./welcome.json", JSON.stringify(welcome), (err) => {
                      if (err) console.error(err)
                      .catch(err => {
                        console.error(err);
                    });
                      })
                    }
                    if (args[0] == `${prefix}roles`) {
                      if(!message.channel.guild) return;
                          var roles = message.guild.roles.map(roles => `${roles.name}, `)

                          message.channel.send(`\`\`\`${roles}\`\`\``);
                      }
});

let anti = JSON.parse(fs.readFileSync("./Data/antigreff.json", "UTF8"));
let config = JSON.parse(fs.readFileSync("./Data/config.json", "UTF8"));
client.on("message", message => {
    if (!message.channel.guild) return;
    let user = anti[message.guild.id + message.author.id]
    let num = message.content.split(" ").slice(2).join(" ");
    if (!anti[message.guild.id + message.author.id]) anti[message.guild.id + message.author.id] = {
        actions: 0
    }
    if (!config[message.guild.id]) config[message.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3,
        time: 30
    }
    if (message.content.startsWith(prefix + "settings limits")) {


        if (!message.member.hasPermission('MANAGE_GUILD')) return;
        if (message.content.startsWith(prefix + "settings limitsban")) {
            if (!num) return message.channel.send("**⇏ | send a number ! ! **");
            if (isNaN(num)) return message.channel.send("**⇏ | numbers only ! **");
            config[message.guild.id].banLimit = num;
            message.channel.send(`**⇏ | changed to : ${config[message.guild.id].banLimit} **`)
        }
        if (message.content.startsWith(prefix + "settings limitskick")) {
                        if (!num) return message.channel.send("**⇏ | send a number ! ! **");
                        if (isNaN(num)) return message.channel.send("**⇏ | numbers only ! **");
            config[message.guild.id].kickLimits = num;
            message.channel.send(`**⇏ | changed to : ${config[message.guild.id].kickLimits}**`)
        }
        if (message.content.startsWith(prefix + "settings limitsroleD")) {
                        if (!num) return message.channel.send("**⇏ | send a number ! ! **");
                        if (isNaN(num)) return message.channel.send("**⇏ | numbers only ! **");
            config[message.guild.id].roleDelLimit = num;
            message.channel.send(`**⇏ | changed to : ${config[message.guild.id].roleDelLimit}**`)
        }
        if (message.content.startsWith(prefix + "settings limitsroleC")) {
                        if (!num) return message.channel.send("**⇏ | send a number ! ! **");
                        if (isNaN(num)) return message.channel.send("**⇏ | numbers only ! **");
            config[message.guild.id].roleCrLimits = num;
            message.channel.send(`**⇏ | changed to : ${config[message.guild.id].roleCrLimits}**`)
        }
        if (message.content.startsWith(prefix + "settings limitschannelD")) {
                        if (!num) return message.channel.send("**⇏ | send a number ! ! **");
                        if (isNaN(num)) return message.channel.send("**⇏ | numbers only ! **");
            config[message.guild.id].chaDelLimit = num;
            message.channel.send(`**⇏ | changed to : ${config[message.guild.id].chaDelLimit}**`)
        }
        if (message.content.startsWith(prefix + "settings limitstime")) {
                        if (!num) return message.channel.send("**⇏ | send a number ! ! **");
                        if (isNaN(num)) return message.channel.send("**⇏ | numbers only ! **");
            config[message.guild.id].time = num;
            message.channel.send(`**⇏ | changed to : ${config[message.guild.id].time}**`)
        }
        fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
            if (e) throw e;
        });
        fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
            if (e) throw e;
        });
    }
});
client.on("channelDelete", async channel => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'CHANNEL_DELETE'
    }).then(audit => audit.entries.first())
    print(entry1.executor.username)
    const entry = entry1.executor
    if (!config[channel.guild.id]) config[channel.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[channel.guild.id + entry.id]) {
        anti[channel.guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
    } else {
        anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)
        print("TETS");
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
        if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].chaDelLimit) {
            anti[channel.guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }

    fs.writeFile("./Data/config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});

client.on("roleDelete", async channel => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'ROLE_DELETE'
    }).then(audit => audit.entries.first())
    print(entry1.executor.username)
    const entry = entry1.executor
    if (!config[channel.guild.id]) config[channel.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[channel.guild.id + entry.id]) {
        anti[channel.guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
    } else {
        anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)
        print("TETS");
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
        if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].roleDelLimit) {
            anti[channel.guild.id + entry.id].actions = "0"
            fs.writeFile("./Data/config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./Data/antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }

    fs.writeFile("./Data/config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});

client.on("roleCreate", async channel => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'ROLE_CREATE'
    }).then(audit => audit.entries.first())
    print(entry1.executor.username)
    const entry = entry1.executor
    if (!config[channel.guild.id]) config[channel.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[channel.guild.id + entry.id]) {
        anti[channel.guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
    } else {
        anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)
        print("TETS");
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
        if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].roleCrLimits) {
            anti[channel.guild.id + entry.id].actions = "0"
            fs.writeFile("./Data/config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }

    fs.writeFile("./Data/config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});

client.on("guildBanAdd", async (guild, user) => {
    const entry1 = await guild.channel.guild.fetchAuditLogs({
        type: 'MEMBER_BAN_ADD'
    }).then(audit => audit.entries.first())
    print(entry1.executor.username)
    const entry = entry1.executor
    if (!config[guild.id]) config[guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[guild.id + entry.id]) {
        anti[guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[guild.id + entry.id].actions = "0"
        }, config[guild.id].time * 1000)
    } else {
        anti[guild.id + entry.id].actions = Math.floor(anti[guild.id + entry.id].actions + 1)
        print("TETS");
        setTimeout(() => {
            anti[guild.id + entry.id].actions = "0"
        }, config[guild.id].time * 1000)
        if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
            anti[guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }

    fs.writeFile("./Data/config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});

client.on("guildKickAdd", async (guild, user) => {
    const entry1 = await guild.channel.fetchAuditLogs({
        type: 'MEMBER_KICK'
    }).then(audit => audit.entries.first())
    print(entry1.executor.username)
    const entry = entry1.executor
    if (!config[guild.id]) config[guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[guild.id + entry.id]) {
        anti[guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[guild.id + entry.id].actions = "0"
        }, config[guild.id].time * 1000)
    } else {
        anti[guild.id + entry.id].actions = Math.floor(anti[guild.id + entry.id].actions + 1)
        print("TETS");
        setTimeout(() => {
            anti[guild.id + entry.id].actions = "0"
        }, config[guild.id].time * 1000)
        if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
            anti[guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./Data/antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});

client.on("guildMemberRemove", async member => {
    const entry1 = await member.guild.fetchAuditLogs().then(audit => audit.entries.first())
    if (entry1.action === "MEMBER_KICK") {
        const entry2 = await member.guild.fetchAuditLogs({
            type: "MEMBER_KICK"
        }).then(audit => audit.entries.first())
        const entry = entry2.executor;
        if (!config[member.guild.id]) config[member.guild.id] = {
            banLimit: 3,
            chaDelLimit: 3,
            roleDelLimit: 3,
            kickLimits: 3,
            roleCrLimits: 3
        }
        if (!anti[member.guild.id + entry.id]) {
            anti[member.guild.id + entry.id] = {
                actions: 1
            }
            setTimeout(() => {
                anti[member.guild.id + entry.id].actions = "0"
            }, config[member.guild.id].time * 1000)
        } else {
            anti[member.guild.id + entry.id].actions = Math.floor(anti[member.guild.id + entry.id].actions + 1)
            print("TETS");
            setTimeout(() => {
                anti[member.guild.id + entry.id].actions = "0"
            }, config[member.guild.id].time * 1000)
            if (anti[member.guild.id + entry.id].actions >= config[member.guild.id].kickLimits) {
                anti[member.guild.id + entry.id].actions = "0"
                fs.writeFile("./Data/config.json", JSON.stringify(config, null, 2), function (e) {
                    if (e) throw e;
                });
                fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                    if (e) throw e;
                });
            }
        }

        fs.writeFile("./Data/config.json", JSON.stringify(config, null, 2), function (e) {
            if (e) throw e;
        });
        fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
            if (e) throw e;
        });
    }

})


client.on("guildMemberRemove", member => {
  if(!welcome[member.guild.id]) welcome[member.guild.id] = {
onoff: 'Off',
leave: 'Off'
}

if(welcome[member.guild.id].onoff === 'Off') return;
      if(welcome[member.guild.id].leave === 'Off') return;
let welcomer = member.guild.channels.find('name', `${welcome[member.guild.id].leavechannel}`)
if(!welcomer) return;
welcomer.send(`${member} ${welcome[member.guild.id].leavemsg}`);
})          

client.on("guildMemberAdd", member => {
  if(!welcome[member.guild.id]) welcome[member.guild.id] = {
onoff: 'Off'
}
if(welcome[member.guild.id].onoff === 'Off') return;
let welcomer = member.guild.channels.find('name', `${welcome[member.guild.id].channel}`)
let memberavatar = member.user.avatarURL
if (!welcomer) return;
if(welcomer) {
moment.locale('ar-ly');
var h = member.user;
let heroo = new Discord.RichEmbed()
.setColor('RANDOM')
.setThumbnail(h.avatarURL)
.setAuthor(h.username,h.avatarURL)
.addField(': The date of your account',`${moment(member.user.createdAt).format('D/M/YYYY h:mm a')} **\n** \`${moment(member.user.createdAt).fromNow()}\``,true)
.setFooter(`${h.tag}`,"https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif")
welcomer.send({embed:heroo});
}})



client.on('guildMemberAdd',async member => {
  if(!welcome[member.guild.id]) welcome[member.guild.id] = {
onoff: 'Off'
}
if(welcome[member.guild.id].onoff === 'Off') return;
const Canvas = require('canvas');
const jimp = require('jimp');
const w = ['./welcome_4.png'];
let Image = Canvas.Image,
    canvas = new Canvas(800, 300),
    ctx = canvas.getContext('2d');
ctx.patternQuality = 'bilinear';
ctx.filter = 'bilinear';
ctx.antialias = 'subpixel';
ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
ctx.shadowOffsetY = 2;
ctx.shadowBlur = 2;
ctx.stroke();
ctx.beginPath();

fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
    if (err) return print(err);
    let BG = Canvas.Image;
    let ground = new Image;
    ground.src = Background;
    ctx.drawImage(ground, 0, 0, 800, 300);

})

        let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".png" : member.user.displayAvatarURL;
        jimp.read(url, (err, ava) => {
            if (err) return print(err);
            ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
         if (err) return print(err);

  ctx.font = '36px Arial';
  ctx.fontSize = '72px';
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(member.user.username, 545, 177);
 
  ctx.font = '16px Arial Bold';
  ctx.fontSize = '72px';
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.fillText(`Your The Member ${member.guild.memberCount}`, 580, 200);
 
  let Avatar = Canvas.Image;
  let ava = new Avatar;
  ava.src = buf;
  ctx.beginPath();
  ctx.arc(169.5, 148, 126.9, -100, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(ava, 36, 21, 260, 260);
   
  let c = member.guild.channels.find('name', `${welcome[member.guild.id].channel}`)
  if(!c) return;
  c.sendFile(canvas.toBuffer());

});
});
});

const invites = {};

const wait = require('util').promisify(setTimeout);

client.on('ready', () => {
wait(1000);

client.guilds.forEach(g => {
g.fetchInvites().then(guildInvites => {
invites[g.id] = guildInvites;
});
});
});

client.on('guildMemberAdd', member => {
          if(!welcome[member.guild.id]) welcome[member.guild.id] = {
        by: 'Off'
      }
if(welcome[member.guild.id].by === 'Off') return;
member.guild.fetchInvites().then(guildInvites => {
const ei = invites[member.guild.id];
invites[member.guild.id] = guildInvites;
const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
const inviter = client.users.get(invite.inviter.id);
const logChannel = member.guild.channels.find(channel => channel.name === `${welcome[member.guild.id].channel}`);
if(!logChannel) return;
setTimeout(() => {
logChannel.send(`Invited By: <@${inviter.id}>`);
},2000)
});
});

client.on("guildMemberAdd", member => {
          if(!welcome[member.guild.id]) welcome[member.guild.id] = {
        dm: 'Off'
      }
if(welcome[member.guild.id].dm === 'Off') return;
member.createDM().then(function (channel) {
return channel.send(`:rose:  Welcome To Our Server :rose: 
:crown: Member Name  ${member} :crown:  
Your Member Number ${member.guild.memberCount} `) 
}).catch(console.error)
})



client.on('message', message => {
  if (!message.channel.guild) return;
if(message.author.bot) return;

if(!pics[message.guild.id]) pics[message.guild.id] = {
onoff: 'Off'
}
if(pics[message.guild.id].onoff === 'Off') return;

if(message.channel.name !== `${pics[message.guild.id].channel}`) return;

let types = [
'jpg',
'jpeg',
'png',
'http://prntscr.com/'
]
if (message.attachments.size <= 0) {
message.delete();
message.channel.send(`${message.author}, This Channel For Media 🖼️ Only !`) 
.then(msg => {
setTimeout(() => {
msg.delete();
}, 5000)
})
return;
}
if(message.attachments.size >= 1) {
let filename = message.attachments.first().filename
print(filename);
if(!types.some( type => filename.endsWith(type) )) {
message.delete();
message.channel.send(`${message.author}, This Channel For Media 🖼️ Only !`)
.then(msg => {
setTimeout(() => {
msg.delete();
}, 5000)
})
.catch(err => {
console.error(err);
});
}
}
})




client.mutes =  JSON.parse(fs.readFileSync('./Data/mutes.json' , 'utf8'));
client.bans = JSON.parse(fs.readFileSync('./Data/bans.json' , 'utf8'));


client.on(`ready`, () => {
    const toTime = require("to-time")
const moment = require("moment")
    print(`Logged in as ${client.user.tag}!`);
    client.user.setStatus("online")
    client.setInterval(() => {
        for (let i in client.mutes) {
            let time = client.mutes[i].time;
            let guildID = client.mutes[i].guildid;
            let member = client.mutes[i].muted
            let roleid = client.mutes[i].roleid
            let mutereason = "Mute time is over"
            if (Date.now() > time) {
                client.guilds.get(guildID).members.get(`${member}`).removeRole(roleid, mutereason)
                delete client.mutes[i];
                fs.writeFile("./Data/bans.json", JSON.stringify(client.mutes, null, 4), err => {
                    if (err) throw err;
                })
            }
        }
    }, 5000)
});
client.on("guildMemberAdd", async (member) => {
    const toTime = require("to-time")
const moment = require("moment")
    for (let i in client.mutes) {
        let data = client.mutes[i];
        if(data === undefined) return;
        if(data.guildid !== member.guild.id) return;
        let mutereason = "by retsu bot"
        let guildID = client.mutes[i].guildid;
        if (member.id === client.mutes[i].muted) {
            client.guilds.get(`${guildID}`).members.get(`${member.id}`).addRole(`${client.mutes[i].roleid}`, mutereason)
        } else {
            return;
        }
    }
   
})
client.on("message", async message => {
    const toTime = require("to-time")
const moment = require("moment")
    let messageArray = message.content.split(" ");
    let msg = message;
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    if (cmd === (prefix + "mute")) {
        let themuteguy = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!themuteguy) return message.channel.send("**:x: | Please mention a member !**")
        let roleid = message.guild.roles.find(c => c.name === "Muted")
            if(themuteguy.roles.has(roleid.id)) return message.channel.send(":x: | This member already is muted")
 
        let time = messageArray[2]
        if(!time.match(/[1-60][s,m,h,d,w]/g))  return message.channel.send(':x: | This Time Is Incorrect')
             let mutereason = messageArray[3]
        if (!mutereason) {
          if (!roleid) {
            try {
                muterole = await message.guild.createRole({
                    name: "Muted",
                    permissions: []
                })
                message.guild.channels.forEach(async (channel) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (e) {
                print(e.stack);
            }
        }
        client.mutes.count+++1
        if(isNaN(client.mutes.count)) client.mutes.count = 0+1;
        client.mutes[client.mutes.count] = {
            time: Date.now() + ms(time),
            muted: themuteguy.id,
            roleid: roleid.id,
            guildid: message.guild.id
        }
        await message.guild.member(themuteguy.id).addRole(roleid.id, "No Reason")
      await message.channel.send(`Successfully muted **${themuteguy.user.tag}**`)
          
        }
        if (!roleid) {
            try {
                muterole = await message.guild.createRole({
                    name: "Muted",
                    permissions: []
                })
                message.guild.channels.forEach(async (channel) => {
                    await channel.overwritePermissions(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false
                    });
                });
            } catch (e) {
                print(e.stack);
            }
        }
        client.mutes.count+++1
        if(isNaN(client.mutes.count)) client.mutes.count = 0+1;
        client.mutes[client.mutes.count] = {
            time: Date.now() + ms(time),
            muted: themuteguy.id,
            roleid: roleid.id,
            guildid: message.guild.id
        }
        await message.guild.member(themuteguy.id).addRole(roleid.id, mutereason)
      await message.channel.send(`Successfully muted **${themuteguy.user.tag}**`)
      if(log[message.guild.id].onoff === "On") {
        let ch = message.guild.channels.find("name", `${log[message.guild.id].channel}`)
        let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField("**Member:**", `${themuteguy.user.tag} (${themuteguy.id})`)
        .addField("**Action:**", `Mute`)
        .addField('**Reason:**' , mutereason || "No Reason")
        .setColor("#500c0c")
          ch.sendEmbed(embed)
      } 
        fs.writeFile("./Data/mutes.json", JSON.stringify(client.mutes, null, 4), err => {
            if (err) throw err;

        })
    }
})



client.on(`ready`, () => {
    const toTime = require("to-time")
const moment = require("moment")
    client.setInterval(() => {
        for (let i in client.bans) {
            let time = client.bans[i].time;
            let guildID = client.bans[i].guildid;
            let member = client.bans[i].banned
            let bannedreason = "banned time is over"
            if (Date.now() > time) {
              if(!client.bans[i]) return;
                let s = client.guilds.get(guildID).members.get(`${member}`).unban(bannedreason) 
                
                delete client.bans[i];
                fs.writeFile("./Data/bans.json", JSON.stringify(client.bans, null, 4), err => {
                    if (err) throw err;
                })
            }
        }
    }, 5000)
});
client.on("guildMemberAdd", async (member) => {
    const toTime = require("to-time")
const moment = require("moment")
    for (let i in client.bans) {
        let data = client.bans[i];
        if(data === undefined) return;
        if(data.guildid !== member.guild.id) return;
        let bannedreason = "by retsu bot"
        let guildID = client.bans[i].guildid;
        if (member.id === client.bans[i].muted) {
            client.guilds.get(`${guildID}`).members.get(`${member.id}`).addRole(`${client.bans[i].roleid}`, bannedreason)
        } else {
            return;
        }
    }
   
})
client.on("message", async message => {
    const toTime = require("to-time")
const moment = require("moment")
    let messageArray = message.content.split(" ");
    let msg = message;
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    if (cmd === (prefix + "ban")) {
        let thebanguy = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!thebanguy) return message.channel.send("**:x: | Please mention a member !**").then(msg => msg.delete(8000))
        if (!message.guild.member(thebanguy).bannable) return message.reply("**:x:I Don't Have Permission For Ban This User**");

        let time = messageArray[2]
        if(!time) return message.channel.sendEmbed(":x: | You Should Type The Time Of Banned !")
        if(!time.match(/[1-60][s,m,h,d,w]/g))  return message.channel.send(':x: | This Time Is Incorrect')
              let bannedreason = messageArray[3]
        if (!bannedreason) {
          
           client.bans.count+++1
        if(isNaN(client.bans.count)) client.bans.count = 0+1;
        client.bans[client.bans.count] = {
            time: Date.now() + ms(time),
            banned: thebanguy.id,
            guildid: message.guild.id
        }
        await message.guild.member(thebanguy.id).ban({reason: "No Reason"})
          
        }
        client.bans.count+++1
        if(isNaN(client.bans.count)) client.bans.count = 0+1;
        client.bans[client.bans.count] = {
            time: Date.now() + ms(time),
            banned: thebanguy.id,
            guildid: message.guild.id
        }
        await message.guild.member(thebanguy.id).ban({reason: bannedreason})
            await message.channel.send(`Successfully banned **${thebanguy.user.tag}**`)
      if(log[message.guild.id].onoff === "On") {
        let ch = message.guild.channels.find("name", `${log[message.guild.id].channel}`)
        let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField("**Member:**", `${thebanguy.user.tag} (${thebanguy.id})`)
        .addField("**Action:**", `Ban`)
        .addField("**Reason:**", bannedreason || "No Reason")
        .setColor("#500c0c")
          ch.sendEmbed(embed)
      }
        fs.writeFile("./Data/bans.json", JSON.stringify(client.bans, null, 4), err => {
            if (err) throw err;

        })
    }
    })


   client.on('message', message => {
       if (message.author.kick) return;
       if (!message.content.startsWith(prefix)) return;
     
       let command = message.content.split(" ")[0];
       command = command.slice(prefix.length);
     
       let args = message.content.split(" ").slice(1);
     
       if (command == "kick") {
         if (!message.channel.guild) return;
     
       if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.reply("You Don't Have KICK_MEMBERS Permission").then(msg => msg.delete(5000));
       if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.reply("I Don't Have KICK_Members Permission");
       let user = message.mentions.users.first();
       let reason = message.content.split(" ").slice(2).join(" ");
     
       if (message.mentions.users.size < 1) return message.reply("Mention Someone");
       if(!reason) reason = "Null";
       if (!message.guild.member(user)
       .bannable) return message.reply("I can not be higher than my rank");
     
       message.guild.member(user).kick(7, user);
     
     
      message.channel.send(`Successfully kicked **${user.user.tag}**`)
      if(log[message.guild.id].onoff === "On") {
        let ch = message.guild.channels.find("name", `${log[message.guild.id].channel}`)
        let embed = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .addField("**Member:**", `${user.user.tag} (${user.id})`)
        .addField("**Action:**", `Kick`)
        .addField("**Reason:**", `${reason}`)
          ch.sendEmbed(embed)
      }
         message.delete()
     }
     })

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('http://www.gmail.com/')){
          if(!spread[message.guild.id]) spread[message.guild.id] = {
      onoff: 'Off'
          }
      if(spread[message.guild.id].onoff === 'Off') return;
      message.delete()
  return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
  }
});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('https://www.snapchat.com/')){
          if(!spread[message.guild.id]) spread[message.guild.id] = {
      onoff: 'Off'

          }
      if(spread[message.guild.id].onoff === 'Off') return;
      message.delete()
  return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
  }
});


client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('https://www.instagram.com/')){
          if(!spread[message.guild.id]) spread[message.guild.id] = {
      onoff: 'Off'
          }
      if(spread[message.guild.id].onoff === 'Off') return;
      message.delete()
  return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
  }
});


client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('https://www.twitter.com/')){
          if(!spread[message.guild.id]) spread[message.guild.id] = {
      onoff: 'Off'
          }
      if(spread[message.guild.id].onoff === 'Off') return;
      message.delete()
  return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
  }
});


client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('http://www.facebook.com/')){
          if(!spread[message.guild.id]) spread[message.guild.id] = {
      onoff: 'Off'
          }
      if(spread[message.guild.id].onoff === 'Off') return;
      message.delete()
  return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
  }
});



client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('https://www.youtube.com/')){
          if(!spread[message.guild.id]) spread[message.guild.id] = {
      onoff: 'Off'
          }
      if(spread[message.guild.id].onoff === 'Off') return;
      message.delete()
  return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
  }

});

client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('https://www.discordapp.com/')){
          if(!spread[message.guild.id]) spread[message.guild.id] = {
      onoff: 'Off'
          }
      if(spread[message.guild.id].onoff === 'Off') return;
      message.delete()
  return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
  }

});
client.on('message', message => {
  var args = message.content.split(/[ ]+/)
  if(message.content.includes('https://discord.gg/')){
          if(!spread[message.guild.id]) spread[message.guild.id] = {
      onoff: 'Off'
          }
      if(spread[message.guild.id].onoff === 'Off') return;
      message.delete()
  return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
  }

});

client.on("guildMemberAdd", async member => {
  if(!antijoin[member.guild.id]) antijoin[member.guild.id] = {
    onoff: 'Off'
  }
  if(antijoin[member.guild.id].onoff === 'Off') return;
  if(!member.user.bot) return;
    let accounttime = `${antijoin[member.guild.id].created}`
    let moment2 = require('moment-duration-format'),
        moment = require("moment"),
        date = moment.duration(new Date() - member.user.createdAt).format("d");
  
    if(date < accounttime) {
      member.ban(`Member account age is lower than ${antijoin[member.guild.id].created} days.`)
    }
  });

client.on("guildMemberRemove", member=>{
    if(onoffmembers[member.guild.id].onoff === 'Off') return;
  let roles = [];
  member.roles.forEach(r=> roles.push(r.id));
  members[member.guild.id][member.id] = roles;
  saveChanges();
});
client.on("guildMemberAdd", member=> {
    if(onoffmembers[member.guild.id].onoff === 'Off') return;
  if(members[member.guild.id][member.id] !== undefined){
    member.addRoles(members[member.guild.id][member.id], "Returning roles after leaving");
    members[member.guild.id][member.id] = [];
  };
  saveChanges();
});

client.on('messageDelete', message => {

	if(message.author.bot) return;
	if(message.channel.type.toLowerCase() == 'dm') return;
	if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
				        if(!log[message.guild.id]) log[message.guild.id] = {
          onoff: 'Off'
        }
    if(log[message.guild.id].onoff === 'Off') return;
	var logChannel = message.guild.channels.find(c => c.name === `${log[message.guild.id].channel}`);
	if(!logChannel) return;

	let messageDelete = new Discord.RichEmbed()
	.setTitle('**[MESSAGE DELETE]**')
	.setColor('RED')
	.setThumbnail(message.author.avatarURL)
	.setDescription(`**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``)
	.setTimestamp()
	.setFooter(message.guild.name, message.guild.iconURL)

	logChannel.send(messageDelete);
});
client.on('messageUpdate', (oldMessage, newMessage) => {

	if(oldMessage.author.bot) return;
	if(!oldMessage.channel.type.toLowerCase() == 'dm') return;
	if(!oldMessage.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!oldMessage.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
				        if(!log[oldMessage.guild.id]) log[oldMessage.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldMessage.guild.id].onoff === 'Off') return;
	var logChannel = oldMessage.guild.channels.find(c => c.name === `${log[oldMessage.guild.id].channel}`);
	if(!logChannel) return;

	if(oldMessage.content.startsWith('https://')) return;

	let messageUpdate = new Discord.RichEmbed()
	.setTitle('**[MESSAGE EDIT]**')
	.setThumbnail(oldMessage.author.avatarURL)
	.setColor('BLUE')
	.setDescription(`**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``)
	.setTimestamp()
	.setFooter(oldMessage.guild.name, oldMessage.guild.iconURL)

	logChannel.send(messageUpdate);
});


client.on('roleCreate', role => {

	if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[role.guild.id]) log[role.guild.id] = {
          onoff: 'Off'
        }
    if(log[role.guild.id].onoff === 'Off') return;
	var logChannel = role.guild.channels.find(c => c.name === `${log[role.guild.id].channel}`);
	if(!logChannel) return;

	role.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let roleCreate = new Discord.RichEmbed()
		.setTitle('**[ROLE CREATE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('GREEN')
		.setTimestamp()
		.setFooter(role.guild.name, role.guild.iconURL)

		logChannel.send(roleCreate);
	})
});
client.on('roleDelete', role => {

	if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[role.guild.id]) log[role.guild.id] = {
          onoff: 'Off'
        }
    if(log[role.guild.id].onoff === 'Off') return;
	var logChannel = role.guild.channels.find(c => c.name === `${log[role.guild.id].channel}`);
	if(!logChannel) return;

	role.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let roleDelete = new Discord.RichEmbed()
		.setTitle('**[ROLE DELETE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('RED')
		.setTimestamp()
		.setFooter(role.guild.name, role.guild.iconURL)

		logChannel.send(roleDelete);
	})
});
client.on('roleUpdate', (oldRole, newRole) => {

	if(!oldRole.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!oldRole.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[oldRole.guild.id]) log[oldRole.guild.id] = {
          onoff: 'Off'
	        }
    if(log[oldRole.guild.id].onoff === 'Off') return;
	var logChannel = oldRole.guild.channels.find(c => c.name === `${log[oldRole.guild.id].channel}`);
	if(!logChannel) return;

	oldRole.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(oldRole.name !== newRole.name) {
            if(log[oldRole.guild.id].onoff === 'Off') return;
			let roleUpdateName = new Discord.RichEmbed()
			.setTitle('**[ROLE NAME UPDATE]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldRole.guild.name, oldRole.guild.iconURL)

			logChannel.send(roleUpdateName);
		}
		if(oldRole.hexColor !== newRole.hexColor) {
			if(oldRole.hexColor === '#000000') {
				var oldColor = '`Default`';
			}else {
				var oldColor = oldRole.hexColor;
			}
			if(newRole.hexColor === '#000000') {
				var newColor = '`Default`';
			}else {
				var newColor = newRole.hexColor;
            }
            if(log[oldRole.guild.id].onoff === 'Off') return;
			let roleUpdateColor = new Discord.RichEmbed()
			.setTitle('**[ROLE COLOR UPDATE]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldRole.guild.name, oldRole.guild.iconURL)

			logChannel.send(roleUpdateColor);
		}
	})
});

client.on('channelCreate', channel => {

	if(!channel.guild) return;
	if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[channel.guild.id]) log[channel.guild.id] = {
          onoff: 'Off'
        }
    if(log[channel.guild.id].onoff === 'Off') return;
	var logChannel = channel.guild.channels.find(c => c.name === `${log[channel.guild.id].channel}`);
	if(!logChannel) return;

	if(channel.type.toLowerCase() == 'text') {
		var roomType = 'Text';
	}else
	if(channel.type.toLowerCase() == 'voice') {
		var roomType = 'Voice';
	}else
	if(channel.type.toLowerCase() == 'category') {
		var roomType = 'Category';
	}

	channel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let channelCreate = new Discord.RichEmbed()
		.setTitle('**[CHANNEL CREATE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('GREEN')
		.setTimestamp()
		.setFooter(channel.guild.name, channel.guild.iconURL)

		logChannel.send(channelCreate);
	})
});
client.on('channelDelete', channel => {
	if(!channel.guild) return;
	if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[channel.guild.id]) log[channel.guild.id] = {
          onoff: 'Off'
        }
    if(log[channel.guild.id].onoff === 'Off') return;
	var logChannel = channel.guild.channels.find(c => c.name === `${log[channel.guild.id].channel}`);
	if(!logChannel) return;

	if(channel.type.toLowerCase() == 'text') {
		var roomType = 'Text';
	}else
	if(channel.type.toLowerCase() == 'voice') {
		var roomType = 'Voice';
	}else
	if(channel.type.toLowerCase() == 'category') {
		var roomType = 'Category';
	}

	channel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		let channelDelete = new Discord.RichEmbed()
		.setTitle('**[CHANNEL DELETE]**')
		.setThumbnail(userAvatar)
		.setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setColor('RED')
		.setTimestamp()
		.setFooter(channel.guild.name, channel.guild.iconURL)

		logChannel.send(channelDelete);
	})
});
client.on('channelUpdate', (oldChannel, newChannel) => {
	if(!oldChannel.guild) return;
	        if(!log[oldChannel.guild.id]) log[oldChannel.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldChannel.guild.id].onoff === 'Off') return;
	var logChannel = oldChannel.guild.channels.find(c => c.name === `${log[oldChannel.guild.id].channel}`);
	if(!logChannel) return;

	if(oldChannel.type.toLowerCase() == 'text') {
		var channelType = 'Text';
	}else
	if(oldChannel.type.toLowerCase() == 'voice') {
		var channelType = 'Voice';
	}else
	if(oldChannel.type.toLowerCase() == 'category') {
		var channelType = 'Category';
	}

	oldChannel.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(oldChannel.name !== newChannel.name) {
			let newName = new Discord.RichEmbed()
			.setTitle('**[CHANNEL EDIT]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)

			logChannel.send(newName);
		}
		if(oldChannel.topic !== newChannel.topic) {
            if(log[oldChannel.guild.id].onoff === 'Off') return;
			let newTopic = new Discord.RichEmbed()
			.setTitle('**[CHANNEL EDIT]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic || 'NULL'}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic || 'NULL'}\`\`\`\n**Channel:** ${oldChannel} (ID: ${oldChannel.id})\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)

			logChannel.send(newTopic);
		}
	})
});


client.on('guildBanAdd', (guild, user) => {

	if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[user.guild.id]) log[guild.guild.id] = {
          onoff: 'Off'
        }
    if(log[user.guild.id].onoff === 'Off') return;
	var logChannel = guild.channels.find(c => c.name === `${log[guild.guild.id].channel}`);
	if(!logChannel) return;

	guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(userID === client.user.id) return;

		let banInfo = new Discord.RichEmbed()
		.setTitle('**[BANNED]**')
		.setThumbnail(userAvatar)
		.setColor('DARK_RED')
		.setDescription(`**\n**:airplane: Successfully \`\`BANNED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setTimestamp()
		.setFooter(guild.name, guild.iconURL)

		logChannel.send(banInfo);
	})
});
client.on('guildBanRemove', (guild, user) => {
	if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
	        if(!log[guild.guild.id]) log[guild.guild.id] = {
          onoff: 'Off'
        }
    if(log[guild.guild.id].onoff === 'Off') return;
	var logChannel = guild.channels.find(c => c.name === `${log[guild.guild.id].channel}`);
	if(!logChannel) return;

	guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(userID === client.user.id) return;

		let unBanInfo = new Discord.RichEmbed()
		.setTitle('**[UNBANNED]**')
		.setThumbnail(userAvatar)
		.setColor('GREEN')
		.setDescription(`**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
		.setTimestamp()
		.setFooter(guild.name, guild.iconURL)

		logChannel.send(unBanInfo);
	})
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
	if(!oldMember.guild) return;
		        if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldMember.guild.id].onoff === 'Off') return;
	var logChannel = oldMember.guild.channels.find(c => c.name === `${log[oldMember, newMember.guild.id].channel}`);
	if(!logChannel) return;

	oldMember.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userAvatar = logs.entries.first().executor.avatarURL;
		var userTag = logs.entries.first().executor.tag;

		if(oldMember.nickname !== newMember.nickname) {
			if(oldMember.nickname === null) {
				var oldNM = '`His Orginal Name`';
			}else {
				var oldNM = oldMember.nickname;
			}
			if(newMember.nickname === null) {
				var newNM = '`His Orginal Name`';
			}else {
				var newNM = newMember.nickname;
			}

			let updateNickname = new Discord.RichEmbed()
			.setTitle('**[UPDATE MEMBER NICKNAME]**')
			.setThumbnail(userAvatar)
			.setColor('BLUE')
			.setDescription(`**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldNM}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(oldMember.guild.name, oldMember.guild.iconURL)

			logChannel.send(updateNickname);
		}
		if(oldMember.roles.size < newMember.roles.size) {
			let role = newMember.roles.filter(r => !oldMember.roles.has(r.id)).first();
					        if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
            if(log[oldMember.guild.id].onoff === 'Off') return;
			let roleAdded = new Discord.RichEmbed()
			.setTitle('**[ADDED ROLE TO MEMBER]**')
			.setThumbnail(oldMember.guild.iconURL)
			.setColor('GREEN')
			.setDescription(`**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(roleAdded);
		}
		if(oldMember.roles.size > newMember.roles.size) {
			let role = oldMember.roles.filter(r => !newMember.roles.has(r.id)).first();
					        if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
            if(log[oldMember, newMember.guild.id].onoff === 'Off') return;
			let roleRemoved = new Discord.RichEmbed()
			.setTitle('**[REMOVED ROLE FROM MEMBER]**')
			.setThumbnail(oldMember.guild.iconURL)
			.setColor('RED')
			.setDescription(`**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(roleRemoved);
		}
	})
	if(oldMember.guild.owner.id !== newMember.guild.owner.id) {
	  		        if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
        if(log[oldMember, newMember.guild.id].onoff === 'Off') return;
        let newOwner = new Discord.RichEmbed()
		.setTitle('**[UPDATE GUILD OWNER]**')
		.setThumbnail(oldMember.guild.iconURL)
		.setColor('GREEN')
		.setDescription(`**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`)
		.setTimestamp()
		.setFooter(oldMember.guild.name, oldMember.guild.iconURL)

		logChannel.send(newOwner);
	}
});


client.on('voiceStateUpdate', (voiceOld, voiceNew) => {

	if(!voiceOld.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
	if(!voiceOld.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
			        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
    if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
	var logChannel = voiceOld.guild.channels.find(c => c.name === `${log[voiceOld, voiceNew.guild.id].channel}`);
	if(!logChannel) return;

	voiceOld.guild.fetchAuditLogs().then(logs => {
		var userID = logs.entries.first().executor.id;
		var userTag = logs.entries.first().executor.tag;
		var userAvatar = logs.entries.first().executor.avatarURL;

		if(voiceOld.serverMute === false && voiceNew.serverMute === true) {
			let serverMutev = new Discord.RichEmbed()
			.setTitle('**[VOICE MUTE]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/pWQaw076OHwVIFZyeFoLXvweo0T_fDz6U5C9RBlw_fQ/https/cdn.pg.sa/UosmjqDNgS.png')
			.setColor('RED')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverMutev);
		}
		if(voiceOld.serverMute === true && voiceNew.serverMute === false) {
		  			        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
			let serverUnmutev = new Discord.RichEmbed()
			.setTitle('**[VOICE UNMUTE]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png')
			.setColor('GREEN')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverUnmutev);
		}
		if(voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
		  			        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
			let serverDeafv = new Discord.RichEmbed()
			.setTitle('**[VOICE DEAF]**')
			.setThumbnail('https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png')
			.setColor('RED')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverDeafv);
		}
		if(voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
		  			        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
			let serverUndeafv = new Discord.RichEmbed()
			.setTitle('**[VOICE UNDEAF]**')
			.setThumbnail('https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png')
			.setColor('GREEN')
			.setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
			.setTimestamp()
			.setFooter(userTag, userAvatar)

			logChannel.send(serverUndeafv);
		}
	})
	
	if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && voiceNew.voiceChannel && voiceOld.voiceChannel != null) {
	  			        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
        if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
		let voiceLeave = new Discord.RichEmbed()
		.setTitle('**[CHANGED VOICE ROOM]**')
		.setColor('GREEN')
		.setThumbnail(voiceOld.user.avatarURL)
		.setDescription(`**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**To:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
		.setTimestamp()
		.setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)

		logChannel.send(voiceLeave);
	}
});





function saveChanges(){
  fs.writeFileSync("./Data/members.json", JSON.stringify(members, null, 4));
};
function save(){
  fs.writeFileSync("./Data/warnings.json", JSON.stringify(warnings, null, 4));
};

client.on("error", function() {
  return print(arguments[0])
  });
client.login(configp.token)
