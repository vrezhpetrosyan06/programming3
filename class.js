class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
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
        this.multiply++;
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 1;

            var newGrass = new Grass(newX, newY, 1);
            grassArr.push(newGrass);
            this.multiply = 0;
        }
    }


}
class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
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
        if (newCell && this.energy >= 13) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;
            var newGrassE = new GrassEater(newX, newY, 2);
            grassEaterArr.push(newGrassE);
            this.energy = 8;
        }
    }
    move() {
        var food = random(this.chooseCell(0))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 2
            this.x = newX
            this.y = newY
            this.energy--
        }
    }
    eat() {
        var food = random(this.chooseCell(1))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 2
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1)
                    break;
                }
            }
            this.energy += 2
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1)
                    break;
                }
            }
        }
    }
}

class Predator {
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
        if (newCell && this.energy >= 13) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 3;
            var newGrassE = new Predator(newX, newY, 3);
            predatorArr.push(newGrassE);
            this.energy = 15;
        }
    }
    move() {
        var food = random(this.chooseCell(0))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 3
            this.x = newX
            this.y = newY
        }
        this.energy--
    }
    eat() {
        var food = random(this.chooseCell(2))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 3
            this.x = newX
            this.y = newY
            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1)
                    break;
                }
            }
            this.energy += 5
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in predatorArr) {
                if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                    predatorArr.splice(i, 1)
                    break;
                }
            }
        }
    }
}

class Fire {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 5;
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
    chooseCell(char1, char2, char3) {
        this.getNewCoordinates()
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char1 || matrix[y][x] == char2 || matrix[y][x] == char3) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        if (newCell && this.energy >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
            var newGrassE = new Fire(newX, newY, 2);
            fireArr.push(newGrassE);
            this.energy = 5;
        }
    }
    move() {
        var food = random(this.chooseCell(0))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 4
            this.x = newX
            this.y = newY
            this.energy--
        }
    }
    eat() {
        var food = random(this.chooseCell(1, 2, 3))
        if (food) {
            matrix[this.y][this.x] = 0
            var newX = food[0]
            var newY = food[1]

            if (matrix[newY][newX] == 1) {
                for (var i in grassArr) {
                    if (grassArr[i].x == newX && grassArr[i].y == newY) {
                        grassArr.splice(i, 1)
                        break;
                    }
                }
            }
            else if (matrix[newY][newX] == 2) {
                for (var i in grassEaterArr) {
                    if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                        grassEaterArr.splice(i, 1)
                        break;
                    }
                }
            }
            else if (matrix[newY][newX] == 3) {
                for (var i in predatorArr) {
                    if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
                        predatorArr.splice(i, 1)
                        break;
                    }
                }
            }
            matrix[newY][newX] = 4
            this.x = newX
            this.y = newY
            this.energy += 2
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in fireArr) {
                if (fireArr[i].x == this.x && fireArr[i].y == this.y) {
                    fireArr.splice(i, 1)
                    break;
                }
            }
        }
    }
}
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
