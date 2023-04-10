'use strict';

export default class Background {
	constructor(config) {
		this.image = config?.image || null;
		this.scrollY = config?.scrollY || false;
		this.scrollYCount = 0;
		this.scrollYMax = 144;
	}

	render(ctx) {
		if (this.scrollY) {
			if (this.scrollYCount >= this.scrollYMax) {
				ctx.drawImage(
					this.image,
					0,
					144 - Math.floor(this.scrollYCount),
					160,
					144,
					0,
					0,
					160,
					144,
				);
				this.scrollYCount = 0;
			} else {
				ctx.drawImage(
					this.image,
					0,
					144 - Math.floor(this.scrollYCount),
					160,
					144,
					0,
					0,
					160,
					144,
				);
				this.scrollYCount += 0.25;
			}
		} else {
			ctx.drawImage(this.image, 0, 0);
		}
	}
}
