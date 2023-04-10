'use strict';

export default class Scene {
	constructor(config) {
		this._rng = String(Math.floor(Math.random() * 100)).padEnd(3, '0');
		this._id = `scene_${new Date().getTime()}${this._rng}`;
		this.name = config?.name || this._id;
	}
}
