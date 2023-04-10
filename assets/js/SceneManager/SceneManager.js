'use strict';

import { ctx } from '../GameBox/GameBox.js';

export const sceneManager = {
	scenes: {},
	currentScene: 'TitleScene',

	addScene(sceneName, sceneObj) {
		this.scenes[sceneName] = sceneObj;
	},

	renderScene() {
		ctx.clearRect(0, 0, 160, 144);
		this.scenes[this.currentScene].render();
		this.updateScene();
	},

	updateScene() {
		this.scenes[this.currentScene].update();
		requestAnimationFrame(() => this.renderScene());
	},
};
