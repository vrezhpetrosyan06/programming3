class FireMan extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.multiply = 0;
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.energy >= 45) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;
            var newGrassE = new FireMan(newX, newY, 5);
            predatorArr.push(newGrassE);
            this.energy = 10;
        }
    }
    move() {
        var food = random(this.chooseCell(0))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 5
            this.x = newX
            this.y = newY
            this.energy++
        }
    }
    eat() {
        var food = random(this.chooseCell(4))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 5
            this.x = newX
            this.y = newY
            for (var i in fireArr) {
                if (fireArr[i].x == newX && fireArr[i].y == newY) {
                    fireArr.splice(i, 1)
                    break;
                }
            }
            this.energy -= 5
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in firemanArr) {
                if (firemanArr[i].x == this.x && firemanArr[i].y == this.y) {
                    firemanArr.splice(i, 1)
                    break;
                }
            }
        }
    }
}
