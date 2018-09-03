// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > 505) {
        this.x = -400
    } else {
    this.x = this.x + this.speed * dt;
}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.sprite = 'images/char-boy.png';

    }
    update() {
        let playerXEnd = this.x + 100;
        let enemyXEnd = allEnemies[0].x + 100;
        let playerYEnd = this.y + 170;
        let enemyYEnd = allEnemies[0].y + 170;
        if ((this.x >= allEnemies[0].x) && (this.x <= enemyXEnd) && (this.y >= allEnemies[0].y) && (this.y <= enemyYEnd)) {
            console.log("Collision");
        } 
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.row * 101, this.col * 76);
    }

    handleInput(pressedKey) {
        if ((pressedKey === 'left') && (this.row > 0)) {
            this.row = this.row - 1;
        } else if ((pressedKey === 'up') && (this.col > 0)) {
            this.col = this.col - 1;
        } else if ((pressedKey === 'right') && (this.row < 4)) {
            this.row = this.row + 1;
        } else if ((pressedKey === 'down') && (this.col < 5)) {
            this.col = this.col + 1;
        }
    }
    
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [
    new Enemy(-100,60,40),
    new Enemy(-150,120,80) 
]

// Place the player object in a variable called player

let player = new Player(2, 5);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
