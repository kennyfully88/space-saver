'use strict';

import { images } from '../Loaders/Loader.js';
import { gameLogic } from '../GameLogic/GameLogic.js';

export default class ScoreLabel {
	constructor() {
		this.image = images['SpriteFont_8x16'];
	}

	render(ctx) {
		const pointsToString = gameLogic.points.toString();

		for (let i = 0; i < pointsToString.length; i++) {
			ctx.drawImage(
				this.image,
				8 * Number(pointsToString[i]),
				0,
				8,
				16,
				96 + 8 * Number(i),
				0,
				8,
				16,
			);
		}
	}

	update() {}
}
