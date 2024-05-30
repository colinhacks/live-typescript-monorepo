
export class Fish{

  constructor(public name: string){}

  swim(){
    console.log(`${this.name} is swimming`);
  }

  // the error in pkg-b/index.ts won't go away until you build pkg-a
  speak(){
    console.log(`${this.name} is speaking`);
  }
}
