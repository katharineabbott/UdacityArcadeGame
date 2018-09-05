// Sets selectors and event listeners to handle the end of
// game popup and restart button.
function gameWon() {
    let $popup = document.querySelector('.winner');
    $popup.classList.remove('hide');
    player.resetPlayer();
    let $playAgain = document.querySelector('.play-again');
    $playAgain.addEventListener('click', function() {
        $popup.classList.add('hide');
        allEnemies.forEach((enemy) => {
            let max = getXCoordinateInPixels(-5);
            let min = getXCoordinateInPixels(-1);
            enemy.x = Math.floor(Math.random() * (max - min)) + min;
        });
    });
}

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

    // This detects if the Enemy has crossed the screen and
    // if not multiplies the movement by tge dt parameter.
    if (this.x > getXCoordinateInPixels(5)) {
        this.x = getXCoordinateInPixels(-5);
    } else {
        this.x = this.x + this.speed * dt;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Multiply x and y coordinates to convert row/column
// numbers into pixels. Multipliers found in line 137
// of engine.js

function getXCoordinateInPixels(x) {
    return x * 101;
}

function getYCoordinateInPixels(y) {
    return y * 83;
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-boy.png';
    };

    // Reset the player back to the starting position.
    resetPlayer() {
        this.x = getXCoordinateInPixels(2);
        this.y = getYCoordinateInPixels(4.6);
    };

    // Takes the points in the player/enemy images where the
    // sprite exists for more accurate collision, detects
    // collisions, calls resetPlayer function on collision,
    // and checks for the game being won (reaching water).
    update() {
        allEnemies.forEach((enemy) => {
            let playerTopContactPixel = 110;
            let playerBottomContactPixel = 135;
            let playerLeftContactPixel = 17;
            let playerRightContactPixel = 80;
            let enemyTopContactPixel = 77;
            let enemyBottomContactPixel = 143;
            let enemyLeftContactPixel = 1;
            let enemyRightContactPixel = 99;
            let playerXStart = this.x + playerLeftContactPixel;
            let playerXEnd = this.x + playerRightContactPixel;
            let enemyXStart = enemy.x + enemyLeftContactPixel;
            let enemyXEnd = enemy.x + enemyRightContactPixel;
            let playerYStart = this.y + playerTopContactPixel;
            let playerYEnd = this.y + playerBottomContactPixel;
            let enemyYStart = enemy.y + enemyTopContactPixel;
            let enemyYEnd = enemy.y + enemyBottomContactPixel;
            if ((playerXStart >= enemyXStart) && (playerXStart <= enemyXEnd) && (playerYStart >= enemyYStart) && (playerYStart <= enemyYEnd)) {
                this.resetPlayer();
            } else if ((playerXEnd >= enemyXStart) && (playerXEnd <= enemyXEnd) && (playerYStart >= enemyYStart) && (playerYStart <= enemyYEnd)) {
                this.resetPlayer();
            } else if ((playerYStart >= enemyYStart) && (playerYStart <= enemyYEnd) && (playerXStart >= enemyXStart) && (playerXStart <= enemyXEnd)) {
                this.resetPlayer();
            } else if ((playerYEnd >= enemyYStart) && (playerYEnd <= enemyYEnd) && (playerXStart >= enemyXStart) && (playerXStart <= enemyXEnd)) {
                this.resetPlayer();
            };
          });

        if (this.y <= 0) {
            gameWon();
        };
    };

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // Increments player position by 1 row/column when the
    // corresponding key is pressed.
    handleInput(pressedKey) {
        if ((pressedKey === 'left') && (this.x > 0)) {
            this.x = this.x - getXCoordinateInPixels(1);
        } else if ((pressedKey === 'up') && (this.y > 0)) {
            this.y = this.y - getYCoordinateInPixels(1);
        } else if ((pressedKey === 'right') && (this.x < 400)) {
            this.x = this.x + getXCoordinateInPixels(1);
        } else if ((pressedKey === 'down') && (this.y < 350)) {
            this.y = this.y + getYCoordinateInPixels(1);
        };
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [
    new Enemy(getXCoordinateInPixels(-1),getYCoordinateInPixels(.7),20),
    new Enemy(getXCoordinateInPixels(-1),getYCoordinateInPixels(.7),120),
    new Enemy(getXCoordinateInPixels(-24),getYCoordinateInPixels(.7),380),
    new Enemy(getXCoordinateInPixels(-19),getYCoordinateInPixels(1.7),420),
    new Enemy(getXCoordinateInPixels(-1),getYCoordinateInPixels(1.7),340),
    new Enemy(getXCoordinateInPixels(-2),getYCoordinateInPixels(2.7),200),
    new Enemy(getXCoordinateInPixels(-1),getYCoordinateInPixels(2.7),380)
];

// Place the player object in a variable called player
let player = new Player(getXCoordinateInPixels(2), getYCoordinateInPixels(4.6));

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