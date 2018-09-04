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
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';

    }

    resetPlayer() {
        this.x = 202;
        this.y = 380;
    }
    
    update() {
        allEnemies.forEach((enemy) => {
            let playerXStart = this.x + 20;
            let playerXEnd = this.x + 80;
            let enemyXStart = enemy.x + 1;
            let enemyXEnd = enemy.x + 99;
            let playerYStart = this.y + 110;
            let playerYEnd = this.y + 135;
            let enemyYStart = enemy.y + 77;
            let enemyYEnd = enemy.y + 143;
            if ((playerXStart >= enemyXStart) && (playerXStart <= enemyXEnd) && (playerYStart >= enemyYStart) && (playerYStart <= enemyYEnd)) {
                this.x = 202;
                this.y = 380;
            } else if ((playerXEnd >= enemyXStart) && (playerXEnd <= enemyXEnd) && (playerYStart >= enemyYStart) && (playerYStart <= enemyYEnd)) {
                this.x = 202;
                this.y = 380;
            } else if ((playerYStart >= enemyYStart) && (playerYStart <= enemyYEnd) && (playerXStart >= enemyXStart) && (playerXStart <= enemyXEnd)) {
                this.x = 202;
                this.y = 380;
            } else if ((playerYEnd >= enemyYStart) && (playerYEnd <= enemyYEnd) && (playerXStart >= enemyXStart) && (playerXStart <= enemyXEnd)) {
                this.x = 202;
                this.y = 380;
            }
          });

        if (this.y <= 0) {
            resetPlayer();
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(pressedKey) {
        if ((pressedKey === 'left') && (this.x > 0)) {
            this.x = this.x - 101;
        } else if ((pressedKey === 'up') && (this.y > 0)) {
            this.y = this.y - 80;
        } else if ((pressedKey === 'right') && (this.x < 400)) {
            this.x = this.x + 101;
        } else if ((pressedKey === 'down') && (this.y < 350)) {
            this.y = this.y + 80;
        }
    }
    
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [
    new Enemy(-100,60,40),
    new Enemy(-150,145,80),
    new Enemy(-150,230,80) 
]

// Place the player object in a variable called player

let player = new Player(202, 380);


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
