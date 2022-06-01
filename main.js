const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.locationX = 0;
    this.locationY = 0;

    this.field[0][0] = pathCharacter;
  }

  print() {
    this.field.forEach(element => {
        console.log(element.join(''));
    });
  }


  
  playGame() {
      let run = true
      console.log('INSTRUCTIONS > u: up/d: down/l: left/ r: right \n Try find your hat!');
      do {
      this.print();
      this.askQuestion();

      if (!this.inBounds()) {
        console.log('Out of bounds, you lose!');
        run = false;
        break;
    } else if (this.ishole()) {
        console.log('You fell down a hole.');
        run = false;
        break;
      } else if (this.isHat()) {
        console.log('You found your hat!');
        run = false;
        break;
    }

      this.field[this.locationY][this.locationX] = pathCharacter;
    
      } while (run)

  }

  askQuestion() {
      let res = prompt('What direction would you like to move? ');

      switch (res) {
          case 'u':
            this.locationY -=1;
            break;

        case 'd':
            this.locationY += 1;
            break;
        
        case 'r': 
            this.locationX +=1;
            break;

        case 'l':
            this.locationX -= 1;
            break;

        default: 
            console.log('Please enter u/d/l/r.');
            break;
      }

  }

  ishole() {
     return this.field[this.locationY][this.locationX] === hole;
  }

  isHat() {
     return this.field[this.locationY][this.locationX] === hat;
  }

  inBounds() {
      return (
          this.locationX >= 0 &&
          this.locationY >= 0 &&
          this.locationY < this.field.length &&
          this.locationX < this.field[0].length
      )
  }

  static generateField(height, width) {
      let chars = [fieldCharacter, fieldCharacter, hole];
      // makes 2d array
     const field = new Array(height).fill(0).map(ele => new Array(width));
     //loops through first array
     for (let y=0; y < height; y++) {
         //populates sub array on each loop
         for (let x = 0; x < width; x++) {
             field[y][x] = chars[Math.floor(Math.random() * chars.length)];
         }
     }

     const hatPlace = {
        x: Math.floor(Math.random() *  width),
        y: Math.floor(Math.random() * height)
     } 
    //make sure hat does not start at top left
     while (hatPlace.x === 0 && hatPlace.y === 0) {
         hatPlace.x = Math.floor(Math.random() *  width)
         hatPlace.y = Math.floor(Math.random() *  height)
     }

     field[hatPlace.y][hatPlace.x] = hat;
     return field;

  }

    
  
}


const myField = new Field(Field.generateField(6, 6));

myField.playGame();

