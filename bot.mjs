import { REST, Routes, Client, GatewayIntentBits, ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
import 'dotenv/config'
import { questions } from './wyr.mjs';
import { answers } from './8ball.mjs';

const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

const commands = [
	{
		name: 'ping',
		description: 'Replies with Pong! And latency from the bot...',
	},
    {
        name: 'help',
        description: 'A usefull command to learn more about what blueberry can do.',
    },
    {
        name: 'invite',
        description: 'Invite blueberry to another server.',
    },
    {
        name: 'wyr',
        description: 'A simple question with two choices. What would you rather do?',
        options: [
            {
                name: 'id',
                description: 'Force a specific id?',
                type: ApplicationCommandOptionType.Integer,
                required: false,
            },
        ] 
    },
    {
        name: 'question',
        description: 'Get a question. Answer it.',
    },
    {
        name: 'topic',
        description: 'Get a topic. Talk about it. Some might be to deep for a discord user.',
    },
    {
        name: '8ball',
        description: 'You have a question? I have the answer.',
        options: [
            {
                name: 'question',
                description: 'What question do you want to ask the 8ball?',
                type: ApplicationCommandOptionType.String,
                required: true,
            },
            {
                name: 'id',
                description: 'Force a specific answer?',
                type: ApplicationCommandOptionType.Integer,
                required: false,
            },
        ] 
    },
    {
        name: 'dice',
        description: 'Roll a dice. 1 to 6, you can get everything!',
    },
    {
        name: 'percent',
        description: '1-100%.',
    },
    {
        name: 'coinflip',
        description: 'Flip the coin. Head or number.',
    },
    {
        name: 'dog',
        description: 'Get an image of a cute dog.',
    },
    {
        name: 'fox',
        description: 'Get an image of a cool fox.',
    },
    {
        name: 'cat',
        description: 'Get an image of an amazing cat.',
    },
    {
        name: 'duck',
        description: 'Get an image of a fantastic duck.',
    },
    {
        name: 'meme',
        description: 'Get a meme from reddit.',
    },
    {
        name: 'dadjoke',
        description: "Dad's jokes are the best!",
    },
    {
        name: 'slot',
        description: 'Gambling can make you addicted. Fr.',
    },
    {
        name: 'truth',
        description: 'Tell me the truth.',
    },
    {
        name: 'dare',
        description: 'I dare you to....',
    },
    {
        name: 'tod',
        description: 'Random Truth or Dare',
    },
    {
        name: 'nhie',
        description: 'Never have I ever.',
    },
    /*{
        name: 'rps',
        description: "Rock. Paper. Scissors. Some people say you can't win.",
        options: [
            {
                name: 'rock_paper_or_scissors?',
                description: 'What do you want to take?',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ] 
    },*/
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;

	switch (interaction.commandName) {
		case 'ping':
            const ping = client.ws.ping;
            await interaction.reply(`Pong! Bot ping is ${ping}ms.`);			
            break;
		case 'help':
			await interaction.reply('A usefull command to learn more about berryBot.');
			break;
		case 'wyr':

            let randomNumber = Math.floor(Math.random() * questions.length);
            let randomQuestion = questions[randomNumber];
            
            const wyrEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Here is a **Would You Rather** question for you:')
            .addFields(
                { name: ' ', value: randomQuestion },
            )
            .setFooter({ text: "This is question " + randomNumber + " of " + questions.length, iconURL: client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [wyrEmbed] });

			break;
		case 'topic':
			await interaction.reply('Get a random topic to talk about.');
			break;
		case 'av':
            const user = interaction.options.get('user').value;
            await interaction.reply(user);
			break;
		case 'guildav':
			await interaction.reply('Get the avatar of the server.');
			break;
		case 'serverinfo':
			await interaction.reply('Get some infos about the server.');
			break;
		case 'userinfo':
			await interaction.reply('Get some infos about the user.');
			break;
		case '8ball':

            let randomChoice = Math.floor(Math.random() * answers.length);
            let randomAnswer = answers[randomChoice];
            const question = interaction.options.get('question').value;

            const ballEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('You asked the magic 8ball:')
            .setDescription(question)
            .addFields(
                { name: ' ', value: "`🎱: "+randomAnswer+"`" },
            )
            .setFooter({ text: "This is 8ball's answer " + randomChoice + " out of " + answers.length, iconURL: client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [ballEmbed] });

            break;
		case 'dice':
            let randomDice = Math.floor(Math.random() * 6) + 1;
			await interaction.reply('🎲 I got a ' + randomDice + '.');
			break;
		case 'percent':
            let randomPercentage = Math.floor(Math.random() * 100);
			await interaction.reply(':abacus: Im thinking of ' + randomPercentage + '%.');
			break;
		case 'coinflip':
            let stringList = ["head", "number"];
            let randomIndex = Math.floor(Math.random() * stringList.length);
            let randomString = stringList[randomIndex];
			await interaction.reply(':coin: I flipped and got ' + randomString + '.');
			break;
		case 'dog':
            const dog = await fetch("https://dog.ceo/api/breeds/image/random")
            const jsonDog = await dog.json();

            const dogEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("🐶 It's a dog!")
            .setImage(jsonDog.message)
            .setFooter({ text: "Image provided by https://dog.ceo ♥", iconURL: client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [dogEmbed] });

            break;
		case 'fox':
            const fox = await fetch("https://randomfox.ca/floof/")
            const jsonFox = await fox.json();

            const foxEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("🦊 It's a fox!")
            .setImage(jsonFox.image)
            .setFooter({ text: "Image provided by https://randomfox.ca ♥", iconURL: client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [foxEmbed] });

            break;
		case 'cat':
            const cat = await fetch("https://api.thecatapi.com/v1/images/search?format=json&x-api-key="+process.env.CAT_KEY)
            const jsonCat = await cat.json();

            const catEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("🐈 It's a cat!")
            .setImage(jsonCat[0].url)
            .setFooter({ text: "Image provided by https://thecatapi.com ♥", iconURL: client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [catEmbed] });

            break;
        case 'meme':
            const meme = await fetch("https://meme-api.com/gimme")
            const jsonMeme = await meme.json()
            console.log(jsonMeme)

            const memeEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle("Meme made by " + jsonMeme.author + " on " + jsonMeme.subreddit + " subreddit!")
            .setImage(jsonMeme.url)
            .setFooter({ text: "Meme provided by https://meme-api.com ♥", iconURL: client.user.displayAvatarURL() });

            await interaction.reply({ embeds: [memeEmbed] });

            break;
		case 'slot':
			await interaction.reply('Gambling can make you addicted.');
			break;
        /*case 'rock_paper_scissors':
            const input = interaction.options.get('rock_paper_or_scissors').value.toLocaleLowerCase();
            if (input != "rock" || "paper" || "scissors") {
                await interaction.reply('Bruh. ' + input);
            } else if (input = "rock") {
                await interaction.reply('You lost! I have paper. 😂');
            } else if (input = "paper") {
                await interaction.reply('You lost! I have scissors. 😂');
            } else if (input = "scissors") {
                await interaction.reply('You lost! I have rock. 😂');
            }
            break;*/
		default:
			await interaction.reply('Unknown command!');
			break;
	}
});

async function main() {
    try {
      console.log('Started refreshing application (/) commands.');
      await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
      console.log('Successfully reloaded application (/) commands.');
      client.login(process.env.TOKEN);
    } catch (err) {
      console.log(err);
    }
  }

  main();