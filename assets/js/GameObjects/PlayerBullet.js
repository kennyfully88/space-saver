'use strict';

import { images } from '../Loaders/Loader.js';

export class PlayerBullet {
	constructor(config) {
		this.image = images['PlayerBullet_8x8'];
		this.colorSet = config?.colorSet || 0;
		this.dx = config?.dx;
		this.dy = config?.dy;
		this.dw = 8;
		this.dh = 8;
		this.animation = config?.animation || 'default';

		this.frameCounter = 0;
		this.frameCounterMax = 60;

		this.animations = {
			default: {
				fps: 18,
				frames: {
					0: { sx: 0, sy: 0, sw: 8, sh: 8 },
					1: { sx: 8, sy: 0, sw: 8, sh: 8 },
					2: { sx: 16, sy: 0, sw: 8, sh: 8 },
					3: { sx: 0, sy: 0, sw: 8, sh: 8 },
					4: { sx: 8, sy: 0, sw: 8, sh: 8 },
					5: { sx: 16, sy: 0, sw: 8, sh: 8 },
					6: { sx: 0, sy: 0, sw: 8, sh: 8 },
					7: { sx: 8, sy: 0, sw: 8, sh: 8 },
					8: { sx: 16, sy: 0, sw: 8, sh: 8 },
					9: { sx: 0, sy: 0, sw: 8, sh: 8 },
					10: { sx: 8, sy: 0, sw: 8, sh: 8 },
					11: { sx: 16, sy: 0, sw: 8, sh: 8 },
					12: { sx: 0, sy: 0, sw: 8, sh: 8 },
					13: { sx: 8, sy: 0, sw: 8, sh: 8 },
					14: { sx: 16, sy: 0, sw: 8, sh: 8 },
					15: { sx: 0, sy: 0, sw: 8, sh: 8 },
					16: { sx: 8, sy: 0, sw: 8, sh: 8 },
					17: { sx: 16, sy: 0, sw: 8, sh: 8 },
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
			8 * this.colorSet,
			this.animations[this.animation].frames[currentFrame].sw,
			this.animations[this.animation].frames[currentFrame].sh,
			this.dx,
			this.dy,
			this.dw,
			this.dh,
		);
	}

	update(playerBullets) {
		if (this.frameCounter >= this.frameCounterMax - 1) {
			this.frameCounter = 0;
		} else {
			this.frameCounter++;
		}

		this.dy--;

		if (this.dy <= -8) {
			this.action(playerBullets);
		}
	}

	action(playerBullets) {
		playerBullets.splice(playerBullets.indexOf(this), 1);
	}
}
