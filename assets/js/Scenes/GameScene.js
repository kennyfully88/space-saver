'use strict';

import Scene from './Scene.js';
import Background from '../Backgrounds/Background.js';
import { ctx } from '../GameBox/GameBox.js';
import { images } from '../Loaders/Loader.js';
import HPBar from '../GameObjects/HPBar.js';
import ScoreLabel from '../GameObjects/ScoreLabel.js';
import { Player } from '../GameObjects/Player.js';
import { Monster001 } from '../GameObjects/Monster001.js';

export default class TitleScene extends Scene {
	constructor() {
		super();

		this.name = 'GameScene';

		this.background = new Background({
			image: images['GameSceneBG_160x288'],
			scrollY: true,
		});

		// Layers
		this.items = [];

		this.monsters = [];

		this.player = new Player();

		// HUD
		this.hud = [new HPBar(), new ScoreLabel()];

		this.monsterSpawnTimer = 60;
		this.gameTime = 0;
	}

	render() {
		this.background.render(ctx);

		this.items.forEach((item) => {
			item.render({ ctx: ctx });
		});

		this.monsters.forEach((monster) => {
			monster.render(ctx);
		});

		this.player.render(ctx);

		this.hud.forEach((object) => {
			object.render(ctx);
		});
	}

	update() {
		if (this.monsterSpawnTimer <= 0 && this.monsters.length < 10) {
			this.monsters.push(new Monster001());
			if (this.gameTime > 12000) this.monsters.push(new Monster001());
			if (this.gameTime > 24000) this.monsters.push(new Monster001());
			if (this.gameTime > 36000) this.monsters.push(new Monster001());
			if (this.gameTime > 48000) this.monsters.push(new Monster001());
			this.monsterSpawnTimer = Math.floor(Math.random() * 240);
		} else {
			this.monsterSpawnTimer--;
		}

		this.gameTime++;

		this.items.forEach((item) => {
			item.update({ items: this.items });
		});

		this.monsters.forEach((monster) => {
			monster.update({ monsters: this.monsters, items: this.items });
		});

		this.player.update({ monsters: this.monsters, items: this.items });

		this.hud.forEach((object) => {
			object.update();
		});
	}
}
