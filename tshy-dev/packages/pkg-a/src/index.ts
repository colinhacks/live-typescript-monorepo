export class Fish {
	constructor(public name: string) {}

	swim() {
		console.log(`${this.name} is swimming`);
	}

	speak() {
		console.log(`${this.name} is speaking`);
	}
}
