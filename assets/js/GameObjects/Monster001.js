'use strict';

import { images } from '../Loaders/Loader.js';
import { gameLogic } from '../GameLogic/GameLogic.js';
import { Heart } from './Heart.js';
import { PowerUpPointLazer } from './PowerUpPointLazer.js';

export class Monster001 {
	constructor(config) {
		this.image = images['Monster001_16x16'];
		this.dx = Math.floor(Math.random() * 144);
		this.dy = -16;
		this.dw = 16;
		this.dh = 16;

		this.negRng = Math.floor(Math.random() * 2);

		this.dxBase = this.dx;
		this.dxSine = 0;
		this.dxSineValue = Math.floor(Math.random() * (this.negRng = 1 ? 16 : -16));
		this.dyBase = this.dy;
		this.dySine = 0;
		this.dySineValue = Math.floor(Math.random() * 32);

		this.red = Math.floor(Math.random() * 200);
		this.green = 127 + Math.floor(Math.random() * 127);
		this.blue = Math.floor(Math.random() * 200);

		this.eyecolor = {
			r: Math.floor(Math.random() * 100),
			g: Math.floor(Math.random() * 100),
			b: Math.floor(Math.random() * 100),
		};

		this.animation = config?.animtion || 'default';

		this.frameCounter = 0;
		this.frameCounterMax = 60;

		this.collisions = true;
		this.destroyTimer = 30;
		this.destroyTimerMax = 30;

		this.animations = {
			default: {
				fps: 2,
				frames: {
					0: { sx: 0, sy: 0, sw: 16, sh: 16 },
					1: { sx: 16, sy: 0, sw: 16, sh: 16 },
				},
			},
			destroyed: {
				fps: 1,
				frames: {
					0: { sx: 32, sy: 0, sw: 16, sh: 16 },
				},
			},
		};
	}

	render(ctx) {
		const currentFrame = Math.floor(
			this.frameCounter /
				(this.frameCounterMax / this.animations[this.animation].fps),
		);

		if (this.animation === 'destroyed') {
			ctx.globalAlpha = this.destroyTimer / this.destroyTimerMax;
		}

		ctx.drawImage(
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

		if (this.animation != 'destroyed') {
			this.getImageData(ctx);
		}

		ctx.globalAlpha = 1;
	}

	update(options) {
		const time = this.frameCounter / this.frameCounterMax;

		const sineDx = Math.floor(
			Math.sin(time * Math.PI) * this.dxSineValue - this.dxSineValue * 0.5,
		);

		const sineDy = Math.floor(
			Math.sin(time * Math.PI) * this.dySineValue - this.dySineValue * 0.5,
		);

		if (!this.collisions) {
			if (this.destroyTimer > 0) {
				this.destroyTimer--;
			} else {
				const rng = Math.floor(Math.random() * 10);

				if (rng === 3) {
					options.items.push(new Heart({ dx: this.dx, dy: this.dy }));
				}

				if (rng === 9) {
					options.items.push(
						new PowerUpPointLazer({ dx: this.dx, dy: this.dy }),
					);
				}

				this.destroy({ monsters: options.monsters });
			}
			return;
		}

		if (this.frameCounter >= this.frameCounterMax - 1) {
			this.frameCounter = 0;
		} else {
			this.frameCounter++;
		}

		this.dxSine = sineDx;
		this.dx = this.dxBase + this.dxSine;

		this.dySine = sineDy;
		this.dy = this.dyBase + this.dySine;
		this.dyBase++;

		if (this.dy >= 160) {
			this.destroy({ monsters: options.monsters });
		}
	}

	action(options) {
		// monsters hearts
		if (this.collisions) {
			this.hearts = options.hearts;

			gameLogic.points += Math.floor(Math.random() * 100);

			if (gameLogic.points > gameLogic.pointsMax) {
				gameLogic.points = gameLogic.pointsMax;
			}

			this.animation = 'destroyed';
			this.collisions = false;
			this.frameCounter = 0;
		}
	}

	destroy(options) {
		options.monsters.splice(options.monsters.indexOf(this), 1);
	}

	getImageData(ctx) {
		const imageData = ctx.getImageData(this.dx, this.dy, this.dw, this.dh);
		const data = imageData.data;

		for (let i = 0; i < data.length; i += 4) {
			let red = data[i];
			let green = data[i + 1];
			let blue = data[i + 2];
			let alpha = data[i + 3];

			const colorString = `${red},${green},${blue},${alpha}`;

			if (colorString === '0,0,0,255') {
				data[i] = this.eyecolor.r;
				data[i + 1] = this.eyecolor.g;
				data[i + 2] = this.eyecolor.b;
				data[i + 3] = 254;
			}

			if (colorString === '203,243,130,255') {
				data[i] = this.red;
				data[i + 1] = this.green;
				data[i + 2] = this.blue;
				data[i + 3] = 255;
			}
		}

		ctx.putImageData(imageData, this.dx, this.dy);
	}
}
