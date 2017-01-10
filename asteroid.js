function Asteroid(pos, r) {
    if (pos) {
        this.pos = pos.copy();
    } else {
        this.pos = createVector(random(width), random(height));
    }
    // make the asteroid smaller once its hit
    if (r) {
        this.r = r * 0.5;
    } else {
        this.r = random(15,50);
    }

    this.total = floor(random(5,14));
    this.vel = p5.Vector.random2D();
    this.offset = [];
    //make offset to use to make random asteroid shapes
    for (var i = 0; i < this.total; i++) {
        this.offset[i] = random(-this.r * 0.5, this.r);
    }

    this.update = function() {
        this.pos.add(this.vel);
    }

    this.render = function() {
        push();
        stroke(255);
        noFill();
        translate(this.pos.x, this.pos.y);
        // ellipse(0, 0, this.r * 2);
        // this create the jagged asteroid shape
        beginShape();
        for (let i = 0; i < this.total; i++) {
            let angle = map(i, 0, this.total, 0, TWO_PI); // polar cartisian angle formula
            let r = this.r + this.offset[i];
            let x = r * cos(angle);
            let y = r * sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);
        pop();
    }

    this.breakup = function() {
        let newA = [];
        newA[0] = new Asteroid(this.pos, this.r);
        newA[1] = new Asteroid(this.pos, this.r);
        return newA;
    }

    this.edges = function() {
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r;
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r) {
            this.pos.y = -this.r;
        } else if (this.pos.y < -this.r) {
            this.pos.y = height + this.r;
        }
    }
}