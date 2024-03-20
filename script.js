const gameboard = ( function () {
    let board = [['','',''],['','',''],['','','']];
    const getBoard = () => {
        return board;
    }

    const writeOnBoard = (x,y) => {
        board[x][y] = gameflow.activePlayer().getMarker();
        console.log(getBoard());
    }

    return {getBoard, writeOnBoard};

})();
    

function createPlayer (name, marker) {
    const getMarker = () => {
        return marker;
    }
    return {name, getMarker};
}

const gameflow = ( function () {

    let playerTurn = 1;

    const activePlayer = () => {
        if (playerTurn === 1) {
            playerTurn = 2;
            return player1;
        }
        else {
            playerTurn = 1;
            return player2;
        }
    }

    const selectSpace = (x,y) => {
        return gameboard.writeOnBoard(x,y);
    }

    return {selectSpace, activePlayer};

})();


const player1 = createPlayer('Jimothy', 'x');
const player2 = createPlayer('Aroldo', 'o');

console.log(gameboard.getBoard());
console.log([player1.name, player1.getMarker()], [player2.name, player2.getMarker()]);
