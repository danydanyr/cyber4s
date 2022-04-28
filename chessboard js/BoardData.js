class BoardData {
    constructor() {
        this.lastEatenPiece = undefined;
        this.currentTurn = WHITE_PLAYER;
    }
    createInitialBoard() {
        //initialising the pieces matrix
        for (let i = 0; i < TABLE_SIZE; i++) {
            pieces[i] = [];
        }
    }
    initChessGame() {
        document.body.appendChild(htmlTable);
        for (let i = 0; i < 8; i++) {
            const row = htmlTable.insertRow();
            for (let j = 0; j < 8; j++) {
                const cell = row.insertCell();
                if ((i + j) % 2 == 0)
                    cell.className = 'white-cell';
                else
                    cell.className = 'black-cell';

                cell.addEventListener('click', onCellClick);
            }
        }
        createInitialBoard();
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (pieces[i][j] === undefined) continue;
                addPieceImg(htmlTable.rows[i].cells[j], pieces[i][j].player, pieces[i][j].type);
            }
        }
    }
}

function createInitialBoard() {
    //initialising the pieces matrix
    for (let i = 0; i < TABLE_SIZE; i++) {
        pieces[i] = [];
    }

    addPieces(WHITE_PLAYER);

    //filling the empty cells with undefines.
    for (let i = 2; i < TABLE_SIZE - 2; i++) {
        for (let j = 0; j < TABLE_SIZE; j++) {
            pieces[i][j] = undefined;
        }
    }
    addPieces(BLACK_PLAYER);
    for (let i = 0; i < 8; i++) {
        pieces[6][i] = new Piece("pawn", WHITE_PLAYER);
        pieces[1][i] = new Piece("pawn", BLACK_PLAYER);
    }
}
function addPieces(color) {
    let row = color == WHITE_PLAYER ? WHITE_STARTING_ROW : BLACK_STARTING_ROW;
    pieces[row][0] = new Piece("rook", color);
    pieces[row][1] = new Piece("knight", color);
    pieces[row][2] = new Piece("bishop", color);
    pieces[row][3] = new Piece("king", color);
    pieces[row][4] = new Piece("queen", color);
    pieces[row][5] = new Piece("bishop", color);
    pieces[row][6] = new Piece("knight", color);
    pieces[row][7] = new Piece("rook", color);
}