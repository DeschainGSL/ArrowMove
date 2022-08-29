function randomInteger(min, max) {
    // получить случайное число от (min-0.5) до (max+0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

class Field {
    counter = 0;
    static link = document.getElementById("field");
    size;
    playerId;
    playerX;
    playerY;
    matrix = [];
    constructor(val) {
        for (let i = 0; i < val; i++) this.matrix[i] = [];
        for (let i = 0; i < val; i++) {
            for (let j = 0; j < val; j++) {
                this.matrix[i][j] = 0;
            }
        }
        this.size = val;
    }
    spawnSquare(x, y) {
        let newSquare = document.createElement("div");
        newSquare.innerHTML = "";
        newSquare.id = this.counter;
        newSquare.className = "square";
        document.body.children[0].append(newSquare);
        this.matrix[x][y] = new Square(this.counter, x, y);
        this.counter++;
    }
    spawnPlayer(x, y) {
        let newSquare = document.createElement("div");
        newSquare.innerHTML = "";
        newSquare.id = "player";
        newSquare.className = "square";
        document.body.children[0].append(newSquare);
        this.matrix[x][y] = new Square("player", x, y);
        this.playerId = "player";
        this.playerX = x;
        this.playerY = y;
        this.counter++;
    }
    deleteSquare(x, y) {
        if ((this.matrix[x][y]) instanceof Square) {
            let squareForDelete = this.matrix[x][y].link;
            squareForDelete.remove();
            this.matrix[x][y] = 0;
        }
    }
    placeSquare(x, y, newX, newY) {
        if ((this.matrix[x][y]) instanceof Square) {
            this.matrix[newX][newY] = this.matrix[x][y];
            this.matrix[x][y] = 0;
        }
    }
    moveSquare(x, y, direction) {
        if ((this.matrix[x][y]) instanceof Square) {
            switch (direction) {
                case ("right"):
                    if ((this.matrix[x + 1][y]) instanceof Square) this.moveSquare(x + 1, y, "right");
                    if (this.matrix[x + 1][y] == 0) {
                        if ((x == this.playerX) && (y == this.playerY))
                            this.playerX = x + 1;
                        this.matrix[x][y].posX = x + 1;
                        this.matrix[x + 1][y] = this.matrix[x][y];
                        this.matrix[x][y] = 0;
                    }
                    break;
                case ("left"):
                    if ((this.matrix[x - 1][y]) instanceof Square) this.moveSquare(x - 1, y, "left");
                    if (this.matrix[x - 1][y] == 0) {
                        if ((x == this.playerX) && (y == this.playerY))
                            this.playerX = x - 1;
                        this.matrix[x][y].posX = x - 1;
                        this.matrix[x - 1][y] = this.matrix[x][y];
                        this.matrix[x][y] = 0;
                    }
                    break;
                case ("up"):
                    if((this.matrix[x][y - 1]) instanceof Square) this.moveSquare(x, y - 1, "up");
                    if (this.matrix[x][y - 1] == 0) {
                        if ((x == this.playerX) && (y == this.playerY))
                            this.playerY = y - 1;
                        this.matrix[x][y].posY = y - 1;
                        this.matrix[x][y - 1] = this.matrix[x][y];
                        this.matrix[x][y] = 0;
                    }
                    break;
                case ("down"):
                    if((this.matrix[x][y + 1]) instanceof Square) this.moveSquare(x, y + 1, "down");
                    if (this.matrix[x][y + 1] == 0) {
                        if ((x == this.playerX) && (y == this.playerY))
                            this.playerY = y + 1;
                        this.matrix[x][y].posY = y + 1;
                        this.matrix[x][y + 1] = this.matrix[x][y];
                        this.matrix[x][y] = 0;
                    }
                    break
                case (" "):
                    this.placeSquare(x, y, 0, 0);
                    break
                default:
                    break;
            }
        }
    }
    renderField() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if ((this.matrix[i][j]) instanceof Square) {
                    this.matrix[i][j].link.style.left = this.matrix[i][j].posX * 100 / this.size + "%";
                    this.matrix[i][j].link.style.top = this.matrix[i][j].posY * 100 / this.size + "%";
                    this.matrix[i][j].link.style.width = 100 / this.size + "%";
                    this.matrix[i][j].link.style.height = 100 / this.size + "%";
                }
            }
        }
    }
}
class Square {
    id;
    posX;
    posY;
    link;
    constructor(ID, x, y) {
        this.id = ID;
        this.posX = x;
        this.posY = y;
        this.link = document.getElementById(`${ID}`);
    }
}

let f1 = new Field(10);
f1.spawnPlayer(randomInteger(0, f1.size-1), randomInteger(0, f1.size-1));
f1.renderField();

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case ("ArrowRight"):
            f1.moveSquare(f1.playerX, f1.playerY, "right");
            break;
        case ("ArrowLeft"):
            f1.moveSquare(f1.playerX, f1.playerY, "left");
            break;
        case ("ArrowUp"):
            f1.moveSquare(f1.playerX, f1.playerY, "up");
            break;
        case ("ArrowDown"):
            f1.moveSquare(f1.playerX, f1.playerY, "down");
            break
        case (" "):
            f1.placeSquare(f1.playerX, f1.playerY, 0, 0);
            break
        case ("n"):
            f1.spawnSquare(randomInteger(0, f1.size), randomInteger(0, f1.size));
            break
        default:
            break;
    }
    f1.renderField();
    console.log(f1.matrix);
});