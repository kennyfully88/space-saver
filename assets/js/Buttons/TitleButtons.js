'use strict';

import { gameBox } from '../GameBox/GameBox.js';
import { images } from '../Loaders/Loader.js';
import { pointerHover, pointerClick } from '../Pointer/Pointer.js';
import { sceneManager } from '../sceneManager/sceneManager.js';
import GameScene from '../Scenes/GameScene.js';
import SettingsScene from '../Scenes/SettingsScene.js';

export class StartButton {
	constructor(config) {
		this.image = config?.image || images['TitleSceneButtons'];
		this.dx = config?.dx || 0;
		this.dy = config?.dy || 0;
		this.dw = config?.dw || 69;
		this.dh = config?.dh || 18;
		this.animation = config?.animtion || 'start';
		this.clicked = false;

		this.animations = {
			start: {
				fps: 1,
				frames: {
					0: { sx: 0, sy: 0, sw: 69, sh: 18 },
				},
			},
			startActive: {
				fps: 1,
				frames: {
					0: { sx: 69, sy: 0, sw: 69, sh: 18 },
				},
			},
		};
	}

	render(ctx) {
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
	}

	update() {
		if (
			pointerHover.x >= this.dx &&
			pointerHover.x <= this.dx + this.dw &&
			pointerHover.y >= this.dy &&
			pointerHover.y <= this.dy + this.dh
		) {
			this.animation = 'startActive';
			gameBox.style.cursor = 'pointer';
		} else {
			this.animation = 'start';
			gameBox.style.cursor = 'auto';
		}

		if (
			pointerClick.x >= this.dx &&
			pointerClick.x <= this.dx + this.dw &&
			pointerClick.y >= this.dy &&
			pointerClick.y <= this.dy + this.dh
		) {
			gameBox.style.cursor = 'auto';
			pointerClick.x = 0;
			pointerClick.y = 0;
			sceneManager.addScene('GameScene', new GameScene());
			sceneManager.currentScene = 'GameScene';
		}
	}
}

export class SettingsButton {
	constructor(config) {
		this.image = config?.image || images['TitleSceneButtons'];
		this.dx = config?.dx || 0;
		this.dy = config?.dy || 0;
		this.dw = config?.dw || 69;
		this.dh = config?.dh || 18;
		this.animation = config?.animtion || 'settings';

		this.animations = {
			settings: {
				fps: 1,
				frames: {
					0: { sx: 0, sy: 18, sw: 69, sh: 18 },
				},
			},
			settingsActive: {
				fps: 1,
				frames: {
					0: { sx: 69, sy: 18, sw: 69, sh: 18 },
				},
			},
		};
	}

	render(ctx) {
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
	}

	update() {
		if (gameBox.style.cursor === 'pointer') return;

		if (
			pointerHover.x >= this.dx &&
			pointerHover.x <= this.dx + this.dw &&
			pointerHover.y >= this.dy &&
			pointerHover.y <= this.dy + this.dh
		) {
			this.animation = 'settingsActive';
			gameBox.style.cursor = 'pointer';
		} else {
			this.animation = 'settings';
			gameBox.style.cursor = 'auto';
		}

		if (
			pointerClick.x >= this.dx &&
			pointerClick.x <= this.dx + this.dw &&
			pointerClick.y >= this.dy &&
			pointerClick.y <= this.dy + this.dh
		) {
			pointerClick.x = 0;
			pointerClick.y = 0;
			sceneManager.addScene('SettingsScene', new SettingsScene());
			sceneManager.currentScene = 'SettingsScene';
		}
	}
}

export class BackButton {
	constructor(config) {
		this.image = config?.image || images['TitleSceneButtons'];
		this.dx = config?.dx || 0;
		this.dy = config?.dy || 0;
		this.dw = config?.dw || 69;
		this.dh = config?.dh || 18;
		this.animation = config?.animtion || 'settings';

		this.animations = {
			settings: {
				fps: 1,
				frames: {
					0: { sx: 0, sy: 36, sw: 69, sh: 18 },
				},
			},
			settingsActive: {
				fps: 1,
				frames: {
					0: { sx: 69, sy: 36, sw: 69, sh: 18 },
				},
			},
		};
	}

	render(ctx) {
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
	}

	update() {
		if (
			pointerHover.x >= this.dx &&
			pointerHover.x <= this.dx + this.dw &&
			pointerHover.y >= this.dy &&
			pointerHover.y <= this.dy + this.dh
		) {
			this.animation = 'settingsActive';
			gameBox.style.cursor = 'pointer';
		} else {
			this.animation = 'settings';
			gameBox.style.cursor = 'auto';
		}

		if (
			pointerClick.x >= this.dx &&
			pointerClick.x <= this.dx + this.dw &&
			pointerClick.y >= this.dy &&
			pointerClick.y <= this.dy + this.dh
		) {
			pointerClick.x = 0;
			pointerClick.y = 0;
			sceneManager.currentScene = 'TitleScene';
		}
	}
}
