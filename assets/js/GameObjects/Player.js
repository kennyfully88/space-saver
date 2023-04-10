'use strict';

import { sceneManager } from '../sceneManager/sceneManager.js';
import { gameLogic } from '../GameLogic/GameLogic.js';
import { PlayerBullet } from './PlayerBullet.js';
import { Heart } from './Heart.js';
import { images } from '../Loaders/Loader.js';
import { pointerHover, pointerClick } from '../Pointer/Pointer.js';
import { PowerUpPointLazer } from './PowerUpPointLazer.js';
import GameOverScene from '../Scenes/GameOverScene.js';

export class Player {
	constructor(config) {
		this.image = images['Player_16x16'];
		this.dx = 88;
		this.dy = 128;
		this.dw = 16;
		this.dh = 16;
		this.animation = config?.animtion || 'default';

		this.invincibility = false;
		this.invincibilityTimer = 30;
		this.invincibilityTimerMax = 30;

		this.powerUps = {};

		this.animations = {
			default: {
				fps: 1,
				frames: {
					0: { sx: 16, sy: 0, sw: 16, sh: 16 },
				},
			},
			left: {
				fps: 1,
				frames: {
					0: { sx: 0, sy: 0, sw: 16, sh: 16 },
				},
			},
			right: {
				fps: 1,
				frames: {
					0: { sx: 32, sy: 0, sw: 16, sh: 16 },
				},
			},
			damageddefault: {
				fps: 1,
				frames: {
					0: { sx: 16, sy: 16, sw: 16, sh: 16 },
				},
			},
			damagedleft: {
				fps: 1,
				frames: {
					0: { sx: 0, sy: 16, sw: 16, sh: 16 },
				},
			},
			damagedright: {
				fps: 1,
				frames: {
					0: { sx: 32, sy: 16, sw: 16, sh: 16 },
				},
			},
		};

		// Bullets
		this.playerBullets = [];
	}

	render(ctx) {
		this.playerBullets.forEach((bullet) => {
			bullet.render({ ctx: ctx });
		});

		ctx.drawImage(
			this.image,
			this.animations[this.animation].frames[0].sx,
			this.animations[this.animation].frames[0].sy,
			this.animations[this.animation].frames[0].sw,
			this.animations[this.animation].frames[0].sh,
			this.dx,
			this.dy,
			this.dw,
			this.dh,
		);

		if (this.powerUps.pointLazer) {
			this.powerUps.pointLazer.render({ ctx: ctx });
		}
	}

	update(options) {
		if (this.invincibility) {
			if (this.invincibilityTimer > 0) {
				this.invincibilityTimer--;
			} else {
				this.invincibilityTimer = this.invincibilityTimerMax;
				this.invincibility = false;
			}
		}

		if (this.powerUps.pointLazer) {
			this.powerUps.pointLazer.update({
				monsters: options.monsters,
				hearts: options.hearts,
				powerUps: this.powerUps,
				bullets: this.playerBullets,
			});
		}

		this.playerBullets.forEach((bullet) => {
			bullet.update(this.playerBullets);

			this.collisions({
				checker: bullet,
				objects: options.monsters,
				hearts: options.hearts,
			});
		});

		// Logic to position the player to the pointer
		if (pointerHover.x - 8 < this.dx) {
			this.animation = `${this.invincibility ? 'damaged' : ''}left`;
			this.dx -= 2;

			if (pointerHover.x - 8 > this.dx) {
				this.animation = `${this.invincibility ? 'damaged' : ''}default`;
				this.dx -= pointerHover.x - 8 - this.dx;
			}
		} else if (pointerHover.x - 8 > this.dx) {
			this.animation = `${this.invincibility ? 'damaged' : ''}right`;
			this.dx += 2;

			if (pointerHover.x - 8 < this.dx) {
				this.animation = `${this.invincibility ? 'damaged' : ''}default`;
				this.dx += pointerHover.x - 8 - this.dx;
			}
		} else {
			this.animation = `${this.invincibility ? 'damaged' : ''}default`;
		}

		if (pointerHover.y - 16 < this.dy) {
			this.dy -= 2;

			if (pointerHover.y - 16 > this.dy) {
				this.dy -= pointerHover.y - 16 - this.dy;
			}
		} else if (pointerHover.y - 16 > this.dy) {
			this.dy += 2;

			if (pointerHover.y - 16 < this.dy) {
				this.dy += pointerHover.y - 16 - this.dy;
			}
		}

		this.collisions({ checker: this, objects: options.monsters });
		this.collisions({ checker: this, objects: options.items });

		// Logic to see if buller needs to spawn
		if (pointerClick.clicked) {
			pointerClick.clicked = false;

			if (this.playerBullets.length < 8) {
				this.playerBullets.push(
					new PlayerBullet({
						dx: Math.floor(this.dx + 4),
						dy: Math.floor(this.dy),
					}),
				);
			}
		}

		if (gameLogic.hp <= 0) {
			gameLogic.hp = gameLogic.hpMax;
			gameLogic.points = 0;
			sceneManager.addScene('GameOverScene', new GameOverScene());
			sceneManager.currentScene = 'GameOverScene';
		}
	}

	collisions(options) {
		// checker, objects, hearts
		for (let i = 0; i < options.objects.length; i++) {
			if (
				options.checker.dx < options.objects[i].dx + options.objects[i].dw &&
				options.checker.dx + options.checker.dw > options.objects[i].dx &&
				options.checker.dy < options.objects[i].dy + options.objects[i].dh &&
				options.checker.dy + options.checker.dh > options.objects[i].dy
			) {
				if (options.objects[i].collisions) {
					if (options.checker instanceof PlayerBullet) {
						options.objects[i].action(options.objects, options.items);
						this.playerBullets.splice(
							this.playerBullets.indexOf(options.checker),
							1,
						);
					}

					// Checker for Player
					if (options.checker instanceof Player) {
						if (
							gameLogic.hp > 0 &&
							options.objects[i].collisions &&
							!this.invincibility
						) {
							this.invincibility = true;
							gameLogic.hp -= 10;
						}
					}
				}

				if (options.objects[i] instanceof Heart) {
					options.objects[i].action({ items: options.objects });
				}

				if (options.objects[i] instanceof PowerUpPointLazer) {
					if (this.powerUps.pointLazer) {
						this.powerUps.pointLazer.timer += 900;
						if (
							this.powerUps.pointLazer.timer > this.powerUps.pointLazer.timerMax
						) {
							this.powerUps.pointLazer.timer =
								this.powerUps.pointLazer.timerMax;
						}
					}

					options.objects[i].action({
						objects: options.objects,
						powerUps: this.powerUps,
					});
				}
			}
		}
	}
}
