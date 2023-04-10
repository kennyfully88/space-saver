'use strict';

import Scene from './Scene.js';
import Background from '../Backgrounds/Background.js';
import { ctx } from '../GameBox/GameBox.js';
import { images } from '../Loaders/Loader.js';
import { StartButton, SettingsButton } from '../Buttons/TitleButtons.js';

export default class TitleScene extends Scene {
	constructor() {
		super();
		this.name = 'TitleScene';
		this.background = new Background({
			image: images['TitleSceneBG_160x144'],
		});
		this.startButton = new StartButton({ dx: 12, dy: 81 });
		this.settingsButton = new SettingsButton({ dx: 12, dy: 108 });
	}

	render() {
		// checker();
		this.background.render(ctx);
		this.startButton.render(ctx);
		this.settingsButton.render(ctx);
	}

	update() {
		// console.log('okay');
		this.startButton.update();
		this.settingsButton.update();
	}
}
