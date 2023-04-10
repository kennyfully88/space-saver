'use strict';

import { images } from '../Loaders/Loader.js';
import { gameLogic } from '../GameLogic/GameLogic.js';

export class Heart {
	constructor(config) {
		this.image = images['PowerUpHeart_16x16'];
		this.dx = config?.dx;
		this.dy = config?.dy;
		this.dw = 16;
		this.dh = 16;
		this.animation = config?.animtion || 'default';

		this.timer = 600;

		this.frameCounter = 0;
		this.frameCounterMax = 60;

		this.animations = {
			default: {
				fps: 2,
				frames: {
					0: { sx: 0, sy: 0, sw: 16, sh: 16 },
					1: { sx: 16, sy: 0, sw: 16, sh: 16 },
				},
			},
		};
	}

	render(options) {
		const currentFrame = Math.floor(
			this.frameCounter /
				(this.frameCounterMax / this.animations[this.animation].fps),
		);

		options.ctx.drawImage(
			this.image,
			this.animations[this.animation].frames[currentFrame].sx,
			this.animations[this.animation].frames[currentFrame].sy,
			this.animations[this.animation].frames[currentFrame].sw,
			this.animations[this.animation].frames[currentFrame].sh,
			this.dx,
			this.dy,
			this.dw,
			this.dh,
		);
	}

	update(options) {
		if (this.frameCounter >= this.frameCounterMax - 1) {
			this.frameCounter = 0;
		} else {
			this.frameCounter++;
		}

		if (this.timer <= 0) {
			this.destroy({ items: options.items });
		} else {
			this.timer--;
		}
	}

	action(options) {
		if (gameLogic.hp >= gameLogic.hpMax) {
			gameLogic.hp = gameLogic.hpMax;
		} else {
			gameLogic.hp += Math.ceil(Math.random() * 10);
		}

		this.destroy({ items: options.items });
	}

	destroy(options) {
		options.items.splice(options.items.indexOf(this), 1);
	}
}
