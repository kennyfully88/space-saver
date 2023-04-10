'use strict';

import Scene from './Scene.js';
import { ctx } from '../GameBox/GameBox.js';
import { pointerHover, pointerClick } from '../Pointer/Pointer.js';
import { sceneManager } from '../sceneManager/sceneManager.js';
import TitleScene from './TitleScene.js';

export default class GameOverScene extends Scene {
	constructor() {
		super();
		this.name = 'GameOverScene';

		this.frameCounter = 0;
		this.frameCounterMax = 120;

		this.button = {
			dx: 48,
			dy: 96,
			dw: 64,
			dh: 24,
			hover: false,
			clicked: false,
		};

		pointerClick.x = 0;
		pointerClick.y = 0;
	}

	render() {
		const time = this.frameCounter / this.frameCounterMax;

		const blueSine = Math.floor(Math.sin(time * Math.PI) * 64);

		ctx.fillStyle = `rgb(0,0,${blueSine})`;

		ctx.fillRect(0, 0, 160, 144);

		ctx.fillStyle = 'white';
		ctx.font = '24px Arial';
		ctx.fillText('Game Over', 16, 72);
		ctx.font = '14px Arial';
		ctx.fillText('Thanks for playing!', 20, 90);

		// Button

		if (this.button.hover) {
			ctx.fillStyle = 'yellow';
		}

		ctx.fillRect(
			this.button.dx,
			this.button.dy,
			this.button.dw,
			this.button.dh,
		);

		ctx.font = '12px Arial';

		ctx.fillStyle = 'black';

		ctx.fillText('Main Menu', this.button.dx + 2, this.button.dy + 16);
	}

	update() {
		if (this.frameCounter >= this.frameCounterMax - 1) {
			this.frameCounter = 0;
		} else {
			this.frameCounter++;
		}

		if (
			pointerHover.x >= this.button.dx &&
			pointerHover.x <= this.button.dx + this.button.dw &&
			pointerHover.y >= this.button.dy &&
			pointerHover.y <= this.button.dy + this.button.dh
		) {
			this.button.hover = true;
		} else {
			this.button.hover = false;
		}

		if (
			pointerClick.x >= this.button.dx &&
			pointerClick.x <= this.button.dx + this.button.dw &&
			pointerClick.y >= this.button.dy &&
			pointerClick.y <= this.button.dy + this.button.dh
		) {
			pointerClick.x = 0;
			pointerClick.y = 0;
			sceneManager.addScene('TitleScene', new TitleScene());
			sceneManager.currentScene = 'TitleScene';
		}
	}
}
