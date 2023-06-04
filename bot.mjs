import { REST, Routes, Client, GatewayIntentBits, ApplicationCommandOptionType } from 'discord.js';
import { Configuration, OpenAIApi } from "openai";

const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

const openai = new OpenAIApi(new Configuration({
    apiKey: KEY,
  })
);

const commands = [
	{
		name: 'ping',
		description: 'Replies with Pong! And latency from the bot...',
	},
    {
        name: 'help',
        description: 'A usefull command to learn more about berryBot.',
    },
    {
        name: 'ban',
        description: 'Ban the user from the server.',
        options: [
            {
                name: 'user',
                description: 'Who you want to ban?',
                type: ApplicationCommandOptionType.User,
                required: true,
            }
        ] 
    },
    {
        name: 'unban',
        description: 'Unban the user from the server.',
        options: [
            {
                name: 'user',
                description: 'Who you want to unban?',
                type: ApplicationCommandOptionType.User,
                required: true,
            }
        ] 
    },
    {
        name: 'kick',
        description: 'Kick the user from the server.',
        options: [
            {
                name: 'user',
                description: 'Who you want to kick?',
                type: ApplicationCommandOptionType.User,
                required: true,
            }
        ] 
    },
    {
        name: 'softban',
        description: 'Ban the user from the server, but only temporarily.',
        options: [
            {
                name: 'user',
                description: 'Who you want to ban?',
                type: ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: 'time',
                description: 'For how long you want to ban this user?',
                type: ApplicationCommandOptionType.Integer,
                required: true,
            }
        ] 
    },
    {
        name: 'slowmode',
        description: 'Sets the cooldown how often user can write in the channel.',
        options: [
            {
                name: 'time',
                description: 'How long should the cooldown be?',
                type: ApplicationCommandOptionType.Integer,
                required: true,
            }
        ] 
    },
    {
        name: 'lock',
        description: 'Locks the channel so no messages can be written there.',
    },
    {
        name: 'unlock',
        description: 'Unlocks the channel.',
    },
    {
        name: 'mute',
        description: 'Mutes the user temporarily.',
        options: [
            {
                name: 'user',
                description: 'Who you want to mute?',
                type: ApplicationCommandOptionType.User,
                required: true,
            },
            {
                name: 'time',
                description: 'For how long you want to mute this user?',
                type: ApplicationCommandOptionType.Integer,
                required: true,
            }
        ] 
    },
    {
        name: 'unmute',
        description: 'Unmute the user.',
        options: [
            {
                name: 'user',
                description: 'Who you want to unmute?',
                type: ApplicationCommandOptionType.User,
                required: true,
            }
        ] 
    },
    {
        name: 'wyr',
        description: 'A simple question with two choices.',
    },
    {
        name: 'question',
        description: 'Get a question.',
    },
    {
        name: 'av',
        description: 'Get the avatar of the user as an image.',
        options: [
            {
                name: 'user',
                description: 'From who you want to see the avatar?',
                type: ApplicationCommandOptionType.User,
                required: true,
            },
        ] 
    },
    {
        name: 'guildav',
        description: 'Get the avatar of the server.',
    },
    {
        name: 'serverinfo',
        description: 'Get some infos about the server.',
    },
    {
        name: 'userinfo',
        description: 'Get some infos about the user.',
        options: [
            {
                name: 'user',
                description: 'About which user you want to get some infos?',
                type: ApplicationCommandOptionType.User,
                required: true,
            }
        ] 
    },
    {
        name: '8ball',
        description: 'You have a question? Here is the answer.',
    },
    {
        name: 'dice',
        description: 'Roll a dice.',
    },
    {
        name: 'percent',
        description: '1-100%.',
    },
    {
        name: 'coinflip',
        description: 'Head or number.',
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
        name: 'slot',
        description: 'Gambling can make you addicted.',
    },
    /*{
        name: 'poll',
        description: 'Create a poll.',
    },
    {
        name: 'play',
        description: 'Play some music.',
    },    
    {
        name: 'qotd',
        description: 'Askes a question, every day.',
    },
    {
        name: 'ticket',
        description: 'Run the ticket system setup.',
    },
    {
        name: 'selector',
        description: 'Create a selector for a role menu.',
    },
    {
        name: 'rps',
        description: 'Its against a bot... You might not be able to win.',
    },*/
    {
        name: 'ask',
        description: 'Ask berry anything, because berry knows everything.',
        options: [
            {
                name: 'question',
                description: 'What you want to ask berrybot?',
                type: ApplicationCommandOptionType.String,
                required: true,
            }
        ] 
    },
];

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity('Try berryGPT with /ask')
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
		case 'ban':
            const user = interaction.options.get('user').value;
            await user.ban()
			await interaction.reply('Ban the user from the server.');
			break;
		case 'unban':
			await interaction.reply('Unban the user from the server.');
			break;
		case 'kick':
			await interaction.reply('Kick the user from the server.');
			break;
		case 'softban':
			await interaction.reply('Ban the user from the server, but only temporarily.');
			break;
		case 'slowmode':
			await interaction.reply('Sets the cooldown how often user can write in the channel.');
			break;
		case 'lock':
			await interaction.reply('Locks the channel so no messages can be written there.');
			break;
		case 'unlock':
			await interaction.reply('Unlocks the channel.');
			break;
		case 'mute':
			await interaction.reply('Mutes the user temporarily.');
			break;
		case 'unmute':
			await interaction.reply('Unmute the user.');
			break;
		case 'wyr':
			await interaction.reply('A simple question with two choices.');
			break;
		case 'question':
			await interaction.reply('Get a question Question.');
			break;
		case 'av':
			await interaction.reply('Get the avatar of the user as an image.');
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
            let answers = [
                "It is certain.",
                "It is decidedly so.",
                "Without a doubt.",
                "Yes – definitely.",
                "You may rely on it.",
                "As I see it, yes.",
                "Most likely.",
                "Outlook good.",
                "Yes.",
                "Signs point to yes.",
                "Reply hazy, try again.",
                "Ask again later.",
                "Better not tell you now.",
                "Cannot predict now.",
                "Concentrate and ask again.",
                "Don't count on it.",
                "Outlook not so good.",
                "My sources say no.",
                "Very doubtful.",
                "My reply is no.",
                "Outlook is bleak.",
                "Chances aren’t good.",
                "Very unlikely.",
                "Odds are not in your favor.",
                "Not looking good.",
                "It’s not likely.",
                "I’m afraid not.",
                "I don't think so.",
                "Not a chance.",
                "No way.",
                "Sorry, no.",
                "Unfortunately no.",
                "Nope.",
                "Definitely not.",
                "It is unlikely.",
                "It is impossible.",
                "The outlook is murky.",
                "Cannot say now.",
                "The signs are unclear.",
                "Ask again later.",
                "It’s hard to say.",
                "The answer is within you.",
                "It's not my place to say.",
                "Perhaps you already know the answer.",
                "I have faith in you to make the right choice.",
                "It’s up to you to decide.",
                "You will know when the time is right.",
                "The future is unwritten.",
                "Time will tell.",
                "You have the power to change the outcome.",
                "Trust your instincts.",
                "Listen to your heart.",
                "Take a leap of faith.",
                "The universe has a plan.",
                "Don't give up.",
                "Keep trying.",
                "You can do it.",
                "Believe in yourself.",
                "You have what it takes.",
                "Stay positive.",
                "Stay focused on your goals.",
                "Stay true to yourself.",
                "Have faith in the journey.",
                "Be patient.",
                "Everything happens for a reason.",
                "Good things come to those who wait.",
                "The best is yet to come.",
                "This too shall pass.",
                "Change is on the horizon.",
                "A new door will open soon.",
                "Opportunities are coming.",
                "The tide is turning.",
                "The winds of change are blowing.",
                "You are stronger than you know.",
                "You are capable of amazing things.",
                "You are loved.",
                "You are not alone.",
                "Someone cares about you deeply.",
                "Everything will be okay.",
                "You are on the right path.",
                "You are exactly where you need to be.",
                "Trust the journey.",
                "You are making progress.",
                "You are doing your best.",
                "You are enough.",
                "Believe in yourself and all that you are.",
                "Your potential is limitless.",
                "You are a force to be reckoned with.",
                "You are destined for greatness.",
                "Dream big and go for it.",
                "Success is within reach.",
                "The world is your oyster.",
                "Anything is possible.",
                "You can achieve anything you set your mind to.",
                "Keep reaching for the stars.",
                "Never give up on your dreams.",
                "Stay true to your passions.",
                "Your hard work will pay off."
            ]
            let randomChoice = Math.floor(Math.random() * answers.length);
            let randomAnswer = answers[randomChoice];
			await interaction.reply(':8ball: ' + randomAnswer);			
            break;
		case 'dice':
            let randomNumber = Math.floor(Math.random() * 6) + 1;
			await interaction.reply('🎲 I got a ' + randomNumber + '.');
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
			await interaction.reply('Get an image of a cute dog.');
			break;
		case 'fox':
			await interaction.reply('Get an image of a cool fox.');
			break;
		case 'cat':
			await interaction.reply('Get an image of an amazing cat.');
			break;
		case 'slot':
			await interaction.reply('Gambling can make you addicted.');
			break;
        case 'ask':
        await interaction.deferReply();
        const question = interaction.options.get('question').value;
            try {
                const response = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    messages: [
                        {role: "system", content: "You are a helpful assistant who responds succinctly"},
                        {role: "user", content: question}
                    ],
                  });
            
                const content = response.data.choices[0].message;
                return await interaction.editReply(content);
            } catch (err) {
                return interaction.editReply(
                  "As an AI robot, I errored out."
                );
            }
		default:
			await interaction.reply('Unknown command!');
			break;
	}
});

async function main() {
    try {
      console.log('Started refreshing application (/) commands.');
      await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
      console.log('Successfully reloaded application (/) commands.');
      client.login(TOKEN);
    } catch (err) {
      console.log(err);
    }
  }

  main();