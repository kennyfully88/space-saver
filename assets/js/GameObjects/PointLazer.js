'use strict';

import { PlayerBullet } from './PlayerBullet.js';
import { images } from '../Loaders/Loader.js';
import { pointerHover, pointerClick } from '../Pointer/Pointer.js';

export class PointLazer {
	constructor(config) {
		this.image = images['PointLazer_8x8'];
		this.dx = config?.dx || 0;
		this.dy = config?.dy || 0;
		this.dw = 8;
		this.dh = 8;
		this.animation = config?.animtion || 'default';

		this.timer = 1800;
		this.timerMax = 3600;

		this.animations = {
			default: {
				fps: 1,
				frames: {
					0: { sx: 0, sy: 0, sw: 8, sh: 8 },
				},
			},
		};

		// Bullets
		this.bullets = [];
	}

	render(options) {
		this.bullets.forEach((bullet) => {
			bullet.render({ ctx: options.ctx });
		});

		options.ctx.drawImage(
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

		options.ctx.drawImage(
			this.image,
			this.animations[this.animation].frames[0].sx,
			this.animations[this.animation].frames[0].sy,
			this.animations[this.animation].frames[0].sw,
			this.animations[this.animation].frames[0].sh,
			8,
			16,
			this.dw,
			this.dh,
		);

		options.ctx.fillStyle = 'lightgreen';
		options.ctx.fillRect(
			16,
			18,
			Math.floor((this.timer / this.timerMax) * 64),
			4,
		);
	}

	update(options) {
		// monsters, hearts, powerUps
		this.bullets.forEach((bullet) => {
			bullet.update(this.bullets);
			this.collisions(bullet, options.monsters, options.hearts);
		});

		this.dx = Math.floor(pointerHover.x - 4);
		this.dy = Math.floor(pointerHover.y - 8);

		if (this.timer <= 0) {
			options.bullets.push(...this.bullets);
			options.powerUps.pointLazer = null;
		} else {
			this.timer--;
			// Logic to see if bullet needs to spawn
			if (pointerClick.clicked) {
				if (this.bullets.length < 4) {
					this.bullets.push(
						new PlayerBullet({
							colorSet: 1,
							dx: Math.floor(this.dx),
							dy: Math.floor(this.dy),
						}),
					);
				}
			}
		}
	}

	collisions(checker, objects, hearts) {
		for (let i = 0; i < objects.length; i++) {
			if (
				checker.dx < objects[i].dx + objects[i].dw &&
				checker.dx + checker.dw > objects[i].dx &&
				checker.dy < objects[i].dy + objects[i].dh &&
				checker.dy + checker.dh > objects[i].dy
			) {
				if (objects[i].collisions) {
					if (checker instanceof PlayerBullet) {
						objects[i].action(objects, hearts);
						this.bullets.splice(this.bullets.indexOf(checker), 1);
					}
				}
			}
		}
	}
}
