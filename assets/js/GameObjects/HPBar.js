'use strict';

import { images } from '../Loaders/Loader.js';
import { gameLogic } from '../GameLogic/GameLogic.js';

export default class HPBar {
	constructor() {
		this.hpLabel = images['HPLabel_16x16'];
		this.prevHP = 100;
		this.hpLabelChunks = [];
	}

	render(ctx) {
		ctx.drawImage(this.hpLabel, 0, 0);
		ctx.fillStyle = 'white';
		ctx.fillRect(16, 2, Math.floor((gameLogic.hp / gameLogic.hpMax) * 64), 12);

		this.hpLabelChunks.forEach((chunk) => {
			chunk.render(ctx);
		});
	}

	update() {
		if (gameLogic.hp < this.prevHP) {
			this.hpLabelChunks.push(
				new hpChunk({
					dx:
						Math.floor((gameLogic.hp / gameLogic.hpMax) * 64) +
						Math.floor((25 / 100) * 64),
				}),
			);
		}

		this.prevHP = gameLogic.hp;

		this.hpLabelChunks.forEach((chunk) => {
			chunk.update(this.hpLabelChunks);
		});
	}
}

class hpChunk {
	constructor(config) {
		this.dx = config.dx;
		this.dy = 2;
		this.dw = Math.floor((10 / 100) * 64);
		this.dh = 12;
		this.counter = 60;
		this.counterMax = 60;
	}

	render(ctx) {
		ctx.fillStyle = `rgba(255,${(this.counter / this.counterMax) * 255},${
			(this.counter / this.counterMax) * 255
		},${this.counter / this.counterMax})`;
		ctx.fillRect(this.dx, this.dy, this.dw, this.dh);
	}

	update(chunks) {
		if (this.counter <= 0) {
			chunks.splice(chunks.indexOf(this), 1);
		} else {
			this.counter--;
			this.dy++;
		}
	}
}
