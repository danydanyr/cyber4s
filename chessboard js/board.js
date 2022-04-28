//global varibales declerations
let selectedCell;
let pieces = [];
let currentPiece;
let button;
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';
const WHITE_STARTING_ROW = 7;
const BLACK_STARTING_ROW = 0;
const htmlTable = document.createElement('table');
const TABLE_SIZE = 8;
const knightXArray = [2, 1, -1, -2, -2, -1, 1, 2]; //all knight possible moves in this 2 arrays
const knightYArray = [1, 2, 2, 1, -1, -2, -2, -1];
const bishopXArray = [1, -1, 1, -1];                //all bishop possible movies in this 2 arrays
const bishopYArray = [1, -1, -1, 1];
const rookXArray = [1, -1, 0, 0];                   //all rook possible moves in this 2 arrays
const rookYArray = [0, 0, -1, 1];
const kingXArray = [1, -1, 0, 0, 1, -1, 1, -1];     //all king possible moves in this 2 arrays
const kingYArray = [0, 0, -1, 1, 1, -1, -1, 1];


function onCellClick(e) {
    if (selectedCell === undefined && pieces[e.currentTarget.parentNode.rowIndex][e.currentTarget.cellIndex] !== undefined && game.currentTurn === pieces[e.currentTarget.parentNode.rowIndex][e.currentTarget.cellIndex].player) {
        e.currentTarget.classList.add('selected');
        selectedCell = e.currentTarget;
        currentPiece = pieces[selectedCell.parentNode.rowIndex][selectedCell.cellIndex];

        if (currentPiece.type === 'rook') {
            rookPaintPossibleMovement(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, currentPiece.player);
        }
        else if (currentPiece.type === 'pawn') {
            pawnPaintPossibleMovement(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, currentPiece.player);
        }
        else if (currentPiece.type === 'knight') {
            knightPaintPossibleMovement(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, currentPiece.player);
        }
        else if (currentPiece.type === 'bishop') {
            bishopPaintPossibleMovement(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, currentPiece.player);
        }
        else if (currentPiece.type === 'king') {
            kingPaintPossibleMovement(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, currentPiece.player);
        }
        else if (currentPiece.type === 'queen') {
            queenPaintPossibleMovement(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, currentPiece.player);
        }
    }
    else if (e.currentTarget.classList.contains('possibleMove')) {
        let row = selectedCell.parentNode.rowIndex; //selectedCell contains the cell of the piece from the previous click
        let col = selectedCell.cellIndex;
        pieces[row][col] = undefined;
        deletePieceImg(htmlTable.rows[row].cells[col]);
        selectedCell = e.currentTarget; //now selectedCell contains the clicked on cell
        row = selectedCell.parentNode.rowIndex;
        col = selectedCell.cellIndex
        pieces[row][col] = currentPiece;
        addPieceImg(htmlTable.rows[row].cells[col], pieces[row][col].player, pieces[row][col].type);
        unpaintAllCells();
        if(pieces[row][col].type === 'pawn' && pieces[row][col].firstMove){ // removes ability to move 2 tiles for pawns after first move
            pieces[row][col].firstMove = false;
        }
        selectedCell = undefined;
        passTheTurn();
    }
    else if (e.currentTarget.classList.contains('possibleEat')) {
        let row = selectedCell.parentNode.rowIndex; //selectedCell contains the cell of the piece from the previous click
        let col = selectedCell.cellIndex;
        pieces[row][col] = undefined;
        deletePieceImg(htmlTable.rows[row].cells[col]);
        selectedCell = e.currentTarget; //now selectedCell contains the clicked on cell
        row = selectedCell.parentNode.rowIndex;
        col = selectedCell.cellIndex;
        game.lastEatenPiece = pieces[row][col].type; //saves the last eaten piece
        pieces[row][col] = currentPiece;
        deletePieceImg(htmlTable.rows[row].cells[col]);
        addPieceImg(htmlTable.rows[row].cells[col], pieces[row][col].player, pieces[row][col].type);
        unpaintAllCells();
        didIWin(); //checks if the king was eaten;
        if(pieces[row][col].type === 'pawn' && pieces[row][col].firstMove){ // removes ability to move 2 tiles for pawns after first move
            pieces[row][col].firstMove = false;
        }
        selectedCell = undefined;
        passTheTurn();
    }
    //this is for unselecting a piece. don't really know if i should keep this feature in the game ¯\_(ツ)_/¯
    else if (e.currentTarget.classList.contains("selected")) {
        e.currentTarget.classList.remove('selected');
        unpaintAllCells();
        selectedCell = undefined;
    }
    //when clicking on a piece while another one is already selected
    else if (selectedCell !== undefined && pieces[e.currentTarget.parentNode.rowIndex][e.currentTarget.cellIndex] !== undefined && game.currentTurn === pieces[e.currentTarget.parentNode.rowIndex][e.currentTarget.cellIndex].player) {
        unpaintAllCells();
        selectedCell = undefined;
        onCellClick(e);
        //is this recursion? i hope my pc won't explode...
    }
}

function unpaintAllCells() {
    for (let i = 0; i < TABLE_SIZE; i++) {
        for (let j = 0; j < TABLE_SIZE; j++) {
            htmlTable.rows[i].cells[j].classList.remove('selected');
            htmlTable.rows[i].cells[j].classList.remove('possibleMove');
            htmlTable.rows[i].cells[j].classList.remove('possibleEat');
        }
    }
}
function addPieceImg(cell, player, name) {
    const image = document.createElement('img');
    image.src = 'images/' + player + '_' + name + '.png';
    image.draggable = false;
    cell.appendChild(image);
}
function deletePieceImg(cell) {
    cell.innerHTML = "";
}
function passTheTurn() {
    game.currentTurn = game.currentTurn === BLACK_PLAYER ? WHITE_PLAYER : BLACK_PLAYER;
    document.body.style.backgroundColor = document.body.style.backgroundColor === 'black' ? 'white' : 'black';
}
function didIWin(){
    if(game.lastEatenPiece === 'king'){
        const winnerPopup = document.createElement('div');
        const winner = game.currentTurn.charAt(0).toUpperCase() + game.currentTurn.slice(1);
        winnerPopup.textContent = winner + ' is the bigger nerd!';
        winnerPopup.classList.add('winner-dialog');
        button = document.createElement("BUTTON");
        button.innerHTML = "Play Again?";
        button.classList.add('button');
        button.addEventListener("click", reloadgame);
        htmlTable.appendChild(winnerPopup);
        winnerPopup.appendChild(button);
        //to disable clicking on pieces
        for(let i=0; i< TABLE_SIZE; i++) {
              pieces[i] = undefined;
        }
    }
}
function reloadgame(){
    window.location.reload();
}
game = new BoardData()
window.addEventListener('load', game.initChessGame);