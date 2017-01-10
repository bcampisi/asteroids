var ship;
var asteroids = [];
var lasers = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    ship = new Ship();
    for (let i = 0; i < 5; i++) {
        asteroids.push(new Asteroid());
    }
}

function draw() {
    background(0);

    for (let i = 0; i < asteroids.length; i++) {
        asteroids[i].render();
        asteroids[i].update();
        asteroids[i].edges();
    }

    for (let i = lasers.length-1; i >= 0; i--) {
        lasers[i].render();
        lasers[i].update();
        for (let j = asteroids.length-1; j >= 0; j--) {
            if (lasers[i].hits(asteroids[j])) {
                // if the Asteroid radius is greater than 20 we will make two more and run breakup if not it will go away with splice
                if (asteroids[j].r > 20) {
                    let newAsteroids = asteroids[j].breakup();
                    asteroids = asteroids.concat(newAsteroids);
                }
                asteroids.splice(j, 1);
                lasers.splice(i, 1);
                // if there are less than 3 asteroids left add 5 more large ones to the screen
                if (asteroids.length < 3) {
                    for (let i = 0; i < 5; i++) {
                        asteroids.push(new Asteroid());
                    }
                }
                break;
            }
            
        }
    }

    ship.render();
    ship.turn();
    ship.update();
    ship.edges();  
}

function keyReleased() {
    ship.setRotation(0);
    ship.boosting(false);
}

function keyPressed() {
    if (key == ' ') {
        lasers.push(new Laser(ship.pos, ship.heading));
    } else if (keyCode == RIGHT_ARROW) {
        ship.setRotation(0.1);
    } else if (keyCode == LEFT_ARROW) {
        ship.setRotation(-0.1);
    } else if (keyCode == UP_ARROW) {
        ship.boosting(true);
    }
}