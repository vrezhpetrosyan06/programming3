
class FireMan {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 10;
        this.index = index;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
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
