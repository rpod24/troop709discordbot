require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
message = "";
let DoingRn = ['Waiting for more commands', 'Hiking', 'Backpacking', 'Stalling for time', 'Camping', 'Driving', 'Work'];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("for Commands. Use /709 Help for help", {
        type: "WATCHING"
      });
});



client.on('message', msg => {
    client.user.setStatus('testing');
    message = msg.toString();
    if(msg.channel==720099598894366782&&msg.author.id!='720117440138444842'){
        msg.channel.send('Welcome to the Troop 709 discord server '+msg.author.username+'!');
    }
    if(message == "/709 rules"){
        msg.delete();
        msg.channel.send('Troop 709 Discord Server Rules:');
        msg.channel.send('1. Follow the Scout Law and Oath.');
        msg.channel.send('2. Be respectful to everyone on the server');
    }
    if(message == "/ScoutLaw"){
        msg.delete();
        msg.channel.send('A Scout is: Trustworthy, Loyal, Helpful, Friendly, Courteous, Kind, Obedient, Cheerful, Thrify, Brave, Clean, and Reverent');
    }
    if(message == "/ScoutOath"){
        msg.delete();
        msg.channel.send('On my honor I will do my best to do my duty to God and my country and to obey the Scout Law; to help other people at all times; to keep myself physically strong, mentally awake, and morally straight.');
    }
    if(message.includes('/announce ')){
        if(msg.member.hasPermission("ADMINISTRATOR")){
            announcements = message;
            announcements = announcements.replace('/announce ', '');
            messageLink = announcements.slice(0,announcements.indexOf(' '));
            announcements = announcements.slice(announcements.indexOf(' ')+1, announcements.length);
            pingLevel = announcements.slice(0,announcements.indexOf(' '));
            announcement = announcements.slice(announcements.indexOf(' ')+1);
            if(pingLevel == '1'){
                announcement = "@everyone "+announcement;
            }
            else if(pingLevel == '2'){
                announcement = "@here "+announcement;
            }
            else if(pingLevel == '0'){
                announcement = announcement;
            }
            if(messageLink == 'this'){
                msg.delete();
                msg.channel.send(announcement);
            }
            else{
                try{
                    channelLink = msg.guild.channels.cache.find(channel => channel.name === messageLink).id;
                    client.channels.cache.get(channelLink).send(announcement);
                    }
                    catch(error){
                    "Error Finding Channel";
                    }
            }
        }
        else{
            msg.channel.send("Sorry you don't have permisson to do this");
        }
    }
    if(message == "/709 help"){
        msg.channel.send("Commands: /ScoutLaw, /ScoutOath, /announce channel(or put this if same channel) pingLevel(0,1,2) announcement, /709 help");
    }
    if(message.includes("/addItemToList ")){
        message = message.replace("/addItemToList ", "");

    }
    if(message.includes("Troop 709 Bot ")){
    pingReason = message.replace("Troop 709 Bot ", "");
    if(pingReason.includes("what are you doing right now")){
        Random = Math.floor(Math.random() * DoingRn.length);
        msg.channel.send(DoingRn[Random]);
    }
    }
  });

client.login(process.env.DISCORD_TOKEN);