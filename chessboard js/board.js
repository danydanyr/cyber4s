
//global varibales declerations
let selectedCell;
let pieces = [];
const WHITE_PLAYER = 'white';
const BLACK_PLAYER = 'black';
const WHITE_STARTING_ROW = 0;
const BLACK_STARTING_ROW = 7;
const htmlTable = document.createElement('table');
const TABLE_SIZE = 8;
//code to access a cell in the table
//selectedCell.cellIndex
//selectedCell.parentNode.rowIndex


//functions declarations

function newChess() {
    
    document.body.appendChild(htmlTable);
    for(let i = 0; i < 8; i++){
        const row = htmlTable.insertRow();
        for(let j = 0; j < 8; j++){
            const cell =row.insertCell();
            if((i + j) % 2 == 0) 
                cell.className = 'white-cell';
            else
                cell.className = 'black-cell';
            
                cell.addEventListener('click', onCellClick);
        }
    }
    createInitialBoard();
    // for (let piece of pieces) {
    //     addImage(table1.rows[piece.row].cells[piece.col], piece.player, piece.type);
    // }
    for(i = 0; i < 8; i++){
        for(j = 0; j < 8; j++){
            if(pieces[i][j] == undefined) continue;
            addImage(htmlTable.rows[i].cells[j], pieces[i][j].player, pieces[i][j].type);
        }
    }
}

function knightPaintPossibleMovement(row, col, color){
    //all knight possible moves in this 2 arrays
    let xArray = [ 2, 1, -1, -2, -2, -1, 1, 2 ];
    let yArray = [ 1, 2, 2, 1, -1, -2, -2, -1 ];
    let x, y;
    for(let i = 0; i < xArray.length; i++){
        x = row + xArray[i];
        y = col + yArray[i];
        if(isPointInBounds(x, y)){
            if(pieces[x][y] && pieces[x][y].player !== color) {
                paintPossibleEnemyMove(x,y);
                continue;
            } 
            else if(pieces[x][y] && pieces[x][y].player === color) continue;
            //else if cell is empty
        paintPossibleMove(x,y);
        }
    }
}
function bishopPaintPossibleMovement(row, col, color){
    //all bishop possible movies in this 2 arrays
    let xArray = [ 1, -1, 1, -1];
    let yArray = [ 1, -1, -1, 1];
    let x, y;
    for(let i = 0; i < xArray.length; i++){
        x = row + xArray[i];
        y = col + yArray[i];
        for(let j = 0; j < TABLE_SIZE; j++){
            if (!isPointInBounds(x, y)) break;  
            if(pieces[x][y] && pieces[x][y].player !== color) {
                paintPossibleEnemyMove(x,y);
                break;
            } 
            else if(pieces[x][y] && pieces[x][y].player === color) break;  
            //else if the cell is empty
            paintPossibleMove(x,y);
            x += xArray[i];
            y += yArray[i];
        }
    }
}

function rookPaintPossibleMovement(row, col, color){
    //all rook possible moves in this 2 arrays
    let xArray = [ 1, -1, 0, 0];
    let yArray = [ 0, 0, -1, 1];
    let x, y;
    for(let i = 0; i < xArray.length; i++){
        x = row + xArray[i];
        y = col + yArray[i];
        for(let j = 0; j < TABLE_SIZE; j++){
            if (!isPointInBounds(x, y)) break;   
            if(pieces[x][y] && pieces[x][y].player !== color) {
                paintPossibleEnemyMove(x,y);
                break;
            } 
            else if(pieces[x][y] && pieces[x][y].player === color) break;
            //else if the cell is empty
            paintPossibleMove(x,y);
            x += xArray[i];
            y += yArray[i];
        }
    }
}

function kingPaintPossibleMovement(row, col, color){
    //all king possible moves in this 2 arrays
    let xArray = [ 1, -1, 0, 0, 1, -1, 1, -1];
    let yArray = [ 0, 0, -1, 1, 1, -1, -1, 1];
    for(let i = 0; i < xArray.length; i++){
        x = row + xArray[i];
        y = col + yArray[i];
        if(isPointInBounds(x, y)){
            if(pieces[x][y] && pieces[x][y].player !== color) {
                paintPossibleEnemyMove(x,y);
                continue;
            } 
            else if(pieces[x][y] && pieces[x][y].player === color) continue;
            //else if cell is empty
        }
        paintPossibleMove(x,y);
    }
}



function queenPaintPossibleMovement(row, col, color){
    //queen combines the movement of the rook and the bishop :o
    rookPaintPossibleMovement(row, col, color);
    bishopPaintPossibleMovement(row, col, color);
}

function pawnPaintPossibleMovement(row, col, color){
    if(color === WHITE_PLAYER){
        if(pieces[row + 1][col + 1] && pieces[row + 1][col + 1].player !== color ){
            paintPossibleEnemyMove(row + 1,col + 1);
        }
        if(pieces[row + 1][col - 1] && pieces[row + 1][col - 1].player !== color ){
            paintPossibleEnemyMove(row + 1,col - 1);
        }
        if(pieces[row + 1][col] === undefined )
        paintPossibleMove(row + 1, col);
    }
    //else if the pawn is black
    else{
        if(pieces[row - 1][col - 1] && pieces[row - 1][col - 1].player !== color ){
            paintPossibleEnemyMove(row - 1,col - 1);
        }
        if(pieces[row - 1][col + 1] && pieces[row - 1][col + 1].player !== color ){
            paintPossibleEnemyMove(row - 1,col + 1);
        }
        if(pieces[row - 1][col] === undefined )
        paintPossibleMove(row - 1, col);
    }
}

function isPointInBounds(x, y){
    return (x >= 0 && y >= 0 && x < TABLE_SIZE && y < TABLE_SIZE);
}

function addImage(cell, player, name) {
    const image = document.createElement('img');
    image.src = 'images/' + player + '_' + name + '.png';
    cell.appendChild(image);
}

class Piece {
    constructor(type, player) {
      this.type = type;
      this.player = player;
    }
}

function createInitialBoard() {
    //initialising the pieces matrix
    for(let i = 0; i < TABLE_SIZE; i++){
        pieces[i] = [];
    }

    addPieces(WHITE_PLAYER);

    //filling the empty cells with undefines.
    for(let i = 2; i < TABLE_SIZE-2; i++){
        for(let j = 0; j < TABLE_SIZE; j++){
            pieces[i][j] = undefined;
        }
    }
    addPieces(BLACK_PLAYER);
    for(let i = 0; i < 8; i++ ){
        pieces[1][i] = new Piece("pawn", WHITE_PLAYER);
        pieces[6][i] = new Piece("pawn", BLACK_PLAYER);
    }
}

function addPieces(color){
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


function onCellClick(e) {
    
    for (let i = 0; i < TABLE_SIZE; i++) {
        for (let j = 0; j < TABLE_SIZE; j++) {
          htmlTable.rows[i].cells[j].classList.remove('possibleMove');
          htmlTable.rows[i].cells[j].classList.remove('possibleEat');
        }
    }

    if(e.currentTarget.classList.contains("selected") == true){
        e.currentTarget.classList.remove('selected');
        selectedCell = undefined;
    }
    else{
        if(selectedCell != undefined){ //unselecting old cell
            selectedCell.classList.remove('selected'); 
        }

        e.currentTarget.classList.add('selected');
        selectedCell = e.currentTarget;
    }
    if(selectedCell !== undefined){
    
    let currentPiece = pieces[selectedCell.parentNode.rowIndex][selectedCell.cellIndex];
    if(currentPiece === undefined){
        return;
    }
    else if(currentPiece.type === 'rook'){
        rookPaintPossibleMovement(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, currentPiece.player);
    }
    else if(currentPiece.type === 'pawn'){
        pawnPaintPossibleMovement(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, currentPiece.player);
    }
    else if(currentPiece.type === 'knight'){
        knightPaintPossibleMovement(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, currentPiece.player);
    }
    else if(currentPiece.type === 'bishop'){
        bishopPaintPossibleMovement(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, currentPiece.player);
    }
    else if(currentPiece.type === 'king'){
        kingPaintPossibleMovement(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, currentPiece.player);
    }
    else if(currentPiece.type === 'queen'){
        queenPaintPossibleMovement(selectedCell.parentNode.rowIndex, selectedCell.cellIndex, currentPiece.player);
    }   
}

}
function paintPossibleMove(row, col){
    htmlTable.rows[row].cells[col].classList.add('possibleMove');
}
function paintPossibleEnemyMove(row, col){
    htmlTable.rows[row].cells[col].classList.add('possibleEat');
}
function unpaintPossibleMove(cell){
    cell.currentTarget.classList.remove('selected');
}

window.addEventListener('load', newChess);