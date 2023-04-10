'use strict';

import { images } from '../Loaders/Loader.js';
import { PointLazer } from './PointLazer.js';

export class PowerUpPointLazer {
	constructor(config) {
		this.image = images['PointLazer_8x8'];
		this.dx = config?.dx || 0;
		this.dy = config?.dy || 0;
		this.dw = 8;
		this.dh = 8;
		this.animation = config?.animtion || 'default';

		this.timer = 600;

		this.frameCounter = 0;
		this.frameCounterMax = 60;

		this.animations = {
			default: {
				fps: 1,
				frames: {
					0: { sx: 0, sy: 0, sw: 8, sh: 8 },
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
		// items
		if (this.frameCounter >= this.frameCounterMax - 1) {
			this.frameCounter = 0;
		} else {
			this.frameCounter++;
		}

		if (this.timer <= 0) {
			this.destroy({ objects: options.items });
		} else {
			this.timer--;
		}
	}

	action(options) {
		// objects, powerUps

		if (!options.powerUps.pointLazer) {
			options.powerUps.pointLazer = new PointLazer();
		}

		this.destroy({ objects: options.objects });
	}

	destroy(options) {
		options.objects.splice(options.objects.indexOf(this), 1);
	}
}
