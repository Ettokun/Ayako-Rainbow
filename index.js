const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require("discord.js");
const settings = require("./your_settings.json")
const config = require("./config.json");
const fs = require("fs");
let client = new Discord.Client();
client.commands = new Discord.Collection();
const queue = new Map();
var color = Math.floor(Math.random() * 16777214) + 1

client.on('ready', function() {
  console.log(`Bot has started, with ${client.users.size} users, ${client.guilds.size} guilds, ${client.channels.size}`); 
      setInterval(async () => {
    const statuslist = [
     ` Prefix ar~help or @Ayako Rainbow`,
     ` Ayako Official Server`,
     ` v1.2.8| ${client.guilds.size} Server`,
     ` v1.2.8| ${client.users.size}`,

    ]
    const random = Math.floor(Math.random() * statuslist.length);
    try {
      await client.user.setPresence({
        game: {
          name: `${statuslist[random]}`, 
          type: "STREAMING",
          url: 'https://www.twitch.tv/arilofficial'
        },
        status: "do not disturb"
      });
    } catch (error) {
      console.error(error);
    }
  }, 2000);
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', "welcome");
  if (!channel) return;
	//Embed Creation
	let memberEmbed = new Discord.RichEmbed()
	.setColor("RANDOM")
  .setTitle('Welcome member please check rules!.')
	.setDescription(`**${member}** Has joined the server. :tada:`)
	.setFooter(`ID - ${member.id}`)
.setFooter('All rights reserved ©ArilOfficial Development in 2019') 
  .setTimestamp();

  channel.send(memberEmbed);
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', "welcome");
  if (!channel) return;
	//Embed Creation
	let memberEmbed2 = new Discord.RichEmbed()
	.setColor("RANDOM")
 .setTitle('Thanks you for participation.')
	.setDescription(`**${member}** Has leave the server. :broken_heart:`)
	.setFooter(`ID - ${member.id}`)
.setFooter('All rights reserved ©ArilOfficial Development in 2019') 
  .setTimestamp();

  channel.send(memberEmbed2);
});

client.on("guildMemberAdd", member => {
	let autorole = JSON.parse(fs.readFileSync("./autorole.json", "utf8"));
	if (!autorole[member.guild.id]) { // jika tidak ada autorole yang di set, agar tidak error saat ada yang join
		autorole[member.guild.id] = {
			autorole: config.autorole
		};
	}
	var role = autorole[member.guild.id].role;
	if (!role) return; // jika autorole 0 maka akan dihentikan dan tidak menyebabkan error
	member.addRole(role);
});

client.on('guildMemberAdd', async member => {
  let guild = member.guild;
  let autonick = JSON.parse(fs.readFileSync("./autonick.json", "utf8"));
  if(!autonick[member.guild.id]) return;
  
   var autonicksetting = JSON.parse(fs.readFileSync("./autonickonoff.json", "utf8"));
    if (!autonicksetting[member.guild.id]) {
     autonicksetting[member.guild.id] = {
      values: 1
      };
    }
  
    var values = autonicksetting[member.guild.id].checker
  
    if (values === undefined) return;
    if (values === 0) return;
    if (values === 1) {
      let newNick = autonick[member.guild.id].nick
      newNick = newNick.replace('{username}', member.user.username)
      member.guild.members.get(`${member.user.id}`).setNickname(newNick)
    }
});

app.get("/", (request, response) => {
console.log('Uptiming');
response.sendStatus(200);
});
setInterval(() => {
http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


client.on('ready', async => {
console.log("Rainbow bot is ready!" + "\n" + `v1.2.8| ${client.guilds.size} Server `,+ "\n" + "Server Count: "  + `v1.2.8| ${client.users.size}`, + "\n" + "Cached users: " + ` Prefix a>help`, + "\n" + "Enjoy!")
});


client.on('message', message => {
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    if(command === settings.prefix + settings.rainbowcommand) {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("❌ You dont have permission to perform this command");
        const rolez = message.mentions.roles.first() || message.guild.roles.find(r=> r.name === args [0])
        if(!rolez) return message.channel.send(settings.messageresponse.rolenotfound).catch(err=> message.channel.send("No response"))
        if(!message.guild.member(client.user.id).hasPermission("MANAGE_ROLES")) return message.channel.send(settings.messageresponse.missingperm).catch(err=> message.channel.send("no response"))
        var colors = settings.rainbowrole
        var rolestart = setInterval(function() {
            var colorsz = colors[Math.floor(Math.random() * colors.length)];
            rolez.setColor(colorsz)
        }, settings.rainbowdelay); 
            message.channel.send(settings.messageresponse.success).catch(err=> message.channel.send("No response"))

    }
    if(command === settings.prefix + settings.rainbowstop) {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("❌ You dont have permission to perform this command");
            setTimeout(function () {
           process.exit()
            }, 1000);
           
                       message.channel.send(settings.messageresponse.rainbowstop).catch(err=> message.channel.send("error"))
                       }
});


  fs.readdir("./commands/", (err, files) => {
    console.log(`Loaded ${files.length} commands.`)
	if(err) console.log(err);
	let jsfile = files.filter(f => f.split(".").pop() === "js");
	if(jsfile.length <= 0){
	console.log("Couldn't find commands.");
	return;
	}

	client.on("message", async message => {
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: config.prefix
    };
  }
	
    let prefix = prefixes[message.guild.id].prefixes;
	if(message.author.bot) return undefined;
	if(message.channel.type === 'dm') return ;
        if(message.content.toLowerCase() === '<@421925809532436481>'){
        let embed = new Discord.RichEmbed()
       .setTitle("Tritax AI")
       .addField("Prefix", `\`${prefix}\``, true)
       .addField("Help", `\`${prefix}help\``, true)
       .setThumbnail(client.user.displayAvatarURL)
       .setColor(`${message.guild.me.displayHexColor!=='#000000' ? message.guild.me.displayHexColor : 0xffffff}`);
        message.channel.send(embed);
        }
    
    if(message.content == (`<@${client.user.id}>`)) {
  let embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`Hello ${message.member} My prefix in this server **${prefix}help** for more info`)
    message.channel.send(embed)
    }

	let args = message.content.slice(prefix.length).trim().split(" ");
	let cmd = args.shift().toLowerCase();
	if(message.author.bot) return undefined;
	if(!message.content.startsWith(prefix)) return undefined;
   message.prefix = prefix;
    
	try {
    let commandFile = require(`./commands/${cmd}.js`);
      commandFile.run(client, message, args, queue, color,);
} catch (err) {
}

})}
);

client.login(process.env.TOKEN);