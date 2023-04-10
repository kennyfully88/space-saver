'use strict';

import { sceneManager } from '../sceneManager/sceneManager.js';
import TitleScene from '../Scenes/TitleScene.js';

export const images = {};

export const loadGame = async (imageNames) => {
	await Promise.all(
		imageNames.map(
			(name) =>
				new Promise((resolve) => {
					const newImage = new Image();
					newImage.onload = () => resolve((images[name] = newImage));
					newImage.src = `assets/images/${name}.png`;
				}),
		),
	);

	// start game
	sceneManager.addScene('TitleScene', new TitleScene());
	sceneManager.renderScene();
};
