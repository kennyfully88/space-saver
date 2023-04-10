'use strict';

import { gameBox, ctx } from '../GameBox/GameBox.js';
import { sceneManager } from '../sceneManager/sceneManager.js';

export const pointerHover = { name: 'hover', x: 0, y: 0 };
export const pointerClick = { name: 'click', x: 0, y: 0, clicked: false };

export const updatePointer = (e, pointerType) => {
	const rect = gameBox.getBoundingClientRect();

	pointerType.x = Math.floor(
		(((e.clientX - rect.left) / (ctx.canvas.clientWidth * 0.01)) *
			ctx.canvas.width) /
			100,
	);

	pointerType.y = Math.floor(
		(((e.clientY - rect.top) / (ctx.canvas.clientHeight * 0.01)) *
			ctx.canvas.height) /
			100,
	);

	// Logic to make sure bullets arent made before game starts
	if (
		pointerType.name === 'click' &&
		sceneManager.currentScene === 'GameScene'
	) {
		pointerClick.clicked = true;
	} else {
		pointerClick.clicked = false;
	}
};

gameBox.addEventListener('click', (e) => {
	updatePointer(e, pointerClick);
});

gameBox.addEventListener('mousemove', (e) => {
	updatePointer(e, pointerHover);
});
