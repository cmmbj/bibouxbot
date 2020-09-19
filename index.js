const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const { settings } = require('cluster');
const client = new Discord.Client();
const config = require('./config.json')
client.commands = new Discord.Collection();
let db = JSON.parse(fs.readFileSync("./database.json", "utf8"));

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
	if(message.channel.type==="dm"||message.channel.type==="group") {
		    //bot : alors je fais rien
		    return false;
		}
})

client.once('ready', () => {
	console.log("C'est quand que je déco ?");
});

client.on('ready', async () => {
	client.user.setStatus("online")
	client.user.setActivity("quelque chose...", { type: "STREAMING", url: "https://www.twitch.tv/chilledcatradio" });
});


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (message.content.startsWith(`${prefix}ping`)) {
		message.channel.send('Pong.');
	} else if (message.content.startsWith(`${prefix}beep`)) {
		message.channel.send('Boop.');
	}

	if (message.content.startsWith(`${prefix}contexteembed`)) {
		const exampleEmbed = {
			color: 0xa70e0e,
			title: ' ',
			description: ("*``` \n                 Voici le contexte                \n ```*\n**🌹 ↬** *Tout a commencé lorsqu'une scientifique a prouvé à ses*\n*supérieurs qu'elle était dans la capacité de changer les gènes*\n*humains à sa guise et malgré les interdictions et les menaces qu'on*\n*lui a dit et imposées, la scientifique n'en est pas restée là et a voyagé*\n*à l'étranger, plus précisément au Japon où elle a mis au point ses*\n*esquisses et futurs essais dans une ville déserte.*\n\n**🌹 ↬** *Ses études ont été plus que réussies et elle a alors proposé à*\n*des villageois de se faire engager comme cobaye pour une assez*\n*grosse somme d'argent. Eux qui vivaient dans la pauvreté ont sautés*\n*sur l'occasion et ont donc procédés à plusieurs injections qui, pour*\n*effet principal, a tué pas mal de personne. Mais étrangement, seul les*\n*villageois entre 16 et 18 ans ont survécus à l'expérience.*\n\n**🌹 ↬** *Comme promis, la scientifique leur donna la somme d'argent*\n*mais a décidé de les garder avec elle. Elle semblait assez riche pour*\n*s'occuper d'une quarantaine d'enfants sans soucis alors elle sauta le*\n*pas et ils voyagèrent jusqu'à une île plutôt éloignée se nommant :*\n\n**```\n                      Murasa \n```**\n\n**🌹 ↬** *Elle allait prendre le temps de les étudier, de savoir pourquoi*\n*eux et non leurs parents. Encore plus étrange, ces adolescents ne*\n*semblent plus tout à fait humains... C'est même effrayant. Leur*\n*manque de sommeil, manque de faim et surtout des facultés surna-*\n*turelles lui ont tapé à l'oeil, elle s'est même demandée si elle n'avait*\n*pas créer des armes.*\n\n**🌹 ↬** *La scientifique contacta alors son bloc de recherches pour*\n*essayer de comprendre l'incompréhensible. Malheureusement,*\n*rien de bien concret : juste des armes aux yeux des humains. Alors*\n*ils proposèrent de les garder sur l'île, le temps de voir leur évolution*\n*et si ils pourront plus tard les utiliser pour des fins personnelles.*\n\n**🌹 ↬** *Voilà comment est né*\n\n**```diff\n-                  Chikin School                -\n```**"),
			image: {
				url: 'https://i.pinimg.com/originals/01/95/4a/01954a435e7922f76225961c082ae7dc.gif',
			},
			footer: {
				text: 'écrit par la fonda.'
			}
		};
		
		message.channel.send({ embed: exampleEmbed });
	}
	   });

client.on('message', message => {
    if (message.content.startsWith(`${prefix}bvn`)) {
        const exampleEmbed = {
            color: 0x84a0b3,
            description: " ",
            image: {
                url:  "https://i.pinimg.com/originals/25/46/af/2546afa4b8f881bf1ab91d1554aa496f.gif"
            }
        }
        message.channel.send({ embed: exampleEmbed });
    }
})

client.on('message', message => {
	if(message.content.startsWith(`${prefix}clear`)) {
		if(message.member.hasPermission("MANAGE_MESSAGES")) {

			let args = message.content.trim().split(/ +/g);

			if(args[1]){
				if(!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99) {

					message.channel.bulkDelete(args[1])
					message.channel.send(`Vous avez supprimé **${args[1]}** messages.`)
					.then(msg => {
						msg.delete({ timeout: 2000 })
					  })
					// pour supprimer un mess : .then(msg => msg.delete(5000))
					//message.channel.bulkDelete(1)

				}
				else{
					message.channel.send(`Vous devez indiquer une valeur entre **1** et **99**.`)
					.then(msg => {
						msg.delete({ timeout: 2000 })
					  })
					message.channel.bulkDelete(1)
				}
			}
			else{
				message.channel.send(`Vous devez indiquer un nombre de message à supprimer.`)
				.then(msg => {
					msg.delete({ timeout: 3500 })
				  })
				message.channel.bulkDelete(1)
			}
		}
		else{
			message.channel.send(`Vous devez avoir une certaine permission pour pouvoir supprimer des messages.`)
			.then(msg => {
				msg.delete({ timeout: 2000 })
			  })
			message.channel.bulkDelete(1)
		}
	}
}
)

client.on('message', message => {
	if (message.content.startsWith(`${prefix}bvn2`)) {
		const ebvn = {
			description: "\n```\n                Bienvenue à toi !               \n```\n\n▸ ***__Soyez respectueux entre-vous car :__***\n\n▢ `Vous aurez une facilité à vous faire entendre.`\n▢ `Cela ne coûte rien et c'est même plutôt agréable.`\n**▢** `Les personnes respectueuses dégagent une aura`\n↳↳`particulièrement bienveillante.`\n\n▸ ***__Ne pas mentionner des membres sans raison(s) :__***\n\n▢ `C'est  simple. Personne n'aime être ping pour rien.`\n**▢** `Si vous pensez avoir une bonne raison de le faire, hum,`\n↳↳`il faudra le préciser aux membres du staff adoré.`\n\n▸ ***__Les fameuses allusions racistes :__***\n\n**▢** `Que ça soit pour rigoler ou même en débattre, c'est`\n↳↳`formellement interdit. Cela peu importe la situation.`\n**▢** `Tu es victime de pics racistes que ça soit sur le serveur `\n↳↳`ou non ? Viens voir les membres du staff, de préfé-`\n↳↳`rence la fondatrice.`\n\n▸ ***__Les décisions prisent par le staff :__***\n\n**▢** `Vous avez entièrement le droit de proposer des idées`\n↳↳`mais si nous avons nos propres idées, votre avis ne`\n↳↳`comptera plus pour le sujet concerné.`\n\n▸ ***__L'écriture :__***\n\n▢ `Eviter de trop écrire en langage SMS.`\n▢ `Un français correct, ne faites pas honte.`\n▢ `Ne pas spam, dans n'importe quel salon.`\n\n▸ ***__Le porno :__***\n\n**▢** `Pas de NSFW mis-à-part dans le salon dédié qui sera donné`\n↳↳`- par le staff en rôle sur demande.`\n\n```\n                    Bye bye !               \n```",
			color: 0x303136,
		}
		
        message.channel.send({ embed: ebvn });
	}	
})

client.on('message', message => {
	if (message.content.startsWith(`${prefix}bvn3`)) {
		const eebvn = {
			color: 0x84a0b3,
			image: {
				url: "https://em.wattpad.com/7f026e5efaa8df146be419247a5f7f5968c2e068/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f79494c7a6d37453670736f4378773d3d2d372e3135386432306237343532343966633331373439323033383236322e676966?s=fit&w=720&h=720"
			}
		}

		message.channel.send({ embed: eebvn });
	}
})

client.on('message', message => {
	if (message.content.startsWith(`${prefix}confirm`)) {
		message.channel.send("** **\n*`Si tu souhaites avoir accès au reste du serveur,\nmerci de bien vouloir cliquer sur l'emote qui se\ntrouve ci-dessous ! On te souhaite un bon séjour !`*\n** **",
	)
	}
})

client.on('message', message => {
	if (message.content.startsWith(`${prefix}ticket`)) {
		message.channel.send("** **\n<:hi:750706028466798732> `Merci de bien vouloir réagir sur la petite enveloppe. \nAvant tout, il va falloir avoir terminé sa fiche, l'avoir\nrelue et corrigée. Le staff n'est pas là pour vous dire\nquoi faire. Vous êtes tous assez grand pour pouvoir\nsavoir ce qu'il faut faire. Ne surtout pas ping.\nPatientez.`\n** **")
	}
})

client.on('message', message => {
	if (message.content.startsWith(`${prefix}help`)) {
		const help = {
			author: {
				name: "ミ 〔 ᵀᵒᵗᵃˡˡʸ ᵐᵃᵈ 🍭 ッ#7124",
				icon_url: "https://cdn.discordapp.com/avatars/725076572486500454/10b75979118911853289f091ef9cf0e6.webp",
				url: "https://www.instagram.com/pouxmilku/"
			},
			color: 0x303136,
			description: "*``` \n                Voici les commandes               \n ```*\n",
			image: {
				url: "https://data.whicdn.com/images/317382400/original.gif"
			},
			fields: [
				{
					name: "`u!help`",
					value: "*Pour pouvoir recevoir quelques commandes utiles.*",
					inline: true
				},
				{
					name: "`u!horaires`",
					value: "*Pour savoir quand le bot pourra utiliser les commandes personnalisées !*",
					inline: true
				},
				{
					name: "`u!staff`",
					value: "*Avoir la liste du staff + le lien pour postuler !*",
					inline: true
				},
				{
					name: "`u!rp`",
					value: "*Savoir à peu près comment commencer !*",
					inline: true
				},
				{
					name: "`u!clear`",
					value: "*Réservée aux membres du staff !*",
					inline: true
				},
				{
					name: "`u!link`",
					value: "*Pour avoir le lien définitif du serveur !*",
					inline: true
				},
				{
					name: "`u!avatar`",
					value: "*Et ça te montre ton avatar ! :)*",
					inline: true
				},
				{
					name: "`u!infos`",
					value: "*Pour voir les infos du serveur ! :)*",
					inline: true
				},
				{
					name: "`Autre chose ?`",
					value: "*Tu cherchais autre chose ? Viens voir le staff !*",
					inline: false 
				},
			]
		}
		message.channel.send({ embed: help });
	}
}
)

client.on('message', message => {
	if (message.content.startsWith(`${prefix}rp`)) {
		const help = {
			author: {
				name: "❝ Ɔ 𝔞𝔪𝔦𝔩𝔩𝔢 🍭．#7124",
				icon_url: "https://cdn.discordapp.com/avatars/725076572486500454/427baa6497e8561f589e8d5f3f53ae2b.webp?size=1024",
				url: "https://www.instagram.com/pouxmilku/"
			},
			color: 0x92a9b8,
			description: "*``` \n                  Le déroulement\n ```*\n\n〢 ***Murasa est une île achetée par plusieurs scientifiques de sorte à ce que les élèves puissent évoluer sans que ça s'ébruite. Le temps de savoir si l'expérience est néfaste ou justement, bénéfique pour pouvoir créer des armes surhumaines pouvant rapporter plusieurs millions à la scientifique qui est la directrice de Chikin School.***\n\n〢***Choisissez votre clan entre le lycée Ninki, Zenin et Tomi. Évoluez en faisant attention à ne pas troubler l'île et ce qui se trouve à l'extérieur. Logiquement, vous ne saurez pas que vous êtes des bêtes de foires mais plutôt des enfants chanceux ayant le droit à une éducation gratuite et luxuriante. ***\n\n〢***Pour ceux souhaitant jouer un nouveau personnage (prof, élèves, surveillant, scientifique et j'en passe) faisant son entrée dans l'école, veillez à bien le faire. Et ceux qui veulent jouer des personnages déjà dans l'école, faites de même et accueillez les nouveaux.***\n\n〢***Tu veux jouer un personnage autre qu'un élève ? Viens voir le staff pour plus d'informations*** **!**\n\n```tex\n$                 Chikin School                  $\n```\n\n",
			image: {
				url: "https://thumbs.gfycat.com/FilthyDevotedDairycow-size_restricted.gif"
			}
		}
		message.channel.send({ embed: help });
	}
}
)

client.on('message', message => {
	if (message.content === `${prefix}link`) {
		const chaipasquoi = new Discord.MessageEmbed()
		.setColor('#303136')
		.setDescription('<a:jtmtroptuvois:747419564433997854> Voilà le lien définitif du serveur : https://discord.gg/wZjYUGS !')
		message.channel.send({ embed: chaipasquoi})
	}
	 })

client.on('message', message => {
	if (message.content === `${prefix}horaires`) {
		const horaires = new Discord.MessageEmbed()
		.setColor('#303136')
		.setDescription("<:smartglasses:750710965896740885> Je vais souvent me connecter *complètement* vers 12h30 et me déconnecter vers 23h ou moins. Merci de profiter amplement pendant que vous le pouvez ! <:sparklecute2:751052081695293490>\n\n Pour savoir si je suis *complètement* connectée, il suffit de :\n\n <:point:751052081674190909> `Regarder mon statut, si celui-ci affiche botghost, c'est que je ne suis pas complètement connectée !`")
		message.channel.send({ embed: horaires})
	}
	 })

client.on('message', message => {
	if (message.content === `${prefix}staff`) {
			const lestaff = new Discord.MessageEmbed()
			.setColor('#303136')
			.setDescription("** **\n*Nous sommes heureux de vous présenter le staff de Murasa Isle !* <:jsuisbienl:751052507970797649>\n\n> De base, la fondatrice pensait pouvoir tout gérer toute seule sans l'aide de personne mais s'est vite rendue compte qu'en jouant l'introvertie, elle allait rapidement se lasser du serveur. Alors qu'avec un peu de mains d'oeuvre, les choses vont plus vite et c'est davantage chaleureux !\n> \n> <:flche:751052081682448457> __Pour postuler :__\n\nhttps://forms.gle/aPiGddUs64ufRyRw5\n\n** **\n")
			.setTitle("<:takeacoffee:751052082072649799>  **__Le fameux staff !__**")
			.setImage("https://68.media.tumblr.com/f1b72eebe05c42db64c3704f21b431bb/tumblr_omwpuz419a1vj3zbeo1_500.gif")
			.addField("`😈︰ଓ˚𝒌𝒌 ³₆³#7124`", `*La fondatrice qui est (parfois) toujours indulgente !*`, true)
			.addField("`Sangwoo#2203`", "*Le modo qui a beaucoup aidé et sur qui on peut compter.*", true)
			.setTimestamp()
			.setFooter(client.user.username, "https://images-ext-1.discordapp.net/external/fBHAy8ZMbQGeA5AZ8tw_SORL_NPmCry-eEiO7p_tYQM/https/cdn.discordapp.com/avatars/739956704418201732/a3503515438eae798c6c5c427685972e.webp");
	message.channel.send({ embed: lestaff });
	}
})

client.on('message', message => {
	if (message.content === `${prefix}listestaff`) {
			const lestaff = new Discord.MessageEmbed()
			.setColor('#303136')
			.setDescription("** **\n*Nous sommes heureux de vous présenter le staff de Murasa Isle !* <:jsuisbienl:751052507970797649>\n\n> De base, la fondatrice pensait pouvoir tout gérer toute seule sans l'aide de personne mais s'est vite rendue compte qu'en jouant l'introvertie, elle allait rapidement se lasser du serveur. Alors qu'avec un peu de mains d'oeuvre, les choses vont plus vite et c'est davantage chaleureux !\n> \n> <:flche:751052081682448457> __Pour postuler :__\n\nhttps://forms.gle/aPiGddUs64ufRyRw5\n\n** **\n")
			.setTitle("<:takeacoffee:751052082072649799>  **__Le fameux staff !__**")
			.setImage("https://68.media.tumblr.com/f1b72eebe05c42db64c3704f21b431bb/tumblr_omwpuz419a1vj3zbeo1_500.gif")
			.addField("`😈︰ଓ˚𝒌𝒌 ³₆³#7124`", `*La fondatrice qui est (parfois) toujours indulgente !*`, true)
			.addField("`Sangwoo#2203`", "*Le modo qui a beaucoup aidé et sur qui on peut compter.*", true)
			.setTimestamp()
			.setFooter(client.user.username, "https://images-ext-1.discordapp.net/external/fBHAy8ZMbQGeA5AZ8tw_SORL_NPmCry-eEiO7p_tYQM/https/cdn.discordapp.com/avatars/739956704418201732/a3503515438eae798c6c5c427685972e.webp");
	message.channel.send({ embed: lestaff });
	}
})

client.on('message', message => {
	if (message.content.startsWith(`${prefix}avatar`)) {
		const user = message.mentions.users.first() || message.author;
		const avatarEmbed = new Discord.MessageEmbed()
			.setColor(0x333333)
			.setAuthor(user.username)
			.setImage(`${user.displayAvatarURL({ dynamic: true })}`);
		message.channel.send(avatarEmbed);
	}
})

client.on("guildMemberAdd", async member => {
    let welcomeMsg = member.guild.channels.cache.find(channel => channel.find === "742835238039978056");
    
    let welcomeEmbed = new Discord.MessageEmbed()
        .setColor("#28172c")
        .setDescription("*```\n \n      Nous te souhaitons la bienvenue.\n ```*\n\n:love_letter:  ↬ 𝗖'𝗲𝘀𝘁 𝘂𝗻 𝗵𝗼𝗻𝗻𝗲𝘂𝗿 𝗱𝗲 𝘁'𝗮𝗰𝗰𝘂𝗲𝗶𝗹𝗹𝗶𝗿 𝗱𝗮𝗻𝘀 𝗻𝗼𝘁𝗿𝗲 𝗲́𝘁𝗮𝗯𝗹𝗶𝘀𝘀𝗲𝗺𝗲𝗻𝘁," + member.toString() + ". 𝗧𝘂 𝗮𝘂𝗿𝗮𝘀 𝗱𝗿𝗼𝗶𝘁 𝗮̀ 𝗹𝗮 𝗺𝗲𝗶𝗹𝗹𝗲𝘂𝗿𝗲 𝗲́𝗱𝘂𝗰𝗮𝘁𝗶𝗼𝗻 𝗾𝘂'𝗶𝗹 𝘀𝗼𝗶𝘁 𝘀𝘂𝗿 𝗻𝗼𝘁𝗿𝗲 𝗺𝗲𝗿𝘃𝗲𝗶𝗹𝗹𝗲𝘂𝘀𝗲 𝗶̂𝗹𝗲 𝗾𝘂'𝗲𝘀𝘁 `🌹 ᙏᥙɾᥲ𝘀ᥲ Ꙇ𝘀Ꙇᥱᴿᴾ` ! 𝗡𝗼𝘂𝘀 𝘁𝗲 𝗽𝗿𝗶𝗼𝗻𝘀 𝗱'𝗮𝗹𝗹𝗲𝗿 𝗹𝗶𝗿𝗲 𝗹𝗲 𝗿𝗲̀𝗴𝗹𝗲𝗺𝗲𝗻𝘁 𝗲𝗻𝗰𝗼𝗿𝗲 𝘂𝗻𝗲 𝗳𝗼𝗶𝘀 𝗮𝘃𝗮𝗻𝘁 𝗱𝗲 𝘁𝗲 𝗹𝗮𝗻𝗰𝗲𝗿 𝗱𝗮𝗻𝘀 𝗹𝗮 𝗳𝗮𝗺𝗲𝘂𝘀𝗲 𝘀𝘂𝗶𝘁𝗲.\n\n**Grâce à toi nous sommes à `" + member.guild.memberCount + "` membres !**\n```diff\n-              Chikin School            -\n```") 
        .setThumbnail("https://i.pinimg.com/originals/1d/f4/ec/1df4ece417ea8174ac2a3c635cf871b3.gif")
        .setImage("https://i.pinimg.com/originals/40/c0/43/40c04322b82ef786d242ad74cc5db03d.gif");
    
	await client.channels.cache.get("742835238039978056").send({ embed: welcomeEmbed })
	var role = member.guild.roles.cache.find(role => role.id === '737432609205911695');
	member.roles.add(role);
	}),
	
client.on("message", message => {
	if (message.content.startsWith(`${prefix}bar1`)) {
		const barrière = new Discord.MessageEmbed()
		.setColor("#fdde9a")
		.setDescription("▷ ┅┅┅┅┅┅┅┅┅⚜ 〣 ⚜┅┅┅┅┅┅┅┅┅ ◁")

		message.channel.send({ embed: barrière});
	}
})

client.on("message", message => {
	if (message.content.startsWith(`${prefix}inspi`)) {
		const inspi = new Discord.MessageEmbed()
		.setColor("#303136")
		.setDescription("__`ᒐᥱs sᥱɾʋᥱᥙɾs ϙᥙɩ oᥒt ɩᥒsρɩɾᥱ́s ᙅᖾɩƙɩᥒ ᔑᥴᖾooꙆ !`__\n\n`㊙️` ➨ *`𝗟𝗒𝖼𝖾́𝖾 𝗬𝗎𝖾𝗂ᴿᴾ╏ᴮᴺᴴᴬ`* *qui a grandement aidé en term-*\n*e d'inspiration, de webhooks et j'en passe ! Ce serveur*\n*n'a pas été créé pour le copier ou quoi que ce soit, c'est*\n*juste qu'il a donné beaucoup d'idées.* ***D'ailleurs, l'Homme***\n***évolue en s'inspirant des autres.***\n\n➥ *`Son lien :`* https://discord.gg/VWZCTyM\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n`㊙️` ➨ *`ᴿᴾ．Ꮢყumι Ꮧcαdemყ`* *qui est un autre des serveurs*\n*de la fondatrice ! À peu près tout ce qui vient de Chikin\nvient de Ryumi. Allez y jeter un coup d’œil ! :p*\n\n➥ *`Son lien :`* https://discord.gg/46KbsMx\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n`㊙️` ➨ *`𝐂𝐡𝗼̄ 𝐒𝐡𝐢𝐳𝐞𝐧 𝐓𝐞𝐤𝐢 | ₐcₐdₑₘy ʸᵃᵒⁱ ʳᵖ`* *un autre des*\n*nombreux serveurs de la fondatrice... Eh oui. Alors je*\n*mentionne ce serveur car il a inspiré Ryumi donc indirec-*\n*ement Chikin School ! Pour ceux qui sont intéressés pour*\n*du rp Yaoi, allez-y !*\n\n➥ *`Son lien :`* https://discord.gg/rZShwsq\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n`㊙️` ➨ *`🌅╏𝖢𝗅𝖺𝗌𝗌𝖾𝗋𝗈𝗈𝗆 𝖮𝖿 𝖳𝗁𝖾 𝖤𝗅𝗂𝗍𝖾ᴿᴾ`* *pas grand chose,*\n*ce serveur a juste permis d'ajouter quelques petits trucs*\n*rendant le rp plus réaliste avec un système de monnaie*\n*et j'en passe !*\n\n➥ *`Son lien :`* https://discord.gg/34ad76S")

		message.channel.send({ embed: inspi});
	}
})

client.on("message", message => {
	if (message.content.startsWith(`${prefix}more`)) {
		const moreandmore = new Discord.MessageEmbed()
			.setColor("#eea5ce")
			.setTitle(':rose: ᙏᥙɾᥲ𝘀ᥲ Ꙇ𝘀Ꙇᥱ ᴿᴾ')
			.setDescription("__**À** 𝘀𝗮𝘃𝗼𝗶𝗿 __:arrow_heading_down:\n\n> *Tout d'abord, il faut savoir ce qu'est un scientifique, un professeur, le rôle de la directrice et ce à quoi les élèves s'exposent et s'exposeront dans le futur.*\n> \n> *Vous pensez être conscients de ce qui vous attend mais ne vous pressez pas. Tout vous sera expliqué dans les moindres détails pour éviter des questions stupides et répétitives. êtes vous prêts ? C'est parti !* <:cute1:751052081736974346>")
			.setImage("https://data.whicdn.com/images/286112149/original.gif")
			.setThumbnail("https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png")

		const moreandmore1 = new Discord.MessageEmbed()
		.setColor("#303136")
		.setTitle('**<:attention:751052081703682058> __Les scientifiques !__**')
		.setDescription("`Les `<@&742053233454874627>` scientifiques sont vos supérieurs. Ceux qui vous ont sortis de la misère vous proposant (comme vous devez savoir en ayant lu le contexte) de l'argent en échange de votre corps vous dotant alors de capacités hors du commun.`\n\n`Ils sont tous humains. Aucun scientifique n'a été expérimenté car un chef ne goûte pas sa propre cuisine, par principe, alors c'est la même pour les scientifiques qui se préservent en attendant que tout soit au point.`\n\n`Ils ne sont quasiment jamais au lycée, toujours en ville ou à l'extérieur de l'île. Mais très souvent dans leur laboratoire qui est interdit au public.`\n\n`Des personnes inintéressantes mais qui regorgent de talent et du droit de mettre en captivité ou à rude épreuve tel ou tel que ça soit un professeur, un élève ou une personne du dehors. Veuillez ne pas les brusquer, leur parler trop fort, marcher devant eux lentement, les prendre de haut, salir leurs vêtements et surtout, ne pas oublier de s'incliner devant eux.`")
		.setImage("https://i.pinimg.com/originals/d3/a1/21/d3a12178163b4e659e89fc645da71e80.gif")

		const moreandmore2 = new Discord.MessageEmbed()
		.setColor("#303136")
		.setTitle('**<:attention:751052081703682058> __Les professeurs !__**')
		.setDescription("`Un `<@&742053211979907174>` est l'équivalent d'un professeur d'une institut humaine, rien de bien changeant mis-à-part le fait qu'ils vous enseignent d'une manière bien propre à eux. Vos facultés qui progressent de jours en jours n'échappent pas à leur regard de pro, tout le monde y passera, à ce fameux test d'aptitude physique comme psychique.`\n\n`La plupart des professeurs sont d'anciens mutants qui ont jugés bon de rester à leur ancienne école pour ne pas changer leurs habitudes, et ils ont bien fait. Bien payés, ils vous enseigneront l'art de la modération et du contrôle total sur vous-même. Ceux qui s'empochent les meilleurs mutants adultes iront loin.`\n\n`Ou sinon, un professeur peut être un scientifique en même temps d'être un professeur. Ils auront tous les droits qu'ont les scientifiques.`\n\n`Une infime minorité, presque rare, dit que certains professeurs ne sont ni l'un ni l'autre mais des humains juste bien placés pour être dignes de confiance.`\n\n`Ou sinon, ce sont ceux qui décident des délégués, des corrections aux examens et sont ceux qui peuvent vous garder des heures supplémentaires si il le faut.`")
		.setImage("https://i.pinimg.com/originals/b5/1b/08/b51b089613091b757b956cadff6d5e41.gif")

		const moreandmore3 = new Discord.MessageEmbed()
		.setColor("#eea5ce")
		.setTitle("**<:attention:751052081703682058> __Les élèves !__**")
		.setDescription("*`À découvrir inrp mais vu que vous êtes venus pour...`*\n\n<:flche:751052081682448457> Un élève doit le respect à tous leurs aînés. Ne doivent pas couper la parole et garder bien au chaud leur faculté. Etant donné que c'est favorable de garder en secret votre fameux pouvoir, pourquoi ?, car celui-ci peut faire des jaloux qui pourraient et ont le droit de se battre contre vous jusqu'à même vous tuer. Protégez vos arrières.\n\n<:flche:751052081682448457> Nul n'a le droit de sécher un cours.\n\n<:flche:751052081682448457> Une boutique a été installée à l'enceinte de votre établissement, merci de bien vouloir y jeter un coup d'oeil avant de jouer le super-héros.\n\n<:flche:751052081682448457> Comme dit ci-dessus, allez rp pour en savoir plus.")
		.setImage("https://i.pinimg.com/originals/a0/37/94/a0379457ac4d0a4aeb46263f6a9ef1ad.gif")



		message.channel.send({ embed: moreandmore });
		message.channel.send({ embed: moreandmore1 });
		message.channel.send({ embed: moreandmore2 });
		message.channel.send({ embed: moreandmore3 });
	}
})

client.on("message", message => {
	if (message.content.startsWith(`${prefix}bar2`)) {
		const barrière = new Discord.MessageEmbed()
		.setColor("#fdde9a")
		.setDescription("▷ ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ ◁")

		message.channel.send({ embed: barrière});
	}
})

client.on("message", message => {
	if (message.content.startsWith(`${prefix}récomp`)) {
		const récompense = new Discord.MessageEmbed()
		.setColor("#47c0d1")
		.setDescription("*``` \n       Les fameuses récompenses !          \n ```*\n\n┇`🐠` ➥ ***À partir de 3 invitations, vous aurez droit à un boost de la statistique de votre choix !***\n\n┇`🐠` ➥ ***À partir de 13 invitations, un objet de l'inventaire au choix !***\n\n┇`🐠` ➥ ***À partir de 20 invitations, le droit de réserver, créer un/des pouvoirs(s) au choix. Que cela reste raisonnable.***\n\n┇`🐠` ➥ ***Plus de 30 invitations, à vous de nous dire ce qui vous ferait plaisir et le staff verra avec vous si cela est possible et/ou si on peut modifier si on le juge \"too much\".***\n\n```\n     \n```")
		.setImage("https://i.skyrock.net/0788/92080788/pics/3313062456_1_10_1rv99qVO.gif")
		.setThumbnail("https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png")

		const récompenses = new Discord.MessageEmbed()
		.setColor("#886040")
		.setDescription("*``` \n    Les fameuses récompenses ! 2/2          \n ```*\n\n┇🐠 ➥ ***1 boost = +3 stats de votre choix qui seront retirées si vous retirez votre boost ! :p***\n\n┇🐠 ➥ ***2 boosts = +3 stats de votre choix, un objet de l'inventaire ou créer un objet avec sa description.***\n\n┇🐠 ➥ ***Plus de 2 boosts = +3 stats de votre choix, créer un objet, choisir un objet de son choix, proposer quelque chose de votre choix et enfin : pouvoir créer un événement !***\n\n```\n \n```")
		.setImage("https://thumbs.gfycat.com/UnkemptFreshArmadillo-size_restricted.gif")
		.setThumbnail("https://data.whicdn.com/images/334441802/original.gif")

		message.channel.send({ embed: récompense})
		message.channel.send({ embed: récompenses});
	}
})

client.on("message", message => {
	if(message.content.startsWith(`${prefix}stats`)) {
		const statistiquesrolls = new Discord.MessageEmbed()
		.setTitle("🌹 ᙏᥙɾᥲ𝘀ᥲ Ꙇ𝘀Ꙇᥱ ᴿᴾ")
		.setColor("#4f7472")
		.setDescription("```\n  \n```\n\n**よ** ⊳ <@&737740583564476498> `：1.000 rolls 🎲 ⌡⌠ 0 Entraînements.`\n**よ** ⊳ <@&737740584088764538> `：1.250 rolls 🎲 ⌡⌠ 2 Entraînements.`\n**よ** ⊳ <@&737740586190372864> `：1.500 rolls 🎲 ⌡⌠ 4 Entraînements.`\n**よ** ⊳ <@&737740588748767253> `：1.750 rolls 🎲 ⌡⌠ 6 Entraînements.`\n**よ** ⊳ <@&737740591533654056> `：1.900 rolls 🎲 ⌡⌠ 8 Entraînements.`\n**よ** ⊳ <@&737740588245581876> `：2.250 rolls 🎲 ⌡⌠ 10 Entraînements.`\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n**よ** ⊳ <@&737740588375605280> `：1.500 rolls 🎲 ⌡⌠ 0 Entraînements.`\n**よ** ⊳ <@&737740591567208488> `：2.500 rolls 🎲 ⌡⌠ 5 Entraînements.`\n**よ** ⊳ <@&737742258702647421> `：3.500 rolls 🎲 ⌡⌠ 7 Entraînements.`\n**よ** ⊳ <@&737742258735939706> `：6.500 rolls 🎲 ⌡⌠ 9 Entraînements.`\n**よ** ⊳ <@&737742256248979497> `：9.500 rolls 🎲 ⌡⌠ 11 Entraînements.`\n**よ** ⊳ <@&737742261013577758> `：12.500 rolls 🎲 ⌡⌠ 13 Entraînements.`\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n**よ** ⊳ <@&737742261055389706> `：2.000 rolls 🎲 ⌡⌠ 0 Entraînements.`\n**よ** ⊳ <@&737742258639732788> `：3.500 rolls 🎲 ⌡⌠ 4 Entraînements.`\n**よ** ⊳ <@&737742263223976127> `：4.000 rolls 🎲 ⌡⌠ 7 Entraînements.`\n**よ** ⊳ <@&737742260795605063> `：5.500 rolls 🎲 ⌡⌠ 8 Entraînements.`\n**よ** ⊳ <@&737742263253467257> `：6.500 rolls 🎲 ⌡⌠ 8 Entraînements.`\n**よ** ⊳ <@&737742256328671427>  `：8.000 rolls 🎲 ⌡⌠ 10 Entraînements.`\n\n╍╍╍╍╍╍╍╍╍╍╍╍╍\n\nね ⊲ <@&737768425396502671> `：500 rolls 🎲 ⌡⌠ 0 Cours.`\nね ⊲ <@&737768428290441236> `：9.500 rolls 🎲 ⌡⌠ 10 Cours.`\nね ⊲ <@&737768427447648396> `：15.500 rolls 🎲 ⌡⌠ 18 Cours.`")
		.setImage("https://i.pinimg.com/originals/24/bf/bf/24bfbf4b30e5c110eb9ebb33cb07b142.gif")

		message.channel.send({ embed: statistiquesrolls })
	}
})

client.on("message", message => {
	
	if(message.content.startsWith(`${prefix}stats2`)) {
		const statistiquesrolls = new Discord.MessageEmbed()
		.setTitle("🌹 ᙏᥙɾᥲ𝘀ᥲ Ꙇ𝘀Ꙇᥱ ᴿᴾ")
		.setColor("#647974")
		.setDescription("** **\nす ➠ 〢「🎒」ƮᥱɾຕɩᥒᥲꙆᥱ `：2.500 rolls 🎲 ⌡⌠ 0 Entraînements.`\nす ➠ 〢「🎒」ᕈɾᥱຕɩᥱ̀ɾᥱ `：1.500 rolls 🎲 ⌡⌠ 0 Entraînements.`\nす ➠ 〢「🎒」ᔑᥱᥴoᥒᑯᥱ `：500 rolls 🎲 ⌡⌠ 0 Entraînements.`\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬\n\nれ ➠ ◆ 🔖 ◆ ᙖᙃᙓ ᑯᥙ Ꙇყᥴᥱ́ᥱ `：1.500 rolls 🎲 ⌡⌠ 0 Entraînements.`\nれ ➠ ◆ 📓 ◆ ᙃᥱ́Ꙇᥱ́ɠᥙᥱ́.ᥱ ᑯᥱ sᥲ ᥴꙆᥲssᥱ `：500 rolls 🎲 ⌡⌠ 0 Entraînements.`\nれ ➠ ◆ ✉️ ◆ ᙓꙆᥱ̀ʋᥱ ɾᥱᥴoຕຕᥲᥒᑯᥱ́.ᥱ `：3.000 rolls 🎲 ⌡⌠ 0 Entraînements.`\n\n▬▬▬▬▬▬▬▬▬▬▬▬▬\n\nゑ ➠ ▫ 👨‍🏫 ▫ ᕈɾoƒᥱssᥱᥙɾ.ᥱ ᑯ'ᥙᥒᥱ ᥴꙆᥲssᥱ `：10.500 rolls 🎲 ⌡⌠ 0 Entraînements.`\nゑ ➠ ▫ 👩‍🏫 ▫ ᙖɩᑲꙆɩotᖾᥱ́ᥴᥲɩɾᥱ ᑯᥙ Ꙇყᥴᥱ́ᥱ `：300 rolls 🎲 ⌡⌠ 0 Entraînements mais Niveau 2 Intelligence.`\nゑ ➠ ▫ 🧬 ▫ ᙀᥒ.ᥱ sᥴɩᥱᥒtɩƒɩϙᥙᥱ `：500 rolls 🎲 ⌡⌠ 0 Entraînements mais niveau 2 Intelligence.`\nゑ ➠ ▫ 🕵️ ▫ ᙀᥒ.ᥱ ᥱsρɩoᥒ.ᥒᥱ ɠᥱᥒtɩꙆ.Ꙇᥱ `：500 rolls 🎲 ⌡⌠ 0 Entraînements.`\nゑ ➠ ▫ 🔭 ▫ ᙀᥒ.ᥱ ᥱsρɩoᥒ.ᥒᥱ ຕᥱ́ᥴᖾᥲᥒt.ᥱ `：500 rolls 🎲 ⌡⌠ 0 Entraînements.`\n\n```\n   \n```")
		.setImage("https://thumbs.gfycat.com/AromaticLoathsomeAltiplanochinchillamouse-small.gif")

		message.channel.send({ embed: statistiquesrolls })
	}
})

client.on("message", message => {
	
	if(message.content.startsWith(`${prefix}boutique`)) {
		const csboutique = new Discord.MessageEmbed()
		.setColor("#647888")
		.setDescription("*``` \n      Boutique de Chikin School        \n ```*\n\n🌨️ ﹁ `💴 1 200` 〢 **·** 👚 **·** 𝗨ᥒ 𝗨ᥒιformᥱ\n﹂ *Sι tᥙ t'ᥱs bᥲttᥙ, tᥲ̂ᥴhᥱ́ oᥙ qᥙᥱ tᥙ ᥲs dᥱ́ᥴhιrᥱ́ toᥒ ᥙᥒιformᥱ. Vᥲ ᥲ̀ ᥣᥲ boᥙtιqᥙᥱ dᥙ ᥣყᥴᥱ́ᥱ ρoᥙr rᥱ́ᥴᥣᥲmᥱr ᥙᥒ ᥒoᥙvᥱᥣ ᥙᥒιformᥱ mᥲιs vᥱιᥣᥣᥱs ᥲ̀ rᥱsρᥱᥴtᥱr ᥣᥱs horᥲιrᥱs !*\n\n🌨️ ﹁ `💴 3 350` 〢 **·** ☂️ **·** 𝗨ᥒ 𝗣ᥲrᥲρᥣᥙιᥱ\n﹂ *Uᥒ joᥙr dᥱ ρᥣᥙιᥱ oᥙ ρoᥙr ᥙᥒᥱ toᥙtᥱ ᥲᥙtrᥱ rᥲιsoᥒ ? Ok !*\n\n🌨️ ﹁ `💴 4 450` 〢 **·** 🍲 **·** 𝗡oᥙrrιtᥙrᥱ\n﹂ *Nᥱ ρᥲs ᥲmᥱᥒᥱr dᥱ ᥣᥲ ᥒoᥙrrιtᥙrᥱ vᥱᥒᥲᥒt dᥱ ᥣ'ᥱxtᥱ́rιᥱᥙr dᥲᥒs ᥣ'ᥱᥒᥴᥱιᥒtᥱ dᥙ ᥣყᥴᥱ́ᥱ.*\n\n🌨️ ﹁ `💴 5 400` 〢 **·** 💳 **·** 𝗖ᥲrtᥱ 𝗖ᥲᥒtιᥒᥱ\n﹂ *Sᥲᥒs ᥴᥱttᥱ ᥴᥲrtᥱ, tᥙ dᥱvrᥲs tᥱ troᥙvᥱr dᥱ ᥣᥲ ᥒoᥙrrιtᥙrᥱ ᥲιᥣᥣᥱᥙrs qᥙᥱ sᥙr ᥣᥱ ᥴᥲmρᥙs.*\n\n🌨️ ﹁ `💴 11 035` 〢 **·** 🚲 **·** 𝗨ᥒ 𝗩ᥱ́ᥣo\n﹂ *Poᥙr dᥱ ᥴoᥙrtᥱs dιstᥲᥒᥴᥱs dᥲᥒs ᥣᥱ ᥴᥲmρᥙs oᥙ ᥲιᥣᥣᥱᥙrs ? Trᥱ̀s bιᥱᥒ.*\n\n🌨️ ﹁ `💴 117 000` 〢 **·** 💨 **·** 𝗖oᥙrs 𝗣ᥲrtιᥴᥙᥣιᥱrs\n﹂ *Droιt ᥲ̀ 4 Eᥒtrᥲι̂ᥒᥱmᥱᥒts ρᥲr joᥙr.*")
		.setImage("https://i.pinimg.com/originals/14/ec/5b/14ec5be21e9fa64737d456ffbd1256da.gif")
		.setThumbnail("https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png")

		message.channel.send({ embed: csboutique })
	}
})

client.on("message", message => {
	
	if(message.content.startsWith(`${prefix}boutiquemn`)) {
		const mnboutique = new Discord.MessageEmbed()
		.setColor("#c2814e")
		.setDescription("*``` \n               Marché noir       \n ```*\n\n☀️ ﹁ `💴 7 400` 〢 **·** 📒 **·** 𝗥ᥱ́ρoᥒsᥱs 𝗘xᥲmᥱᥒs\n﹂ *Qᥙᥱᥣ.ᥣᥱ ρᥱtιt.ᥱ ᥴoqᥙιᥒ.ᥱ ! J'ᥱsρᥱ̀rᥱ qᥙᥱ tᥙ ᥒᥱ tᥱ fᥱrᥲs ρᥲs ρrᥱᥒdrᥱ oᥙ sιᥒoᥒ... Mιᥱᥙx vᥲᥙt ᥒᥱ ρᥲs ყ ρᥱᥒsᥱr !*\n\n☀️ ﹁ `💴 10 200` 〢 **·** 🧝 **·** 𝗨ᥒᥱ 𝗖aρᥱ 𝗱'ιᥒvιsιbιᥣιtᥱ́\n﹂ *Poᥙr dᥱ́ρᥲssᥱr ᥣᥱ ᥴoᥙvrᥱ-fᥱᥙ ᥴ'ᥱst ρᥲrfᥲιt !*\n\n☀️ ﹁ `💴 12 500` 〢 **·** ⚗️ **·** 𝗙ιoᥣᥱs\n﹂ *Qᥙι ρᥱrmᥱttᥱᥒt d'ᥱᥒdormιr tᥱs ρᥱtιts ᥴᥲmᥲrᥲdᥱs. Fᥲιs ᥲttᥱᥒtιoᥒ !*\n\n☀️ ﹁ `💴 17 050` 〢 **·** 🔫 **·** 𝗔rmᥱ\n﹂ *Dᥲᥒgᥱrᥱᥙx...*")
		.setImage("https://steamuserimages-a.akamaihd.net/ugc/939433670376187943/0038B375D2ED6F5CDA726D8924D125E9321E7C79/")
		.setThumbnail("https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png")

		message.channel.send({ embed: mnboutique })
	}
})

client.on("message", message => {
	
	if(message.content.startsWith(`${prefix}boutiquemi`)) {
		const miboutique = new Discord.MessageEmbed()
		.setColor("#44a78f")
		.setDescription("*``` \n        Boutique de Murasa Isle       \n ```*\n\n:ideograph_advantage: ﹁ `💴 201` 〢 · :iphone: · 𝗨𝗻 𝗕𝗶𝗴𝗼\n﹂ *Oᥙᥲιs... Noᥒ...*\n\n:ideograph_advantage: ﹁ `💴 803` 〢 · :iphone: · 𝗜𝗽𝗵𝗼𝗻𝗲 𝗫\n﹂ *Voιᥴι ᥙᥒ tᥱ́ᥣᥱ́ρhoᥒᥱ d'ᥲssᥱz hᥲᥙtᥱ qᥙᥲᥣιtᥱ́.*\n\n:ideograph_advantage: ﹁ `💴 2 300` 〢 · :rotating_light: · 𝗨ᥒ 𝗠oᥙᥴhᥲrd\n﹂ *Soᥙhᥲιtᥱz-voᥙs ᥱᥒtᥱᥒdrᥱ ᥣᥲ ᥴoᥒvᥱrsᥲtιoᥒ d'ᥲᥙtrᥙι ? J'ᥲι ᥴᥱ qᥙ'ιᥣ voᥙs fᥲᥙt !*\n\n:ideograph_advantage: ﹁ `💴 4 000` 〢 · :credit_card: · 𝗕ᥲdgᥱ 𝗱ᥱ 𝗯ᥙs\n﹂ *Prᥲtιqᥙᥱ ρoᥙr ᥴᥱᥙx qᥙι oᥒt ᥣᥱᥙr ρroρrᥱ ᥴhᥱz-soι oᥙ ᥴᥱᥙx qᥙι vᥱᥙᥣᥱᥒt sιmρᥣᥱmᥱᥒt sᥱ bᥲᥣᥲdᥱr dᥱ tᥱmρs ᥲ̀ ᥲᥙtrᥱs.*\n\n:ideograph_advantage: ﹁ `💴 10 500` 〢 · :carousel_horse: · 𝗔rmᥙrᥱ 𝗱ᥱ 𝗣rotᥱᥴtιoᥒ\n﹂ *Cᥱᥴι voᥙs ρᥱrmᥱttrᥲ d'ᥱ́vιtᥱr dᥱ voᥙs bᥣᥱssᥱr ᥱt mᥱ̂mᥱ ᥲvᥱᥴ dᥱs ᥲrmᥱs ᥲιgᥙιsᥱ́ᥱs.*\n\n:ideograph_advantage: ﹁ `💴 15 200` 〢 · :bullettrain_front: · 𝗕ιᥣᥣᥱt 𝗱ᥱ 𝘁rᥲιᥒ\n﹂ *Poᥙr ᥲᥣᥣᥱr ᥲ̀ ᥣ'ᥲᥙtrᥱ boᥙt dᥱ ᥣ'ι̂ᥣᥱ ? Poᥙrqᥙoι ρᥲs.*\n\n:ideograph_advantage: ﹁ `💴 85 000` 〢 · :airplane: · 𝗕ιᥣᥣᥱt 𝗱'𝗮vιoᥒ\n﹂ *Oᥙh... J'ᥱsρᥱ̀rᥱ qᥙᥱ voᥙs ᥒᥱ voᥙs fᥱrᥱz ρᥲs ρrᥱᥒdrᥱ. Aᥣᥣᥱr ᥲ̀ ᥣ'ᥱxtᥱ́rιᥱᥙr ᥱst fortᥱmᥱᥒt dᥱ́ᥴoᥒsᥱιᥣᥣᥱ́ mᥲιs voιᥴι ᥣᥱ ρrιx ᥲᥙ ᥴᥲs oᥙ̀.*")
		.setImage("https://i.pinimg.com/originals/10/87/0a/10870a6763faa8f10817ef9afe570d16.gif")
		.setThumbnail("https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png")

		message.channel.send({ embed: miboutique })
	}
})

client.on("message", message => {
	
	if(message.content.startsWith(`${prefix}ficherp`)) {
		const ficherp = new Discord.MessageEmbed()
		.setColor("#303136")
		.setTitle("Ｌａ Ｆａｍｅｕｓｅ Ｆｉｃｈｅ")
		.setDescription("```\n▷ ┅┅┅┅┅┅┅┅┅┅┅┅**⚜** 〣 **⚜**┅┅┅┅┅┅┅┅┅┅┅ ◁\n\n┊**🔮 〢 `Nom et Prénom` :**\n\n┊**☄️ 〢 `Âge et Date de naissance` :**\n\n┊**🐠 〢 `Sexe et l'orientation sexuelle` :**\n\n┊**🐦 〢 `Race` :**\n\n┊**📘 〢 `Lycée` :**\n\n• ━━━━━━━━━━━━━━━━━━━━━━━━━━━ •\n\n┊**🎀 〢 `Caractère` :**\n\n┊**🍡 〢 `Histoire` :**\n\n┊**🌸 〢 `Description du pouvoir` :**\n\n┊**🍩 〢 `Description du physique` :**\n\n┊**🐰 〢 `Photo/GIF de votre personnage` :**\n\n▷ ┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅┅ ◁\n```")
		.setImage("https://thumbs.gfycat.com/MarriedActiveFritillarybutterfly-max-1mb.gif")
		.setFooter("Ne rien modifier.")

		message.channel.send({ embed: ficherp })
	}
})

client.on("message", message => {
	
	if(message.content.startsWith(`${prefix}séparp`)) {
		const séparationfiche = new Discord.MessageEmbed()
		.setColor("#303136")
		.setDescription("**ou**")

		message.channel.send({ embed: séparationfiche })
	}
})

client.on("message", message => {
	
	if(message.content.startsWith(`${prefix}gdocrp`)) {
		const gdocrp = new Discord.MessageEmbed()
		.setColor("#303136")
		.setTitle("Ｇｏｏｇｌｅ Ｄｏｃｓ")
		.setDescription("http://docs.google.com/")
		.setImage("https://thumbs.gfycat.com/MatureTartAmericanbittern-size_restricted.gif")
		.setFooter("Vous pouvez modifier l'apparence mais doit y rester les bases.")

		message.channel.send({ embed: gdocrp })
	}
})

client.on("message", message => {
	
	if(message.content.startsWith(`${prefix}boulots`)) {
		const boulots = new Discord.MessageEmbed()
		.setColor("#e66f12")
		.setDescription("*``` \n  Le déroulement des petits boulots  \n ```*\n\n💴  ﹒Cᥲιssιᥱr.ᥱ *`：c'est assez pratique et cela ne te prend pas beaucoup de temps. Bon, vous recevrez un petit salaire pour la peine mais assez pour faire de petites dépenses utiles ➜`* <@&737768423471317013>`.`\n\n🚼  ﹒Bᥲbყsιttᥱr *`：le salaire varie selon la personne, dur de faire une moyenne... Disons plutôt ➜`* <@&737785725549805659>`.`\n\n🎥  ﹒Yoᥙtᥙbᥱᥙr.sᥱ *`：tu te poses au calme devant ta caméra et enchaîne plusieurs sujets. Le salaire varie mais disons que tu gagnes entre ➜`* <@&737768423471317013> *`et`* <@&737785725549805659>`.`\n\n🍴  ﹒Sᥱrvᥱᥙr.sᥱ *`：je te conseille d'avoir un autre job car celui-ci ne paye pas vraiment bien... ➜`* <@&737785725549805659>`.`\n\n👔  ﹒Stᥲgιᥲιrᥱ *`：travailles-tu avec les scientifiques ou avec une grosse boîte ? Jack-pot ! Tu gagn(era)s beaucoup ➜`* <@&737785725101277235>`!`\n\n👓  ﹒Tᥙtᥱᥙr.trιᥴᥱ *`：tu donnes des cours particuliers, rien de plus normal. Cependant, tu dois être en terminale pour donner des cours aux premières et/ou seconde et tu dois être en première pour donner des cours aux secondes ➜`* <@&737785728989266010>`.`")
		.setImage("https://data.whicdn.com/images/307107229/original.gif")
		.setThumbnail("https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png")
		.setFooter("Plus à venir.")

		message.channel.send({ embed: boulots })
	}
})

client.on("message", message => {
	if(message.content.startsWith(`${prefix}métiers`)) {
		const métiers1 = new Discord.MessageEmbed()
		.setColor("#949662")
		.setDescription("``` \n                                                 \n``` \n\n<:flche:751052081682448457> **C'est bien d'avoir une éducation gratuite mais il va quand même falloir trouver un petit boulot pour se mettre quelque chose sous la dent !**\n\n<:flche:751052081682448457> <@&748632256460881960>**╏Ouch, ce n'est pas cool. Peut-être que tu as essayé tout et n'importe quoi pour te trouver un boulot mais rien n'a réussi. C'est bel et bien dommage mais vous ne servez à rien pour vous comme pour les autres.**\n\n<:flche:751052081682448457> <@&738057415366279288>**╏Garder des enfants mutants n'est pas plus mal. Certains pourraient piquer des crises à tout moment qui fera alors régner la terreur dû au manque d'expérience vis-à-vis de leur nouveau talent ! Ce travail est super bien rémunéré. Vous pouvez gagner jusqu'à 50€/heures ! Il suffit juste d'aller vous proposer à un quelconque scientifique et d'attendre une réponse de sa part. Courage !**\n\n<:flche:751052081682448457> <@&738095060083802164>**╏Ce que c'est cool de pouvoir s'asseoir, se filmer et parler à sa communauté. Non ? Seul soucis, c'est que chaque vidéo est revue en secret par des informaticiens de mèche avec les scientifiques. Alors ne tentez rien de dangereux. Vous commencerez à être payé que si vous arrivez à prouver à plus de 15 personnes que l'île est bénéfique ! Au moins 140€ toutes les 15 personnes.**\n\n<:flche:751052081682448457> <@&738057412874862692>**╏Ce n'est pas bien compliqué. Il suffit tout simplement de postuler à une supérette, centre-commercial ou super-marché pour avoir ce boulot. Il me semble que c'est simple et assez bien rémunéré pour les jeunes. 12€/heures !**\n\n<:flche:751052081682448457> <@&738095055805350008>**╏Pas toujours simple quand tu es une belle personne. Plusieurs personnes malveillantes voudront vous accoster et ce, même en publique. Quelle honte. Gare à vous, très peu de chance que la paye soit bonne. Cela peut aller de 5 à 45€/heures. Suffit de tomber sur l'bon !**\n\n** **")
		.setImage("https://media1.tenor.com/images/186b30b7ee68d26fe09efe88a5c6f51d/tenor.gif?itemid=12185266")
		.setThumbnail("https://media.discordapp.net/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png")
		.setTitle(":rose: ᙏᥙɾᥲ𝘀ᥲ Ꙇ𝘀Ꙇᥱ ᴿᴾ")

		const métiers2 = new Discord.MessageEmbed()
		.setColor("#92845e")
		.setDescription("<:flche:751052081682448457> <@&738095060276740239>**╏Recevoir une commande que ça soit de l'extérieur, de la nourriture ou des meubles ? C'est parti ! La plupart du temps, ce sont des scientifiques qui ont besoin de telle ou telle chose à amener à l'autre bout de l'île. Rien de bien spécial et c'est mieux d'avoir un vélo sur soit ! 10€ tous les 5 colis !**\n\n<:flche:751052081682448457> <@&738095060503232622>**╏Tu peux aider un ou plusieurs de tes camarades avec leurs cours ou même leurs capacités. Là n'est pas le soucis de l'école, si un élève vous escroque, vous serez porté fautif. La paye dépend de l'élève. Chacun fixera son prix et à vous de voir. Mais personne n'a le droit de donner plus de 100€/heures ! Des sales seront mises à dispositions ou vous pourrez vous poser dans un café, vous verrez ensemble !**\n\n<:flche:751052081682448457> <@&738095060322877490>**╏Ce rôle est réservé pour ceux souhaitant devenir à leur tour un scientifique ou un professeur de Chikin School. C'est super bien payé mais très dur à expliquer. Chacun recevra des tâches plus dures les unes des autres. Parfois vous aurez même droit à des atrocités, faire du mal à vos camarades, sécher des cours pour pouvoir travailler et j'en passe... Limite barbare mais la paye est de 1300/jours. Vous travaillerez même le week-end et les horaires varieront.**\n\n```\n \n```")
		.setImage("https://78.media.tumblr.com/4396fd67014d4bd09b8e40fddafb6a3f/tumblr_pbv9b6oH0O1v1hotuo1_500.gif")

		message.channel.send({ embed: métiers1 })
		message.channel.send({ embed: métiers2})
	}
})

client.on("message", message => {
	if(message.content.startsWith(`${prefix}partenariats`)) {
		const partenaires = new Discord.MessageEmbed()
		.setTitle("<:hugsmile:751043052700827750> **__Critères pour partenariats !__**")
		.setColor("#111010")
		.setDescription("```\n  \n```\n`Voici les conditions pour pouvoir effectuer un ou des partenariats avec Murasa Isle ! Nous espérons que cela vous conviendra et que si le contraire nous parvient, nous trouverons un terrain d'entente. Sur ce : les serveurs étant trop nombreux, une échelle entre les membres concernant spécialement les mentions a été établie pour ne pas ping à tue-tête !`\n\n<:point:751052081674190909>- | Entre 1 et 40 membres : **Une mention \"<@&742053236168458289>\" sera insérée.**\n<:point:751052081674190909>- | Entre 41 et 80 membres : **Une mention \"@here\" sera insérée.**\n<:point:751052081674190909>- | Entre 81 et plus de 100 membres : **Une mention \"@everyone\" sera insérée.**\n\nPS : *Cela s'appliquera que si c'est vous qui nous demandez un partenariat, l'inverse ci-dessous !*\n\n```\n  \n```\n\n`Si l'un des membres du staff de Murasa Isle demande un partenariat avec un de vos serveurs, les règles ci-dessus ne s'appliqueront pas à moins que vous vous mettez d'accord. Bien sûr, si Murasa Isle demande par exemple à un serveur avec 30 membres et que MI a 70 membres, probablement, le staff demandera un ping partenariat au lieu d'un here ou everyone. Après, si peu de monde est connecté, un here pourra se mettre en place. À voir`\n\n<:point:751052081674190909>- | Si un membre du staff de Murasa Isle demande un partenariat, le partenaire et le modo se devront de rester sur le serveur de l'un et de l'autre. Si cela n'est pas ou plus respecté, on enlèvera votre pub et quittera votre serveur.\n<:point:751052081674190909>- | Les serveurs des \"amis du staff\" seront envoyés deux fois au lieu d'une. À des moments différents de la journée.\n<:point:751052081674190909>- |  Merci de ne pas se plaindre des pings.\n\n```\n \n```")
		.setImage("https://data.whicdn.com/images/330723767/original.gif")

		message.channel.send({ embed: partenaires})
	}
})

client.on("message", message => {
	
	if(message.content.startsWith(`${prefix}rôles`)) {
		const rôles = new Discord.MessageEmbed()
		.setColor("#b6a496")
		.setDescription("*``` \n         Les rôles importants              \n ```*\n\n▫ 👨‍🏫 ▫ ᕈɾoƒᥱssᥱᥙɾ.ᥱ ᑯ'ᥙᥒᥱ ᥴꙆᥲssᥱ *`： apprendre à des jeunes décérébrés est toujours compliqué mais avec le temps, cela peut s'arranger. Le salaire est assez important ➜`* <@&737785728670498889>`.`\n\n◆ 🔖 ◆ ᙖᙃᙓ ᑯᥙ Ꙇყᥴᥱ́ᥱ *`：si tu arrives à te procurer ce rôle, sois en fière. Tu fais ou feras parti.e du syndicat des élèves entre-autre : le conseil étudiant. C'est un grade au-dessus des délégués de classe.`*\n\n◆ 📓 ◆ ᙃᥱ́Ꙇᥱ́ɠᥙᥱ́.ᥱ ᑯᥱ sᥲ ᥴꙆᥲssᥱ *`：tu amènes ta classe adorée (ou non) à la perfection. Tu leurs montreras le droit chemin et seras impérativement contre toute rébellion !`*\n\n◆ ✉️ ◆ ᙓꙆᥱ̀ʋᥱ ɾᥱᥴoຕຕᥲᥒᑯᥱ́.ᥱ *`：alors tu es né.e avec des gènes mutantes ? C'est très bien, tu seras très bien accueilli à Chikin School !`*\n\n▫ 🕵️ ▫ ᙀᥒ.ᥱ ᥱsρɩoᥒ.ᥒᥱ ɠᥱᥒtɩꙆ.Ꙇᥱ *`：tu essayeras de faire changer le système. Rendre libre les élèves tout faisant attention. Assurez-vous que personne ne sache que vous recevez de l'aide de l'extérieur...`*\n\n▫ 🔭 ▫ ᙀᥒ.ᥱ ᥱsρɩoᥒ.ᥒᥱ ຕᥱ́ᥴᖾᥲᥒt.ᥱ *`：alors, tu es de l'extérieur. Un journaliste, une expérience ratée ou juste un témoin qui essaye de savoir tous les petits secrets qui se cachent dans l'établissement. Pour cela, tu seras prêt.e à tout pour découvrir chaque détails !`*\n\n▫ 🧬 ▫ ᙀᥒ.ᥱ sᥴɩᥱᥒtɩƒɩϙᥙᥱ *`：tu aides à perfectionner la nouvelle génération d'humains. Que tu sois du côté malveillant ou bienveillant, tu as accès à certaines pièces de Chikin School.`*")
		.setImage("https://i.pinimg.com/originals/74/03/bb/7403bb576dc30961d0446fd4704cec4f.gif")
		.setThumbnail("https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png")

		message.channel.send({ embed: rôles })
	}
})

client.on("message", message => {
	
	if(message.content.startsWith(`${prefix}first`)) {
		const caractéristique = new Discord.MessageEmbed()
		.setColor("#303136")
		.setTitle("__𝙻𝙴𝚂 𝙲𝙰𝚁𝙰𝙲𝚃𝙴́𝚁𝙸𝚂𝚃𝙸𝚀𝚄𝙴𝚂__")
		.setDescription("** **\n体 <@&737665477639405580> ➠ *𝖫𝖾𝗌 𝖾́𝗆𝖾𝗍𝗍𝖾𝗎𝗋𝗌 𝗌𝗈𝗇𝗍 𝖽𝖾𝗌 𝗀𝖾𝗇𝗌 𝖺𝗒𝖺𝗇𝗍 𝖽𝖾𝗌 𝖼𝖺𝗉𝖺𝖼𝗂𝗍𝖾́𝗌 𝗊𝗎𝗂 𝗅𝖾𝗎𝗋 𝗉𝖾𝗋𝗆𝖾𝗍𝗍𝖾𝗇𝗍 𝖽𝖾 𝗀𝖾́𝗇𝖾́𝗋𝖾𝗋 𝖾𝗍 𝖾́𝗏𝖾𝗇𝗍𝗎𝖾𝗅𝗅𝖾𝗆𝖾𝗇𝗍 𝖽𝖾 𝖼𝗈𝗇𝗍𝗋𝗈̂𝗅𝖾𝗋 𝖼𝖾𝗋𝗍𝖺𝗂𝗇𝖾𝗌 𝖼𝗁𝗈𝗌𝖾𝗌, 𝗈𝗎 𝖽𝖾 𝗆𝗈𝖽𝗂𝖿𝗂𝖾𝗋 𝗅𝖾𝗌 𝖼𝗁𝗈𝗌𝖾𝗌 𝖾𝗑𝗂𝗌𝗍𝖺𝗇𝗍𝖾𝗌 𝖺𝗎𝗍𝗈𝗎𝗋 𝖽'𝖾𝗎𝗑 𝖽𝖾 𝖼𝖾𝗋𝗍𝖺𝗂𝗇𝖾𝗌 𝖿𝖺𝖼̧𝗈𝗇𝗌. 𝖫𝖾𝗌 𝖺𝗅𝗍𝖾𝗋𝗌 𝖽𝖾 𝗍𝗒𝗉𝖾 𝖺𝖼𝗍𝗂𝗏𝖺𝗍𝗂𝗈𝗇 𝗉𝖾𝗎𝗏𝖾𝗇𝗍 𝖺𝗏𝗈𝗂𝗋 𝗎𝗇𝖾 𝗀𝗋𝖺𝗇𝖽𝖾 𝗏𝖺𝗋𝗂𝖾́𝗍𝖾́ 𝖽𝖾 𝗉𝗋𝗈𝗉𝗋𝗂𝖾́𝗍𝖾́𝗌 𝖾𝗍 𝖽𝖾 𝖼𝖺𝗉𝖺𝖼𝗂𝗍𝖾́𝗌.*\n\n体 <@&737668980415922267> ➠ *𝖫𝖾𝗌 𝗆𝗎𝗍𝖺𝗇𝗍𝗌 𝗌𝗈𝗇𝗍 𝖽𝖾𝗌 𝗀𝖾𝗇𝗌 𝖽𝗈𝗍𝖾́𝗌 𝖽𝖾 𝖼𝖺𝗉𝖺𝖼𝗂𝗍𝖾́𝗌 𝗊𝗎𝗂 𝗉𝗋𝗈𝗏𝗈𝗊𝗎𝖾𝗇𝗍 𝖼𝗁𝖾𝗓 𝗅'𝗎𝗍𝗂𝗅𝗂𝗌𝖺𝗍𝖾𝗎𝗋 𝗎𝗇𝖾 \"𝖺𝗇𝗈𝗆𝖺𝗅𝗂𝖾\" 𝗉𝖾𝗋𝗆𝖺𝗇𝖾𝗇𝗍𝖾 𝖽𝗂𝗋𝖾𝖼𝗍𝖾𝗆𝖾𝗇𝗍 𝗅𝗂𝖾́𝖾 𝖺̀ 𝗌𝖺 𝗉𝗎𝗂𝗌𝗌𝖺𝗇𝖼𝖾. 𝖫𝖾𝗌 𝖺𝗅𝗍𝖾𝗋𝗌 𝖽𝖾 𝗍𝗒𝗉𝖾 𝗆𝗎𝗍𝖺𝗍𝗂𝗈𝗇 𝖼𝗋𝖾́𝖾𝗇𝗍 𝖽𝖾𝗌 𝗌𝗍𝗋𝗎𝖼𝗍𝗎𝗋𝖾𝗌 𝖼𝗈𝗋𝗉𝗈𝗋𝖾𝗅𝗅𝖾𝗌 𝗊𝗎𝗂 𝖺𝖼𝖼𝗈𝗋𝖽𝖾𝗇𝗍 𝖺̀ 𝗅'𝗎𝗍𝗂𝗅𝗂𝗌𝖺𝗍𝖾𝗎𝗋 𝖽𝖾𝗌 𝖼𝖺𝗉𝖺𝖼𝗂𝗍𝖾́𝗌 𝗉𝗅𝗎𝗌 𝖼𝗈𝗆𝗉𝗅𝖾𝗑𝖾𝗌 𝗊𝗎𝖾 𝗅𝖾𝗌 𝖼𝖺𝗉𝖺𝖼𝗂𝗍𝖾́𝗌 𝗅𝖾𝗌 𝗉𝗅𝗎𝗌 𝗌𝗎̂𝗋𝖾𝗌 𝖺𝖼𝖼𝗈𝗋𝖽𝖾́𝖾𝗌 𝗉𝖺𝗋 𝗅𝖾𝗌 𝖺𝗅𝗍𝖾𝗋𝗌 𝖽𝖾 𝗍𝗒𝗉𝖾 𝖺𝖼𝗍𝗂𝗏𝖺𝗍𝗂𝗈𝗇 𝖾𝗍 𝗅𝖾𝗌 𝖺𝗅𝗍𝖾𝗋𝗌 𝖽𝖾 𝗍𝗒𝗉𝖾 𝗍𝗋𝖺𝗇𝗌𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇. 𝖲𝗈𝗎𝗏𝖾𝗇𝗍, 𝗂𝗅𝗌 𝖼𝗈𝗇𝖿𝖾̀𝗋𝖾𝗇𝗍 𝖽𝖾𝗌 𝖺𝗉𝗉𝖾𝗇𝖽𝗂𝖼𝖾𝗌 𝗉𝗋𝖾́𝗁𝖾𝗇𝗌𝗂𝗅𝖾𝗌 𝗊𝗎𝖾 𝗅'𝗎𝗍𝗂𝗅𝗂𝗌𝖺𝗍𝖾𝗎𝗋 𝗉𝖾𝗎𝗍 𝖼𝗈𝗇𝗍𝗋𝗈̂𝗅𝖾𝗋 𝗈𝗎 𝖺𝗃𝗈𝗎𝗍𝖾𝗇𝗍 𝖽𝖾𝗌 𝗌𝗍𝗋𝗎𝖼𝗍𝗎𝗋𝖾𝗌 𝖺̀ 𝖽𝖾𝗌 𝗆𝖾𝗆𝖻𝗋𝖾𝗌 𝗉𝗋𝖾́𝖾𝗑𝗂𝗌𝗍𝖺𝗇𝗍𝗌 𝗉𝗈𝗎𝗋 𝖺𝗆𝖾́𝗅𝗂𝗈𝗋𝖾𝗋 𝗅𝖾𝗌 𝖼𝖺𝗉𝖺𝖼𝗂𝗍𝖾́𝗌 𝗉𝗋𝖾́𝖾𝗑𝗂𝗌𝗍𝖺𝗇𝗍𝖾𝗌. 𝖫𝖾𝗌 𝖺𝗅𝗍𝖾𝗋𝗌 𝖽𝖾 𝗍𝗒𝗉𝖾 𝗆𝗎𝗍𝖺𝗍𝗂𝗈𝗇 𝗈𝗇𝗍 𝗆𝖾̂𝗆𝖾 𝗅𝖺 𝖼𝖺𝗉𝖺𝖼𝗂𝗍𝖾́ 𝖽𝖾 𝖼𝖺𝗇𝖺𝗅𝗂𝗌𝖾𝗋 𝖼𝖾𝗋𝗍𝖺𝗂𝗇𝗌 𝖺𝗌𝗉𝖾𝖼𝗍𝗌 𝖽𝖾 𝗅𝖾𝗎𝗋 𝗎𝗍𝗂𝗅𝗂𝗌𝖺𝗍𝖾𝗎𝗋 𝖺̀ 𝗍𝗋𝖺𝗏𝖾𝗋𝗌 𝖾𝗎𝗑 𝖽'𝗎𝗇𝖾 𝗆𝖺𝗇𝗂𝖾̀𝗋𝖾 𝗌𝗂𝗆𝗂𝗅𝖺𝗂𝗋𝖾 𝖺𝗎𝗑 𝖺𝗅𝗍𝖾𝗋𝗌 𝖽𝖾 𝗍𝗒𝗉𝖾 𝖺𝖼𝗍𝗂𝗏𝖺𝗍𝗂𝗈𝗇.*\n\n** **")
		.setImage("https://i.pinimg.com/originals/50/32/43/503243cc27e6ee53a159363465f27b81.gif")
		.setThumbnail("https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png")

		message.channel.send({ embed: caractéristique })
	}
})

client.on("message", message => {
	
	if(message.content.startsWith(`${prefix}scd`)) {
		const caractéristiques = new Discord.MessageEmbed()
		.setColor("#303136")
		.setDescription("** **\n体 <@&737668983272112179> ➠ *𝖫𝖾𝗌 𝗍𝗋𝖺𝗇𝗌𝖿𝗈𝗋𝗆𝖺𝗍𝖾𝗎𝗋𝗌 𝗌𝗈𝗇𝗍 𝖽𝖾𝗌 𝗀𝖾𝗇𝗌 𝖺𝗒𝖺𝗇𝗍 𝖽𝖾𝗌 𝖼𝖺𝗉𝖺𝖼𝗂𝗍𝖾́𝗌 𝗊𝗎𝗂 𝗅𝖾𝗌 𝖺𝗆𝖾̀𝗇𝖾𝗇𝗍 𝖺̀ 𝗆𝗈𝖽𝗂𝖿𝗂𝖾𝗋 𝗍𝖾𝗆𝗉𝗈𝗋𝖺𝗂𝗋𝖾𝗆𝖾𝗇𝗍 𝗅𝖾𝗎𝗋 𝖼𝗈𝗋𝗉𝗌. 𝖫𝖾𝗌 𝖺𝗅𝗍𝖾𝗋𝗌 𝖽𝖾 𝗍𝗒𝗉𝖾 𝗍𝗋𝖺𝗇𝗌𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇 𝗉𝖾𝗋𝗆𝖾𝗍𝗍𝖾𝗇𝗍 𝖺̀ 𝗅'𝗎𝗍𝗂𝗅𝗂𝗌𝖺𝗍𝖾𝗎𝗋 𝖽𝖾 \"𝗍𝗋𝖺𝗇𝗌𝖿𝗈𝗋𝗆𝖾𝗋\" 𝗍𝖾𝗆𝗉𝗈𝗋𝖺𝗂𝗋𝖾𝗆𝖾𝗇𝗍 𝗌𝗈𝗇 𝖼𝗈𝗋𝗉𝗌 𝖽𝖾 𝖽𝗂𝗏𝖾𝗋𝗌𝖾𝗌 𝗆𝖺𝗇𝗂𝖾̀𝗋𝖾𝗌, 𝖾𝗇 𝖺𝗆𝖾́𝗅𝗂𝗈𝗋𝖺𝗇𝗍 𝗉𝖺𝗋𝖿𝗈𝗂𝗌 𝗅𝖾𝗌 𝖿𝗈𝗇𝖼𝗍𝗂𝗈𝗇𝗇𝖺𝗅𝗂𝗍𝖾́𝗌 𝖾𝗑𝗂𝗌𝗍𝖺𝗇𝗍𝖾𝗌, 𝖾𝗇 𝗌𝗎𝗉𝗉𝗋𝗂𝗆𝖺𝗇𝗍 𝖽𝖾𝗌 𝖿𝗈𝗇𝖼𝗍𝗂𝗈𝗇𝗇𝖺𝗅𝗂𝗍𝖾́𝗌 𝗈𝗎 𝖾𝗇 𝖺𝗃𝗈𝗎𝗍𝖺𝗇𝗍 𝖽𝖾 𝗇𝗈𝗎𝗏𝖾𝗅𝗅𝖾𝗌 𝖿𝗈𝗇𝖼𝗍𝗂𝗈𝗇𝗇𝖺𝗅𝗂𝗍𝖾́𝗌 𝖺𝗎 𝖼𝗈𝗋𝗉𝗌.*\n\n体 <@&737668985734168647> ➠ *𝖫𝖾𝗌 𝖺𝖼𝖼𝗎𝗆𝗎𝗅𝖺𝗍𝖾𝗎𝗋𝗌 𝗌𝗈𝗇𝗍 𝖽𝖾𝗌 𝗉𝖾𝗋𝗌𝗈𝗇𝗇𝖾𝗌 𝖺𝗒𝖺𝗇𝗍 𝖽𝖾𝗌 𝗉𝗈𝗎𝗏𝗈𝗂𝗋𝗌 𝗊𝗎𝗂, 𝗉𝗈𝗎𝗋 𝖿𝗈𝗇𝖼𝗍𝗂𝗈𝗇𝗇𝖾𝗋 𝖼𝗈𝗋𝗋𝖾𝖼𝗍𝖾𝗆𝖾𝗇𝗍, 𝗇𝖾́𝖼𝖾𝗌𝗌𝗂𝗍𝖾𝗇𝗍 𝗊𝗎𝖾 𝗅'𝗎𝗍𝗂𝗅𝗂𝗌𝖺𝗍𝖾𝗎𝗋 𝖺𝖼𝖼𝗎𝗆𝗎𝗅𝖾 𝗊𝗎𝖾𝗅𝗊𝗎𝖾 𝖼𝗁𝗈𝗌𝖾 𝖺̀ 𝗅'𝖺𝗏𝖺𝗇𝖼𝖾, 𝖼𝗈𝗆𝗆𝖾 𝖽𝖾 𝗅𝖺 𝗉𝗎𝗂𝗌𝗌𝖺𝗇𝖼𝖾, 𝖽𝖾 𝗅'𝖾́𝗇𝖾𝗋𝗀𝗂𝖾, 𝖽𝖾 𝗅𝖺 𝗆𝖺𝗌𝗌𝖾 𝗈𝗎 𝗎𝗇𝖾 𝗋𝖾𝗌𝗌𝗈𝗎𝗋𝖼𝖾 𝗉𝖺𝗋𝗍𝗂𝖼𝗎𝗅𝗂𝖾̀𝗋𝖾. 𝖯𝖺𝗋𝗆𝗂 𝗅𝖾𝗌 𝖺𝗅𝗍𝖾𝗋𝗌 𝖽𝖾 𝗍𝗒𝗉𝖾 𝖺𝖼𝖼𝗎𝗆𝗎𝗅𝖺𝗍𝗂𝗈𝗇.*\n\n体 <@&737668985750814720> ➠ *𝖠̀ 𝗏𝗈𝗂𝗋 𝖾𝗇 𝗀𝗂𝗏𝖾𝖺𝗐𝖺𝗒 !*\n\n** **")
		.setImage("https://s-media-cache-ak0.pinimg.com/originals/74/1a/21/741a2192c60bbbb1c9daeb9b88d3775d.gif")

		message.channel.send({ embed: caractéristiques })
	}
})

client.on("message", message => {

	if(message.content.startsWith(`${prefix}bar`)) {
		if(message.member.hasPermission("ADMINISTRATOR")) {
			const barrière = new Discord.MessageEmbed()
			.setColor("#303136")
			.setDescription("```\n                                                  \n```")
		
			message.channel.send({ embed: barrière });
		}
		else{
			const nobar = new Discord.MessageEmbed()
			.setColor("#303136")
			.setDescription(`Vous devez avoir une certaine permission pour pouvoir utiliser cette commande.`)
			message.channel.send({ embed: nobar})
			.then(msg => {
				msg.delete({ timeout: 2000 })
			  })
			message.channel.bulkDelete(1)
		}
}
});

client.on("message", message => {
	
	if(message.content.startsWith(`${prefix}thrd`)) {
		const caractéristiquess = new Discord.MessageEmbed()
		.setColor("#303136")
		.setTitle("____𝙻𝙴𝚂 𝙳𝙸𝙵𝙵𝙴́𝚁𝙴𝙽𝚃𝚂 𝚂𝚃𝚈𝙻𝙴𝚂____")
		.setDescription("** **\n体 <@&737668977878237278> ➠ 𝖫𝖾𝗌 𝖺𝗅𝗍𝖾𝗋𝗌 𝖽𝖺𝗇𝗌 𝖼𝖾 𝖽𝗈𝗆𝖺𝗂𝗇𝖾 𝗌𝗈𝗇 𝗌𝗉𝖾́𝖼𝗂𝖺𝗅𝗂𝗌𝖾́ 𝖽𝖺𝗇𝗌 𝗅𝖾𝗌 𝖺𝗍𝗍𝖺𝗊𝗎𝖾𝗌 𝗈𝖿𝖿𝖾𝗇𝗌𝗂𝗏𝖾𝗌 𝗉𝗅𝗎𝗌 𝗉𝗋𝖾́𝖼𝗂𝗌𝖾́𝗆𝖾𝗇𝗍 𝖽𝖺𝗇𝗌 𝗅𝖾𝗌 𝖼𝗈𝗆𝖻𝖺𝗍𝗌 𝖼𝗈𝗋𝗉𝗌 𝖺̀ 𝖼𝗈𝗋𝗉𝗌 𝗈𝗎 𝖺̀ 𝖽𝗂𝗌𝗍𝖺𝗇𝖼𝖾. 𝖢'𝖾𝗌𝗍 𝖺𝗌𝗌𝖾𝗓 𝗉𝗋𝖺𝗍𝗂𝗊𝗎𝖾 𝗉𝗈𝗎𝗋 𝗉𝖾𝗋𝗍𝗎𝗋𝖻𝖾𝗋 𝗏𝗈𝗍𝗋𝖾 𝖺𝖽𝗏𝖾𝗋𝗌𝖺𝗂𝗋𝖾 𝖽𝖺𝗇𝗌 𝗅𝖾𝗌 𝗉𝗅𝗎𝗌 𝖻𝗋𝖾𝖿𝗌 𝖽𝖾́𝗅𝖺𝗂𝗌 𝗆𝖺𝗂𝗌 𝖻𝗈𝗇... 𝖴𝗇 𝗉𝖾𝗎 𝗉𝗋𝖾́𝗏𝗂𝗌𝗂𝖻𝗅𝖾. 𝖳𝗈𝗎𝗍 𝖽𝖾́𝗉𝖾𝗇𝖽 𝖽𝖾 𝗅𝖺 𝖿𝖺𝖼𝗎𝗅𝗍𝖾́ 𝗊𝗎𝖾 𝗈𝗏𝗎𝗌 𝖺𝗏𝖾𝗓 𝖽𝖾́𝗏𝖾𝗅𝗈𝗉𝗉𝖾́ !\n\n体 <@&737675526436552724> ➠ 𝖫𝖾𝗌 𝖺𝗅𝗍𝖾𝗋𝗌 𝖽𝖺𝗇𝗌 𝖼𝖾 𝖽𝗈𝗆𝖺𝗂𝗇𝖾 𝗌𝗈𝗇 𝗌𝗉𝖾́𝖼𝗂𝖺𝗅𝗂𝗌𝖾́ 𝖽𝖺𝗇𝗌 𝗅𝖾𝗌 𝖺𝗍𝗍𝖺𝗊𝗎𝖾𝗌 𝗉𝗈𝗅𝗒𝗏𝖺𝗅𝖾𝗇𝗍𝖾𝗌 𝗉𝗅𝗎𝗌 𝗉𝗋𝖾́𝖼𝗂𝗌𝖾́𝗆𝖾𝗇𝗍 𝖽𝖺𝗇𝗌 𝗅𝖾𝗌 𝖼𝗈𝗆𝖻𝖺𝗍𝗌 𝖼𝗈𝗋𝗉𝗌 𝖺̀ 𝖼𝗈𝗋𝗉𝗌, 𝖺̀ 𝖽𝗂𝗌𝗍𝖺𝗇𝖼𝖾, 𝗌𝗍𝗋𝖺𝗍𝖾́𝗀𝗂𝗊𝗎𝖾𝗌 𝗈𝗎 𝖾𝗇𝖼𝗈𝗋𝖾 𝖽𝖾́𝖿𝖾𝗇𝗌𝗂𝖿𝗌. 𝖴𝗇 𝗆𝖾́𝗅𝖺𝗇𝗀𝖾 𝖽'𝖺̀ 𝗉𝖾𝗎 𝗉𝗋𝖾̀𝗌 𝗍𝗈𝗎𝗍. 𝖵𝗈𝗎𝗌 𝖾̂𝗍𝖾𝗌 𝖺𝗌𝗌𝖾𝗓 𝖻𝗈𝗇 𝖽𝖺𝗇𝗌 𝖼𝗁𝖺𝗊𝗎𝖾 𝖽𝗈𝗆𝖺𝗂𝗇𝖾 𝗆𝖺𝗂𝗌 𝗏𝗈𝗎𝗌 𝖺𝗏𝖾𝗓 𝖿𝗈𝗋𝖼𝖾́𝗆𝖾𝗇𝗍 𝖽𝖾𝗌 𝗉𝗈𝗂𝗇𝗍𝗌 𝖿𝖺𝗂𝖻𝗅𝖾𝗌 !\n\n体 <@&737675527850295336> ➠ 𝖫𝖾𝗌 𝖺𝗅𝗍𝖾𝗋𝗌 𝖽𝖺𝗇𝗌 𝖼𝖾 𝖽𝗈𝗆𝖺𝗂𝗇𝖾 𝗌𝗈𝗇 𝗌𝗉𝖾́𝖼𝗂𝖺𝗅𝗂𝗌𝖾́ 𝖽𝖺𝗇𝗌 𝗅𝖾𝗌 𝖺𝗍𝗍𝖺𝗊𝗎𝖾𝗌 𝖽𝖾́𝖿𝖾𝗇𝗌𝗂𝗏𝖾𝗌 𝖺𝗅𝗈𝗋𝗌 𝖾𝗇 𝗀𝗋𝗈𝗌, 𝗍𝗎 𝗉𝖾𝗎𝗑 𝖿𝖺𝗂𝗋𝖾 𝖽𝖾𝗌 𝖺𝗍𝗍𝖺𝗊𝗎𝖾𝗌 𝖺̀ 𝖽𝗂𝗌𝗍𝖺𝗇𝖼𝖾, 𝗌𝗍𝗋𝖺𝗍𝖾́𝗀𝗂𝗊𝗎𝖾𝗌 𝗈𝗎 𝖼𝗈𝗋𝗉𝗌 𝖺̀ 𝖼𝗈𝗋𝗉𝗌 ! 𝖭'𝗈𝗎𝖻𝗅𝗂𝖾 𝗉𝖺𝗌 𝗊𝗎𝖾 𝗍𝗎 𝗇'𝖾𝗌 𝗉𝖺𝗌 𝗂𝗇𝗏𝗂𝗇𝖼𝗂𝖻𝗅𝖾, 𝗂𝗅 𝗒 𝖺𝗎𝗋𝖺 𝗍𝗈𝗎𝗃𝗈𝗎𝗋𝗌 𝗉𝗅𝗎𝗌 𝖿𝗈𝗋𝗍 𝗊𝗎𝖾 𝗍𝗈𝗂.\n\n** **")
		.setImage("https://2.bp.blogspot.com/-96rK_RCIOOk/WmLk-cCWE2I/AAAAAAABDXU/Lcw2bHvht7ov1jlTFjzOnAAJBOPsPpX5gCKgBGAs/s1600/Omake%2BGif%2BAnime%2B-%2BViolet%2BEvergarden%2B-%2BEpisode%2B2%2B-%2BIris%2BNot%2BUsed%2Bto%2BHigh%2BHeels.gif")
		.setThumbnail("https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png")

		message.channel.send({ embed: caractéristiquess })
	}
})

client.on("message", message => {
	
	if(message.content.startsWith(`${prefix}cours`)) {
		const déroulementrp = new Discord.MessageEmbed()
		.setColor("#aab488")
		.setTitle("🌹 ᙏᥙɾᥲ𝘀ᥲ Ꙇ𝘀Ꙇᥱ ᴿᴾ")
		.setDescription("__**À** 𝘀𝗮𝘃𝗼𝗶𝗿 __⤵\n\n➤ *𝖭𝖾 𝗏𝗈𝗎𝗌 𝖾́𝗍𝗈𝗇𝗇𝖾𝗓 𝗉𝖺𝗌 𝗌𝗂 𝗂𝗅 𝗒 𝖺 𝖽𝖾 𝗇𝗈𝗎𝗏𝖾𝗅𝗅𝖾𝗌 𝗍𝖾̂𝗍𝖾𝗌 𝖼𝗁𝖺𝗊𝗎𝖾 𝗃𝗈𝗎𝗋. 𝖫'𝗂𝗇𝗌𝗍𝗂𝗍𝗎𝗍 𝗀𝗋𝖺𝗇𝖽𝗂𝗍 𝖺𝗎 𝖿𝗎𝗋 𝖾𝗍 𝖺̀ 𝗆𝖾𝗌𝗎𝗋𝖾 𝖾𝗍 𝗇𝖾 𝗌𝖾𝗋𝖺 𝗉𝖺𝗌 𝗉𝗋𝖾̂𝗍 𝖽𝖾 𝗌'𝖺𝗋𝗋𝖾̂𝗍𝖾𝗋. 𝖨𝗅 𝖿𝖺𝗎𝖽𝗋𝖺 𝖺𝗅𝗈𝗋𝗌 𝗉𝗋𝖾𝗇𝖽𝗋𝖾 𝗌𝗈𝗂𝗇 𝖽'𝖺𝖼𝖼𝗎𝖾𝗂𝗅𝗅𝗂𝗋 𝗅𝖾𝗌 𝗇𝗈𝗎𝗏𝖾𝖺𝗎𝗑 𝖾𝗍 𝖽𝖾 𝗅𝖾𝗎𝗋 𝖿𝖺𝗂𝗋𝖾 𝗋𝖾𝗌𝗉𝖾𝖼𝗍𝖾𝗋 𝗅𝖾𝗌 𝗋𝖾̀𝗀𝗅𝖾𝗌 𝖼𝗈𝗆𝗆𝖾 𝗂𝗅 𝗌𝖾 𝖽𝗈𝗂𝗍.*\n\n➤ *𝖤𝗇 𝗆𝖺𝗍𝗂𝗇𝖾́𝖾, 𝗂𝗅 𝗏𝖺 𝖿𝖺𝗅𝗅𝗈𝗂𝗋 𝗌𝗈𝗋𝗍𝗂𝗋 𝖽𝖾 𝗏𝗈𝗍𝗋𝖾 𝗉𝖾𝗍𝗂𝗍 𝖽𝗈𝗋𝗍𝗈𝗂𝗋 𝗊𝗎'𝗂𝗅 𝗌𝗈𝗂𝗍 𝗍𝗋𝗈𝗉 𝖽𝗈𝗎𝗂𝗅𝗅𝖾𝗍 𝗈𝗎 𝗇𝗈𝗇 𝗉𝗎𝗂𝗌 𝖺𝗅𝗅𝖾𝗋 𝖾𝗇 𝖽𝗂𝗋𝖾𝖼𝗍𝗂𝗈𝗇 𝖽𝖾 𝗏𝗈𝗍𝗋𝖾 𝗌𝖺𝗅𝗅𝖾 𝖽𝖾 𝖼𝗅𝖺𝗌𝗌𝖾. 𝖠𝗎𝖼𝗎𝗇 𝗋𝖾𝗍𝖺𝗋𝖽 𝗇'𝖾𝗌𝗍 𝗉𝖾𝗋𝗆𝗂𝗌 𝖾𝗍 𝗌𝖾 𝖽𝗈𝗂𝗍 𝖽'𝖾̂𝗍𝗋𝖾 𝗋𝖾𝗉𝗈𝗋𝗍𝖾́ 𝗉𝖺𝗋 𝗎𝗇 𝗆𝖾𝗆𝖻𝗋𝖾 𝖽𝗎 𝖡𝖣𝖤 𝗈𝗎 𝗎𝗇 𝖽𝖾́𝗅𝖾́𝗀𝗎𝖾́ 𝖽𝖾 𝖼𝗅𝖺𝗌𝗌𝖾. 𝖵𝗈𝗍𝗋𝖾 𝗉𝗋𝗈𝖿𝖾𝗌𝗌𝖾𝗎𝗋 𝗏𝗈𝗎𝗌 𝖽𝖾𝗈𝗇𝗇𝖾𝗋𝖺 𝖼𝗈𝗎𝗋𝗌 𝗌𝗎𝗋 𝗅𝖺 𝗆𝖺𝗍𝗂𝖾̀𝗋𝖾 𝗉𝗋𝖾́𝗏𝖾𝗇𝗎𝖾 𝗅𝖺 𝗏𝖾𝗂𝗅𝗅𝖾 𝗉𝗈𝗎𝗋 𝗎𝗇 𝗆𝖺𝗑𝗂𝗆𝗎𝗆 𝖽𝖾 𝟤𝟢 𝖺̀ 𝟥𝟢 𝗆𝗂𝗇𝗎𝗍𝖾𝗌.*\n\n➤ *𝖲'𝖾𝗇 𝗌𝗎𝗂𝗍 𝖾𝗇𝗌𝗎𝗂𝗍𝖾 𝗅𝖾𝗌 𝗋𝖾́𝖼𝗋𝖾́𝖺𝗍𝗂𝗈𝗇𝗌 𝗊𝗎𝗂 𝗌𝖾 𝗉𝖺𝗌𝗌𝖾𝗋𝗈𝗇𝗍 𝖽𝖺𝗇𝗌 𝗅𝖺 𝖼𝗈𝗎𝗋 𝗈𝗎 𝖽𝖺𝗇𝗌 𝗇'𝗂𝗆𝗉𝗈𝗋𝗍𝖾 𝗊𝗎𝖾𝗅 𝖾𝗇𝖽𝗋𝗈𝗂𝗍 𝖽𝖾 𝗅'𝗂𝗇𝗌𝗍𝗂𝗍𝗎𝗍 𝗍𝖺𝗇𝗍 𝗊𝗎𝖾 𝖼𝖾𝗍 𝖾𝗇𝖽𝗋𝗈𝗂𝗍 𝖾𝗌𝗍 𝖺𝗉𝗉𝗋𝗈𝗉𝗋𝗂𝖾́ 𝖺𝗎 𝖻𝗋𝗎𝗂𝗍. 𝖯𝖾𝗇𝖽𝖺𝗇𝗍 𝗎𝗇𝖾 𝖽𝗂𝗓𝖺𝗂𝗇𝖾 𝖽𝖾 𝗆𝗂𝗇𝗎𝗍𝖾𝗌 𝖺𝗏𝖺𝗇𝗍 𝖽𝖾 𝗋𝖾𝗍𝗈𝗎𝗋𝗇𝖾𝗋 𝖽𝖺𝗇𝗌 𝗌𝖺 𝗌𝖺𝗅𝗅𝖾 𝖽𝖾 𝖼𝗈𝗎𝗋 𝗈𝗎̀ 𝗏𝗈𝗎𝗌 𝖺𝗍𝗍𝖾𝗇𝖽𝗋𝖾𝗓 𝗏𝗈𝗍𝗋𝖾 𝗉𝗋𝗈𝖿𝖾𝗌𝗌𝖾𝗎𝗋.*\n\n➤ *𝖵𝗈𝗎𝗌 𝗏𝗂𝖾𝗇𝖽𝗋𝖾𝗓 𝗆𝖺𝗇𝗀𝖾𝗋 𝖺̀ 𝗆𝗂𝖽𝗂 𝗊𝗎𝖺𝗇𝖽 𝗏𝗈𝗎𝗌 𝗅𝖾 𝗉𝗈𝗎𝗋𝗋𝖾𝗓 𝗆𝖺𝗂𝗌 𝗏𝗈𝗍𝗋𝖾 𝗉𝖾𝗍𝗂𝗍𝖾 𝗉𝖾𝗋𝗌𝗈𝗇𝗇𝖾 𝗇𝖾 𝖽𝗈𝗂𝗍 𝗉𝖺𝗌 𝖺𝗉𝗉𝖺𝗋𝖺𝗂̂𝗍𝗋𝖾 𝖺𝗉𝗋𝖾̀𝗌 𝟣𝟥 𝗁𝖾𝗎𝗋𝖾𝗌 𝗈𝗎 𝗏𝗈𝗎𝗌 𝗌𝖾𝗋𝖾𝗓 𝖾𝗑𝖼𝗅𝗎𝖾 𝖺𝗎𝗍𝗈𝗆𝖺𝗍𝗂𝗊𝗎𝖾𝗆𝖾𝗇𝗍. 𝖨𝗅 𝗒 𝖺𝗎𝗋𝖺 𝗉𝗅𝗎𝗌𝗂𝖾𝗎𝗋𝗌 𝖼𝗁𝗈𝗂𝗑 : 𝖽𝖾𝗌 𝗉𝗅𝖺𝗍𝗌 𝗈𝖼𝖼𝗂𝖽𝖾𝗇𝗍𝖺𝗎𝗑 𝖼𝗈𝗆𝗆𝖾 𝗈𝗋𝗂𝖾𝗇𝗍𝖺𝗎𝗑. 𝖫𝖾 𝗀𝗋𝖺𝗇𝖽 𝗅𝗎𝗑𝖾 𝗇'𝖾𝗌𝗍-𝖼𝖾 𝗉𝖺𝗌 ?*")
		.setThumbnail("https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png")
		.setImage("https://thumbs.gfycat.com/WillingInferiorEgret-size_restricted.gif")
		message.channel.send({ embed: déroulementrp })
	}
})

client.on("message", message => {
	
	if(message.content.startsWith(`${prefix}cours2`)) {
		const déroulementrpp = new Discord.MessageEmbed()
		.setColor("#aab488")
		.setDescription("** **\n➤ *𝖵𝗈𝗎𝗌 𝖺𝗎𝗋𝖾𝗓 𝖺𝗅𝗈𝗋𝗌 𝗎𝗇𝖾 𝗉𝖾𝗍𝗂𝗍𝖾 𝗁𝖾𝗎𝗋𝖾 𝗉𝗈𝗎𝗋 𝖽𝗂𝗀𝖾́𝗋𝖾𝗋. 𝖠𝗅𝗅𝖾𝗓 𝗏𝗈𝗎𝗌 𝖾𝗇𝗍𝗋𝖺𝗂̂𝗇𝖾𝗋, 𝗉𝗂𝖼𝗈𝗅𝖾𝗋 𝗈𝗎 𝖾́𝗍𝗎𝖽𝗂𝖾𝗋. 𝖳𝖺𝗇𝗍 𝗊𝗎𝖾 𝗏𝗈𝗎𝗌 𝗋𝖾𝗌𝗍𝖾𝗓 𝖽𝖺𝗇𝗌 𝗅'𝖾𝗇𝖼𝖾𝗂𝗇𝗍𝖾 𝖽𝖾 𝗅'𝖾́𝗍𝖺𝖻𝗅𝗂𝗌𝗌𝖾𝗆𝖾𝗇𝗍.*\n\n➤ *𝖫'𝗁𝖾𝗎𝗋𝖾 𝗉𝖺𝗌𝗌𝖾́𝖾, 𝗏𝗈𝗎𝗌 𝗏𝗂𝖾𝗇𝖽𝗋𝖾𝗓 𝖿𝖺𝗂𝗋𝖾 𝗏𝗈𝗍𝗋𝖾 𝖽𝖾𝗋𝗇𝗂𝖾𝗋 𝖼𝗈𝗎𝗋 𝖽𝖾 𝗅𝖺 𝗃𝗈𝗎𝗋𝗇𝖾́𝖾.*\n\n➤ *𝖨𝗅 𝗏𝗈𝗎𝗌 𝗋𝖾𝗌𝗍𝖾𝗋𝖺 𝖺𝗅𝗈𝗋𝗌 𝗊𝗎𝖾𝗅𝗊𝗎𝖾𝗌 𝗍𝖾𝗆𝗉𝗌 𝗉𝗈𝗎𝗋 𝗉𝖺𝗌𝗌𝖾𝗋 𝗏𝗈𝗍𝗋𝖾 𝗍𝖾𝗆𝗉𝗌 𝖺𝗏𝖾𝖼 𝗏𝗈𝗍𝗋𝖾 𝖼𝗅𝗎𝖻, 𝖻𝗈𝗎𝗅𝗈𝗍 𝗈𝗎 𝗃𝖾 𝗇𝖾 𝗌𝖺𝗂𝗌 𝗊𝗎𝗈𝗂 𝖽'𝖺𝗎𝗍𝗋𝖾. 𝖢'𝖾𝗌𝗍 𝗅𝖾 𝗌𝖾𝗎𝗅 𝗆𝗈𝗆𝖾𝗇𝗍 𝗈𝗎̀ 𝗏𝗈𝗎𝗌 𝖺𝗎𝗋𝖾𝗓 𝗅𝖾 𝖽𝗋𝗈𝗂𝗍 𝖽𝖾 𝗌𝗈𝗋𝗍𝗂𝗋 𝖽𝖾 𝖢𝗁𝗂𝗄𝗂𝗇 𝖲𝖼𝗁𝗈𝗈𝗅.*\n\n➤ *𝖣𝖾 𝟣𝟨 𝗁𝖾𝗎𝗋𝖾𝗌 𝖺̀ 𝟣𝟫 𝗁𝖾𝗎𝗋𝖾𝗌 𝟥𝟢 𝗏𝗈𝗎𝗌 𝖺𝗎𝗋𝖾𝗓 𝗅𝖾 𝖽𝗋𝗈𝗂𝗍 𝖽𝖾 𝗌𝗈𝗋𝗍𝗂𝗋 𝖼𝗈𝗆𝗆𝖾 𝖽𝗂𝗍 𝖼𝗂-𝖽𝖾𝗌𝗌𝗎𝗌. 𝖠𝗅𝗈𝗋𝗌 𝖺𝗉𝗋𝖾̀𝗌 𝟣𝟫𝗁𝟥𝟢, 𝗅𝖾𝗌 𝗉𝗈𝗋𝗍𝖺𝗂𝗅𝗌 𝗌𝖾𝗋𝗈𝗇𝗍 𝖻𝗈𝗎𝖼𝗅𝖾́𝗌 𝖾𝗍 𝗏𝗈𝗎𝗌 𝗌𝖾𝗋𝖾𝗓 𝖽𝖺𝗇𝗌 𝗅'𝗈𝖻𝗅𝗂𝗀𝖺𝗍𝗂𝗈𝗇 𝖽𝖾 𝗋𝖾𝗏𝖾𝗇𝗂𝗋 𝗅𝖾 𝗅𝖾𝗇𝖽𝖾𝗆𝖺𝗂𝗇.*\n\n➤ *𝖫𝖾 𝖼𝗈𝗎𝗏𝗋𝖾-𝖿𝖾𝗎 𝖾𝗌𝗍 𝖺̀ 𝟤𝟤𝗁. 𝖤𝗇𝗍𝗋𝖾 𝟣𝟫𝗁𝟥𝟢 𝖾𝗍 𝗅'𝗁𝖾𝗎𝗋𝖾 𝖽𝗎 𝖼𝗈𝗎𝗏𝗋𝖾-𝖿𝖾𝗎, 𝗆𝖾𝗋𝖼𝗂 𝖻𝗂𝖾𝗇 𝖽'𝖺𝗅𝗅𝖾𝗋 𝗏𝗈𝗎𝗌 𝖾𝗇𝗍𝗋𝖺𝗂̂𝗇𝖾𝗋 𝗈𝗎 𝖾́𝗍𝗎𝖽𝗂𝖾𝗋. 𝖯𝗈𝗎𝗋 𝗅𝖾 𝗉𝖾𝗎 𝗊𝗎'𝗈𝗇 𝗏𝗈𝗎𝗌 𝖽𝖾𝗆𝖺𝗇𝖽𝖾𝗋𝖺, 𝗋𝖺𝗇𝗀𝖾𝗋 𝗏𝗈𝗍𝗋𝖾 𝖽𝗈𝗋𝗍𝗈𝗂𝗋.*")
		.setImage("https://4.bp.blogspot.com/-jcN_ixObXrY/WmLlo1ukZKI/AAAAAAABDXc/TPd2vmL6IP4jUO6zLzKr6662Sed72iE4wCKgBGAs/s1600/Omake%2BGif%2BAnime%2B-%2BViolet%2BEvergarden%2B-%2BEpisode%2B2%2B-%2BBenedict%2527s%2BHigh%2BHeels.gif")
		.setThumbnail("https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png")

		message.channel.send({ embed: déroulementrpp })
	}
})

client.on("message", message => {
	
	if(message.content.startsWith(`${prefix}lycées`)) {
		const leslycées = new Discord.MessageEmbed()
		.setColor("#81abd1")
		.setTitle(':rose: ᙏᥙɾᥲ𝘀ᥲ Ꙇ𝘀Ꙇᥱ ᴿᴾ')
		.setDescription("__**À** 𝘀𝗮𝘃𝗼𝗶𝗿 __ :arrow_heading_down:\n\n➤ *<@&737662677454684260> est un département de Chikin School comme ses frères <@&737662924428148836> et <@&737662929733943376>. Réputé pour ses élèves étant intéressés par la **popularité** que par autre chose, ils se dirigent alors vers les activités qui pourront les rendre plus connus qu'ils ne le sont déjà. Dans tout ce qui est extravagant et j'en passe. Ceux qui ont donc des pouvoirs qui tapent dans l'oeil, il est recommandé de choisir ce quartier.*\n\n➤ *<@&737662924428148836> est lui aussi réputé mais pour une toute autre raison, connu pour son **intelligence**, ce département regorge d'<@&742053219575922688> ! Il vaut mieux avoir les élèves de cette fillière pour amis que pour ennemis. Croyez-moi, ils peuvent vous détruire la vie tout comme le lycée Tomi...*\n\n➤ *<@&737662929733943376> se désigne en un seul mot : **richesse**. Il est alors conseillé de rejoindre cette \"fillière\" (quartier/département) si vous voulez choisir une voie sûre qui vous permet d'avoir de l'argent à gogo. Aimant parvenir à n'importe quel moyen pour s'en mettre plein les poches, le département Tomi vous ouvre les portes !*")
		.setImage("https://i.pinimg.com/originals/fd/ea/77/fdea77de4a2ed1da4d2ce78859e54191.gif")
		.setThumbnail("https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png")

		message.channel.send({ embed: leslycées })
	}
})

client.on("message", message => {
	
	if(message.content.startsWith(`${prefix}sanctions`)) {
		const lessanctions = new Discord.MessageEmbed()
		.setColor("#23684a")
		.setTitle(':rose: ᙏᥙɾᥲ𝘀ᥲ Ꙇ𝘀Ꙇᥱ ᴿᴾ')
		.setDescription("__𝙻𝙴𝚂 𝚂𝙰𝙽𝙲𝚃𝙸𝙾𝙽𝚂__\n\n```diff\n\n- IL Y AURA TOUJOURS DES AVERTISSEMENTS AVANT UN WARN !\n\n- 1 WARN : RIEN\n- 2 WARN : RESET STATS\n- 3 WARN : RESET DU PERSONNAGE RP\n- 4 WARN : BAN 24H\n- 5 WARN : BAN PERMANENT\n\n```")
		.setImage("https://i.gifer.com/Off9.gif")
		.setThumbnail("https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png")

		message.channel.send({ embed: lessanctions })
	}
})

client.on("message", message => {
	
	if(message.content.startsWith(`${prefix}plaintes`)) {
		const lesplaintes = new Discord.MessageEmbed()
		.setColor("#23684a")
		.setTitle(':rose: ᙏᥙɾᥲ𝘀ᥲ Ꙇ𝘀Ꙇᥱ ᴿᴾ')
		.setDescription("__𝙻𝙴𝚂 𝙿𝙻𝙰𝙸𝙽𝚃𝙴𝚂__\n\n```diff\n- Merci de ne pas abuser des plaintes. On s'en fout un peu pas mal de ce qui vous plaît ou non donc... :)\n\n- Ne pas ping bêtement car euh... Ça sera encore plus long !\n\n- Les plaintes futiles comme \"On m'a insulté de pas beau\" ne seront pas pris à la rigolade. Surtout si vous pingez un membre du staff. BIM BAM BOUM => 1 WARN !\n\n- Le salon des plaintes sera compté comme un salon de suggestions. Alors vous pourrez proposer vos idées tout en argumentant intelligemment. Un peu comme du marketing. Faites votre possible pour être vendeur. ;)\n\n- Surtout, si il y a des plaintes concernant un fonctionnement du serveur... Il faudra ping la fonda et personne d'autre. Un 1v1 bien au calme. Je n'aime pas qu'on remette en question c'que j'ai sué, thanks.\n```")
		.setImage("https://i.imgur.com/62pYhVw.gif")
		.setThumbnail("https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png")

		message.channel.send({ embed: lesplaintes })
	}
})

client.on("message", message => {
	
	if(message.content.startsWith(`${prefix}races`)) {
		const lesraces = new Discord.MessageEmbed()
		.setColor("#1f2272")
		.setTitle(':rose: ᙏᥙɾᥲ𝘀ᥲ Ꙇ𝘀Ꙇᥱ ᴿᴾ')
		.setDescription("__**À** 𝘀𝗮𝘃𝗼𝗶𝗿 __:arrow_heading_down:\n\n➤ *\"Que veut dire être __un.e mutant.e__ ?\" alors être un ou une mutante veut dire que votre descendance est née en ayant développée des facultés naturellement contrairement aux Humains que je vais expliquer ci-dessous. Les Mutants sont un groupe ou plutôt une race très aimée par Chikin School car les scientifiques investissent moins d'argent pour leurs expériences. Alors ne soyez pas étonnés qu'il y ait des discriminations entre les deux races.*\n\n➤ *\"Que veut dire être __un.e humain.e__ ?\" c'est tout bonnement simple voyons ! Être un être humain (sur Murasa Isle) veut tout simplement dire que tu as subis une ou des expériences de gré ou de force. Tu as alors eu moins de chance comparé aux Mutants qui eux, viennent - la plupart du temps - dans l'institut par leur propre volonté alors que ceux qui ont eu recours aux piqûres droguées  injectées dans leur corps ont été malheureusement obligés d'y entrer que ça leur plaisent ou non.*")
		.setImage("https://giffiles.alphacoders.com/109/109237.gif")
		.setThumbnail("https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png")

		message.channel.send({ embed: lesraces })
	}
})

client.on("message", message => {
	
	if(message.content.startsWith(`${prefix}staff2`)) {
		const questionnaire = new Discord.MessageEmbed()
		.setColor("#6b2dad")
		.setTitle(':rose: ᙏᥙɾᥲ𝘀ᥲ Ꙇ𝘀Ꙇᥱ ᴿᴾ')
		.setDescription("𝖵𝗈𝗂𝖼𝗂 𝗅𝖾 𝗉𝖾𝗍𝗂𝗍 𝗊𝗎𝖾𝗌𝗍𝗂𝗈𝗇𝗇𝖺𝗂𝗋𝖾 𝗉𝗈𝗎𝗋 𝗉𝗈𝗌𝗍𝗎𝗅𝖾𝗋 𝖾𝗇 𝗍𝖺𝗇𝗍 𝗊𝗎𝖾 𝗌𝗍𝖺𝖿𝖿. 𝖨𝗅 𝗇'𝗒 𝖺 𝗉𝖺𝗌 𝗏𝗋𝖺𝗂𝗆𝖾𝗇𝗍 𝖽𝖾 𝖽𝖺𝗍𝖾𝗌 𝗅𝗂𝗆𝗂𝗍𝖾𝗌, 𝗃𝖾 𝗉𝖾𝗎𝗑 𝗋𝖾𝖿𝗎𝗌𝖾𝗋 𝗏𝗈𝗍𝗋𝖾 𝖽𝖾𝗆𝖺𝗇𝖽𝖾 𝗉𝗈𝗎𝗋 𝗎𝗇 𝗆𝗈𝗆𝖾𝗇𝗍 𝗆𝖺𝗂𝗌 𝗉𝖾𝗎𝗍 𝗏𝗈𝗎𝗌 𝗉𝗋𝗈𝗉𝗈𝗌𝖾𝗋 𝗎𝗇 𝖺𝗎𝗍𝗋𝖾 𝗃𝗈𝗎𝗋 𝗊𝗎𝖺𝗇𝖽 𝗏𝗈𝗍𝗋𝖾 𝖼𝗁𝖺𝗇𝖼𝖾 𝗏𝗂𝖾𝗇𝖽𝗋𝖺. 𝖲𝗈𝗒𝖾𝗓 𝗀𝖾́𝗇𝖾́𝗋𝖾𝗎𝗑 𝖾𝗍 𝗇'𝗁𝖾́𝗌𝗂𝗍𝖾𝗓 𝗉𝖺𝗌 𝖺̀ 𝖻𝗂𝖾𝗇 𝖾́𝖼𝗋𝗂𝗋𝖾 𝗉𝗈𝗎𝗋 𝗆𝗈𝗇𝗍𝗋𝖾𝗋 𝗏𝗈𝗍𝗋𝖾 𝗌𝖾́𝗋𝗂𝖾𝗎𝗑. 𝖯𝖺𝗌𝗌𝖾𝗓 𝗎𝗇𝖾 𝖻𝖾𝗅𝗅𝖾 𝗏𝗂𝖾 !\n\n`㊙️` ➨ https://forms.gle/aPiGddUs64ufRyRw5")
		.setImage("https://media.discordapp.net/attachments/515849983337955335/735914537039036426/Ayato_gif.gif")
		.setThumbnail("https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png")

		message.channel.send({ embed: questionnaire })
	}
})

client.on("message", message => {
	
	if(message.content.startsWith(`${prefix}nsfw`)) {
		const coquins = new Discord.MessageEmbed()
		.setColor("#0e1e50")
		.setTitle(':rose: ᙏᥙɾᥲ𝘀ᥲ Ꙇ𝘀Ꙇᥱ ᴿᴾ')
		.setDescription("__**À** 𝘀𝗮𝘃𝗼𝗶𝗿 __:arrow_heading_down:\n\n```md\n# Ne pas abuser de ce channel en y postant des photos, vidéos, liens, gifs, etc en permanence ou le staff sera en obligation de mettre le mode lent.\n\n# Ne pas discuter, juste poster et/ou ping un pote pour montrer vos trouvailles mais rien d'autre.\n\n# Si vous ne voulez plus avoir le rôle +18, merci d'aller voir un membre du staff et que si ce membre est connecté.e !\n\n# Sur ce, on vous souhaite un bon moment avec vos cochonneries !\n```")
		.setImage("https://data.whicdn.com/images/336509479/original.gif")
		.setThumbnail("https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png")

		message.channel.send({ embed: coquins })
	}
})

client.on('message', message => {
	if (message.content.startsWith(`${prefix}rôlesdeb`)) {
		message.channel.send("** **\n﹒`📎` ➺ `Pour recevoir le rôle :`*`〔📎〕ᕈings ρartenariats`*`!`\n\n﹒`🎊` ➺ `Pour recevoir le rôle :`*`〔🎊〕ᕈings ᥱ́venements`*`!`\n\n﹒`❓` ➺ `Pour recevoir le rôle :`*`〔❓〕ᕈings ᑯemandes ɾp`*`!`\n\n﹒`🎉` ➺ `Pour recevoir le rôle :`*`〔🎉〕ᕈings ɠiveaways`*`!`\n** **",
	)
	}
})

client.on('message', message => {
	if(message.content.startsWith(`${prefix}infos`)) {
		const members = message.guild.members.cache
		const roles = message.guild.roles.cache
		const emojis = message.guild.emojis.cache
		const channels = message.guild.channels.cache

		const embed = new Discord.MessageEmbed()
		.setTitle(message.guild.name, message.guild.iconURL)
		.setColor("#862a92")
		.setDescription(`**Fondatrice du serveur :** ${message.guild.owner}**!**`)
		.setImage('https://wasasum.files.wordpress.com/2016/07/87cc49_da784e20a96d4b2f9bfafc15eb545399.gif?w=371&h=208&crop=1')
		.setThumbnail("https://images-ext-2.discordapp.net/external/PjvDKZ2iOl17h6ImsLDWXcwc8jyQJpDYzfHmiQ8qL2g/%3Fsize%3D2048/https/cdn.discordapp.com/icons/737408147487981688/e2f354496b4775165dae4e611057f8cf.png")
		.addField('❊ `Membres :`', `${message.guild.memberCount}`, true)
		.addField('❊ `Humains :`', `${members.filter(member => !member.user.bot).size}`, true)
		.addField('❊ `Bots :`', `${message.guild.members.cache.filter(m=>m.user.bot).size}`, true)
		.addField('❊ `AFK :`', `${message.guild.afkTimeout / 60} minutes`, true)
		.addField('❊ `Rôles :`', `${roles.size} rôles !`, true)
		.addField('❊ `Emojis :`', `${emojis.size} émojis !`, true)
		.addField('❊ `Salons :`', `${channels.size} salons !`, true)
		.addField('❊ `Lieu :`', message.guild.region, true)
		.addField('❊ `Création :`', message.guild.createdAt.toLocaleString(), true)
		.setTimestamp()
		.setFooter(client.user.username, "https://images-ext-1.discordapp.net/external/fBHAy8ZMbQGeA5AZ8tw_SORL_NPmCry-eEiO7p_tYQM/https/cdn.discordapp.com/avatars/739956704418201732/a3503515438eae798c6c5c427685972e.webp");
	  
		message.channel.send({embed});
	}
  });

client.on('message', async message => {
	if(message.author.bot || message.channel.type === "dm") return;

	const messageArray = message.content.split(" ");
	const cmd = messageArray[0];
	const args = messageArray.slice(1);

	if(message.content.startsWith(`${prefix}poll`)) {
		if(message.member.hasPermission("MANAGE_MESSAGES")) {
			let pollChannel = message.mentions.channels.first();
			let pollDescription = args.slice(1).join(' ');
	
			let embedPoll = new Discord.MessageEmbed()
			.setColor("#303136")
			.setTitle('₊˚꒰:coffee:˳ • Uᥒ ᥒoᥙvᥱᥲᥙ soᥒdᥲgᥱ !')
			.setDescription(pollDescription)
			.setImage("https://data.whicdn.com/images/284321869/original.gif")
			.setThumbnail('https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png')
			.setTimestamp()
			.setFooter(client.user.username, "https://images-ext-1.discordapp.net/external/fBHAy8ZMbQGeA5AZ8tw_SORL_NPmCry-eEiO7p_tYQM/https/cdn.discordapp.com/avatars/739956704418201732/a3503515438eae798c6c5c427685972e.webp");
			let msgEmbed = await pollChannel.send(embedPoll);
			await msgEmbed.react('🍥')
			await msgEmbed.react('🍣')
		}
		else {
			message.reply("Tu n'as pas la permission pour taper cette commande !")
			.then(msg => {
				msg.delete({ timeout: 2000 })
			  })
			message.channel.bulkDelete(1)
		}
	}
})

client.on('message', async message => {
	if(message.author.bot || message.channel.type === "dm") return;

	const messageArray = message.content.split(" ");
	const cmd = messageArray[0];
	const args = messageArray.slice(1);

	if(message.content.startsWith(`${prefix}annonce`)) {
		if(message.member.hasPermission("MANAGE_MESSAGES")) {
			let annonceChannel = message.mentions.channels.first();
			let annonceDescription = args.slice(1).join(' ');
	
			let embedAnnonce = new Discord.MessageEmbed()
			.setColor("#abb9b3")
			.setTitle('₊˚꒰🍙˳ • Uᥒᥱ ᥒoᥙvᥱᥣᥣᥱ ᥲᥒᥒoᥒᥴᥱ !')
			.setDescription(annonceDescription)
			.setImage("https://64.media.tumblr.com/205b84b1295d46c2b3543653aff0367c/tumblr_pm9etef5461x4ydeto1_500.gif")
			.setThumbnail('https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png')
			.setTimestamp()
			.setFooter(client.user.username, "https://images-ext-1.discordapp.net/external/fBHAy8ZMbQGeA5AZ8tw_SORL_NPmCry-eEiO7p_tYQM/https/cdn.discordapp.com/avatars/739956704418201732/a3503515438eae798c6c5c427685972e.webp");
			let msgEmbed = await annonceChannel.send(embedAnnonce);
			await msgEmbed.react('✅')
		}
		else {
			message.reply("Tu n'as pas la permission pour taper cette commande !")
			.then(msg => {
				msg.delete({ timeout: 2000 })
			  })
			message.channel.bulkDelete(1)
	}
}
})

client.on('message', message => {
	// Ignore messages that aren't from a guild
	if (!message.guild) return;
  
	// If the message content starts with "!kick"
	if (message.content.startsWith(`${prefix}kick`)) {
	  // Assuming we mention someone in the message, this will return the user
	  // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
	  const user = message.mentions.users.first();
	  // If we have a user mentioned
	  if (user) {
		// Now we get the member from the user
		const member = message.guild.member(user);
		// If the member is in the guild
		if (member) {
		  /**
		   * Kick the member
		   * Make sure you run this on a member, not a user!
		   * There are big differences between a user and a member
		   */
		  member
			.kick('Optional reason that will display in the audit logs')
			.then(() => {
			  // We let the message author know we were able to kick the person
			  message.reply(`Nous avons expuslé : ${user.tag} avec succès !`);
			})
			.catch(err => {
			  // An error happened
			  // This is generally due to the bot not being able to kick the member,
			  // either due to missing permissions or role hierarchy
			  message.reply("J'ai été incapable d'expluser ce membre.");
			  // Log the error
			  console.error(err);
			});
		} else {
		  // The mentioned user isn't in this guild
		  message.reply("Cette personne n'est pas dans ce serveur !");
		}
		// Otherwise, if no user was mentioned
	  } else {
		message.reply("Tu n'as pas mentionné la personne à expulser !");
	  }
	}
  });

client.on('message', message => {

	const args = message.content.trim().split(/ +/g);

	if(message.content.startsWith(`${prefix}unban`)) {
		if(!message.member.hasPermission("BAN_MEMBERS")) {
		  return message.channel.send(`**${message.author.username}**, You do not have perms to unban someone`)
		}
		
		if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
		  return message.channel.send(`**${message.author.username}**, I do not have perms to unban someone`)
		}
		
		let userID = args[0]
		  message.guild.fetchBans().then(bans=> {
		  if(bans.size == 0) return 
		  let bUser = bans.find(b => b.user.id == userID)
		  if(!bUser) return
		  message.guild.members.unban(bUser.user)
	})
		
	  ;}
})

client.on("message", async message => {
    if (message.author.bot) return; // ignore bots

    // if the user is not on db add the user and change his values to 0
    if (!db[message.author.id]) db[message.author.id] = {
        xp: 0,
        level: 0
      };
    db[message.author.id].xp++;
    let userInfo = db[message.author.id];
    if(userInfo.xp > 100) {
        userInfo.level++
		userInfo.xp = 0
		const lvlEmbed = new Discord.MessageEmbed()
		.setColor('#303136')
		.setDescription(`<:oh:750710966249062512>` + member.toString() + `Félicitations, tu as augmenté d'un niveau de plus !`)
		await client.channels.cache.get("737649522335023146").send({ embed: lvlEmbed })
    }
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(message.content.startsWith(`${prefix}lvlinfo`)) {
        let userInfo = db[message.author.id];
        let member = message.mentions.members.first();
        let create = new Discord.MessageEmbed()
		.setColor('#303136')
		.setImage("https://thumbs.gfycat.com/RepulsiveMintyLaughingthrush-small.gif")
		.setThumbnail("https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png")
        .addField("Level", userInfo.level)
		.addField("XP", userInfo.xp+"/100")
		.setTimestamp()
		.setFooter(client.user.username, "https://images-ext-1.discordapp.net/external/fBHAy8ZMbQGeA5AZ8tw_SORL_NPmCry-eEiO7p_tYQM/https/cdn.discordapp.com/avatars/739956704418201732/a3503515438eae798c6c5c427685972e.webp");
        if(!member) return message.channel.send({embed: create});
        let memberInfo = db[member.id]
        let embed2 = new Discord.MessageEmbed()
		.setColor('#303136')
		.setImage("https://i.gifer.com/XikM.gif")
		.setThumbnail("https://cdn.discordapp.com/attachments/739401006793883730/746765178363707412/anime-violet-evergarden-58515.png")
        .addField("Level", memberInfo.level, true)
		.addField("XP", memberInfo.xp+"/100", true)
		.setTimestamp()
		.setFooter(client.user.username, "https://images-ext-1.discordapp.net/external/fBHAy8ZMbQGeA5AZ8tw_SORL_NPmCry-eEiO7p_tYQM/https/cdn.discordapp.com/avatars/739956704418201732/a3503515438eae798c6c5c427685972e.webp");
        message.channel.send({ embed: embed2 });
    }
    fs.writeFile("./database.json", JSON.stringify(db), (x) => {
        if (x) console.error(x)
      });
})

client.login(process.env.BOT_TOKEN);
