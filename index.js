require("dotenv").config();
const Discord = require("discord.js"),
chalk = require("chalk"),
os = require("os"),
colors = require("colors"),
figlet = require("figlet"),
client = new Discord.Client({disableEveryone: true}),
conf = require('./config.json'),
prefix = conf.prefix,
owners = conf.Owners,
memoire = Math.ceil(process.memoryUsage().heapTotal / 1000000),
ram_1 = Math.ceil((os.totalmem() - os.freemem()) / 1000000),
ram_2 = Math.ceil(os.totalmem() / 1000000);
/////////////////////////////////////////////////
client.setMaxListeners(Number.POSITIVE_INFINITY);
/////////////////////////////////////////////////
var TimeTooLowMsg = chalk.blue("<============================================================>\n") + chalk.red("Oops! you have to use the 60 second time (config.json) disable the library to use this model.\n")+chalk.blue("<============================================================>\n");
/////////////////////////////////////////////////
client.on('ready', () => {
  console.clear();
    console.log(`bot on`);
});

client.on("guildCreate", async (guild) => {if(client.guilds.size >= 2){console.info("Do not use a rainbow bot on several servers, it can be banned And the bot owner too!!");return guild.leave();};});

client.on('message', async (message) => {
  let args = message.content.split(' ').slice(1);
  if (message.content.startsWith(`${prefix}rainbow`)) {

    if(!owners.includes(message.author.id)) return message.reply("You do not have permission..")
  
  if(!args[0]) return message.reply("Mark the position.");
  let rrole = message.mentions.roles.first() || message.guild.roles.find(r=> r.name === args[0]) || message.guild.roles.find(r=> r.id === args[0]),
  n = rrole.name;
  if (!message.guild.roles.find("name", n)) return message.reply('Eitcha! invalid charge');

    if(conf.time < 30) TimeTooLow();
  message.reply('Activated!').then((message) => {message.delete(3000);});
  if(message.deletable) message.delete();
  var thebigmix = message.guild.roles.find("name", n);
  

  try{
    let interval = setInterval(function () {
      thebigmix.setColor("RANDOM").catch(console.error);
    }, conf.time*1000);
  } catch {
    console.log(`${chalk.blue(`[🚫] The bot can't play with colors "${n}" he has limits :'(`)}`);
  }


  //config.time em segundos!
}});
client.login(process.env.TOKEN);

function TimeTooLow(){
  if(conf.StopIfTimeIsLessYhan5Seconds == true){
    console.log(TimeTooLowMsg+chalk.red("Eitcha, stopping system .. | Disable TimeTooLow | Or change the time to 60 seconds."));
    return process.exit(-1);
  } else if(conf.StopIfTimeIsLessYhan5Seconds == false){
    console.log(TimeTooLowMsg);
  } else {
  }
};
