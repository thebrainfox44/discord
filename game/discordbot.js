(async () => {
	const Discord = require("discord.js");
	const Database = require("easy-json-database");
	const devMode = typeof __E_IS_DEV !== "undefined" && __E_IS_DEV;
	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	const s4d = {
		Discord,
		database: new Database(`${devMode ? S4D_NATIVE_GET_PATH : "."}/db.json`),
		joiningMember: null,
		reply: null,
		tokenInvalid: false,
		tokenError: null,
		checkMessageExists() {
			if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
			if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
		}
	};
	s4d.client = new s4d.Discord.Client({
		intents: [Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)],
		partials: ["REACTION"]
	});

	var pub, pubCategorie, optionFormat;


	await s4d.client.login('OTQ2MDE4NjU3MDUyNTQ5MTQw.YhYmiA._irCpcWUloXyh_u6BcfMcoonhck').catch((e) => {
		s4d.tokenInvalid = true;
		s4d.tokenError = e;
	});

	s4d.client.on('messageCreate', async (s4dmessage) => {
		if (s4d.client.channels.cache.find((channel) => channel.name === 'pub') == (s4dmessage.channel) && (s4dmessage.content) == '!pub') {
			(s4dmessage.channel).send({
				embed: {
					title: 'quel est le contenu de la pub ?',
					color: '#ffcc33',
					image: {
						url: null
					},

					description: 'écrivez votre pub dans ce salon',
					footer: {
						text: ([(new Date().getDate()), ', ', (new Date().getHours()), ':', (new Date().getMinutes())].join(''))
					},
					thumbnail: {
						url: null
					}

				}
			});
			(s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
				time: (1 * 60 * 1000),
				max: 1
			}).then(async (collected) => {
				s4d.reply = collected.first().content;
				if (!(s4dmessage.content).length) {
					s4dmessage.channel.send({
						embed: {
							title: 'la pub ne peut pas être vide',
							color: '#ff0000',
							image: {
								url: null
							},

							description: 'opération anulée',
							footer: {
								text: ([(new Date().getDate()), ', ', (new Date().getHours()), ':', (new Date().getMinutes())].join(''))
							},
							thumbnail: {
								url: null
							}

						}
					});
				} else {
					pub = (s4dmessage.content);
				}
				(s4dmessage.channel).send({
					embed: {
						title: 'dans quelle catégorie cette pub doit être affichée ?',
						color: '#ffcc33',
						image: {
							url: null
						},

						description: (['catégories possibles :', '\n', 'serveur pub | graphismes | youtube | communauté | RP | spam pub | jeux | sites'].join('')),
						footer: {
							text: ([(new Date().getDate()), ', ', (new Date().getHours()), ':', (new Date().getMinutes())].join(''))
						},
						thumbnail: {
							url: null
						}

					}
				});
				(s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
					time: (1 * 60 * 1000),
					max: 1
				}).then(async (collected) => {
					s4d.reply = collected.first().content;
					if (!(s4dmessage.content).length) {
						s4dmessage.channel.send({
							embed: {
								title: 'opération anulée',
								color: '#ff0000',
								image: {
									url: null
								},

								description: 'la catégorie ne peut pas être vide',
								footer: {
									text: ([(new Date().getDate()), ', ', (new Date().getHours()), ':', (new Date().getMinutes())].join(''))
								},
								thumbnail: {
									url: null
								}

							}
						});
					} else {
						if ((s4dmessage.content) == 'serveur pub') {
							pubCategorie = s4d.client.channels.cache.find((channel) => channel.name === 'publicitaire');
						} else if ((s4dmessage.content) == 'graphismes') {
							pubCategorie = s4d.client.channels.cache.find((channel) => channel.name === 'graphismes');
						} else if ((s4dmessage.content) == 'youtube') {
							pubCategorie = s4d.client.channels.cache.find((channel) => channel.name === 'youtube');
						} else if ((s4dmessage.content) == 'communauté') {
							pubCategorie = s4d.client.channels.cache.find((channel) => channel.name === 'communauté');
						} else if ((s4dmessage.content) == 'spam pub') {
							pubCategorie = s4d.client.channels.cache.find((channel) => channel.name === 'spam pub');
						} else if ((s4dmessage.content) == 'jeux') {
							pubCategorie = s4d.client.channels.cache.find((channel) => channel.name === 'jeux');
						} else if ((s4dmessage.content) == 'sites') {
							pubCategorie = s4d.client.channels.cache.find((channel) => channel.name === 'sites');
						} else if ((s4dmessage.content) == 'RP') {
							pubCategorie = s4d.client.channels.cache.find((channel) => channel.name === 'RP');
						} else {
							s4dmessage.channel.send({
								embed: {
									title: 'opération anulée',
									color: '#ff0000',
									image: {
										url: null
									},

									description: 'cette catégorie n\'existe pas',
									footer: {
										text: ([(new Date().getDate()), ', ', (new Date().getHours()), ':', (new Date().getMinutes())].join(''))
									},
									thumbnail: {
										url: null
									}

								}
							});
						}
						if (String('serveur pub graphismes youtube communauté RP spam pub jeux sites').includes(String((s4dmessage.content)))) {
							(s4dmessage.channel).send({
								embed: {
									title: 'voulez vous utiliser la fonction *présentation améliorée (bêta)* ?',
									color: '#ffcc33',
									image: {
										url: null
									},

									description: (['cette fonctionnalité augmentera le délai de vérification et pourrait ne pas marcher correctement', '\n', 'répondez par "oui" ou par "non"'].join('')),
									footer: {
										text: ([(new Date().getDate()), ', ', (new Date().getHours()), ':', (new Date().getMinutes())].join(''))
									},
									thumbnail: {
										url: null
									}

								}
							});
							(s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
								time: (1 * 60 * 1000),
								max: 1
							}).then(async (collected) => {
								s4d.reply = collected.first().content;
								if ((s4dmessage.content) == 'non' && (s4dmessage.content) == 'oui') {
									if ((s4dmessage.content) == 'oui') {
										optionFormat = 'true';
									} else if ((s4dmessage.content) == 'non') {
										optionFormat = 'false';
									}
									s4dmessage.channel.send({
										embed: {
											title: 'opération terminée',
											color: '#33cc00',
											image: {
												url: null
											},

											description: 'votre pub est en cours de traitement, nous vous informerons quand elle sera publiée',
											footer: {
												text: ([(new Date().getDate()), ', ', (new Date().getHours()), ':', (new Date().getMinutes())].join(''))
											},
											thumbnail: {
												url: null
											}

										}
									});
								} else {
									s4dmessage.channel.send({
										embed: {
											title: 'opération anulée',
											color: '#ff0000',
											image: {
												url: null
											},

											description: 'cette réponse ne correspond pas à la question',
											footer: {
												text: ([(new Date().getDate()), ', ', (new Date().getHours()), ':', (new Date().getMinutes())].join(''))
											},
											thumbnail: {
												url: null
											}

										}
									});
								}

								s4d.reply = null;
							}).catch(async (e) => {
								console.error(e);
								s4dmessage.channel.send({
									embed: {
										title: 'opération anulée',
										color: '#ff0000',
										image: {
											url: null
										},

										description: 'le délai d\'attente est écoulé',
										footer: {
											text: ([(new Date().getDate()), ', ', (new Date().getHours()), ':', (new Date().getMinutes())].join(''))
										},
										thumbnail: {
											url: null
										}

									}
								});
							});
						}
					}

					s4d.reply = null;
				}).catch(async (e) => {
					console.error(e);
					s4dmessage.channel.send({
						embed: {
							title: 'opération anulée',
							color: '#ff0000',
							image: {
								url: null
							},

							description: 'le délai d\'attente est dépassé',
							footer: {
								text: ([(new Date().getDate()), ', ', (new Date().getHours()), ':', (new Date().getMinutes())].join(''))
							},
							thumbnail: {
								url: null
							}

						}
					});
				});
				s4d.reply = null;
			}).catch(async (e) => {
				console.error(e);
				s4dmessage.channel.send({
					embed: {
						title: 'opération anulée',
						color: '#ff0000',
						image: {
							url: null
						},

						description: 'le délai d\'attente est dépassé',
						footer: {
							text: ([(new Date().getDate()), ', ', (new Date().getHours()), ':', (new Date().getMinutes())].join(''))
						},
						thumbnail: {
							url: null
						}

					}
				});
			});
		}

	});


	return s4d;
})();