'use strict';

import Scene from './Scene.js';
import Background from '../Backgrounds/Background.js';
import { ctx } from '../GameBox/GameBox.js';
import { images } from '../Loaders/Loader.js';
import { BackButton } from '../Buttons/TitleButtons.js';

export default class SettingsScene extends Scene {
	constructor() {
		super();
		this.name = 'SettingsScene';
		this.background = new Background({
			image: images['SettingsSceneBG_160x144'],
		});
		this.backButton = new BackButton({ dx: 12, dy: 108 });
	}

	render() {
		this.background.render(ctx);
		this.backButton.render(ctx);
	}

	update() {
		this.backButton.update();
	}
}
