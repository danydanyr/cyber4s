//TODO add first move for pawn and king for double pawn move and hatzraha
class Piece {
    constructor(type, player) {
        this.type = type;
        this.player = player;
        //this.isFirstMove
    }
}
function knightPaintPossibleMovement(row, col, color) {
    //Possible Math.abs() solution (2x =y, 2y=x)
    let x, y;
    for (let i = 0; i < knightXArray.length; i++) {
        x = row + knightXArray[i];
        y = col + knightYArray[i];
        if (isPointInBounds(x, y)) {
            if (pieces[x][y] && pieces[x][y].player !== color) {
                paintPossibleEnemyMove(x, y);
                continue;
            }
            else if (pieces[x][y] && pieces[x][y].player === color) continue;
            //else if cell is empty
            paintPossibleMove(x, y);
        }
    }
}
function bishopPaintPossibleMovement(row, col, color) {
    let x, y;
    for (let i = 0; i < bishopXArray.length; i++) {
        x = row + bishopXArray[i];
        y = col + bishopYArray[i];
        for (let j = 0; j < TABLE_SIZE; j++) {
            if (!isPointInBounds(x, y)) break;
            if (pieces[x][y] && pieces[x][y].player !== color) {
                paintPossibleEnemyMove(x, y);
                break;
            }
            else if (pieces[x][y] && pieces[x][y].player === color) break;
            //else if the cell is empty
            paintPossibleMove(x, y);
            x += bishopXArray[i];
            y += bishopYArray[i];
        }
    }
}

function rookPaintPossibleMovement(row, col, color) {
    let x, y;
    for (let i = 0; i < rookXArray.length; i++) {
        x = row + rookXArray[i];
        y = col + rookYArray[i];
        for (let j = 0; j < TABLE_SIZE; j++) {
            if (!isPointInBounds(x, y)) break;
            if (pieces[x][y] && pieces[x][y].player !== color) {
                paintPossibleEnemyMove(x, y);
                break;
            }
            else if (pieces[x][y] && pieces[x][y].player === color) break;
            //else if the cell is empty
            paintPossibleMove(x, y);
            x += rookXArray[i];
            y += rookYArray[i];
        }
    }
}

function kingPaintPossibleMovement(row, col, color) {
    for (let i = 0; i < kingXArray.length; i++) {
        x = row + kingXArray[i];
        y = col + kingYArray[i];
        if (isPointInBounds(x, y)) {
            if (pieces[x][y] && pieces[x][y].player !== color) {
                paintPossibleEnemyMove(x, y);
                continue;
            }
            else if (pieces[x][y] && pieces[x][y].player === color) continue;
            //else if cell is empty
            paintPossibleMove(x, y);
        }

    }
}

function queenPaintPossibleMovement(row, col, color) {
    //queen combines the movement of the rook and the bishop :o
    rookPaintPossibleMovement(row, col, color);
    bishopPaintPossibleMovement(row, col, color);
}

function pawnPaintPossibleMovement(row, col, color) {
    if (color === WHITE_PLAYER) {
        if (pieces[row + 1][col + 1] && pieces[row + 1][col + 1].player !== color) {
            paintPossibleEnemyMove(row + 1, col + 1);
        }
        if (pieces[row + 1][col - 1] && pieces[row + 1][col - 1].player !== color) {
            paintPossibleEnemyMove(row + 1, col - 1);
        }
        if (pieces[row + 1][col] === undefined)
            paintPossibleMove(row + 1, col);
    }
    //else if the pawn is black
    else {
        if (pieces[row - 1][col - 1] && pieces[row - 1][col - 1].player !== color) {
            paintPossibleEnemyMove(row - 1, col - 1);
        }
        if (pieces[row - 1][col + 1] && pieces[row - 1][col + 1].player !== color) {
            paintPossibleEnemyMove(row - 1, col + 1);
        }
        if (pieces[row - 1][col] === undefined)
            paintPossibleMove(row - 1, col);
    }
}
function isPointInBounds(x, y) {
    return (x >= 0 && y >= 0 && x < TABLE_SIZE && y < TABLE_SIZE);
}
function paintPossibleMove(row, col) {
    htmlTable.rows[row].cells[col].classList.add('possibleMove');
}
function paintPossibleEnemyMove(row, col) {
    htmlTable.rows[row].cells[col].classList.add('possibleEat');
}