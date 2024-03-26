const gameboard = (function () {
    let board = [['', '', ''], ['', '', ''], ['', '', '']];
    const getBoard = () => {
        return board;
    }
    const writeOnBoard = (x, y) => {
        if (board[x][y] === '') {
            board[x][y] = gameflow.getActivePlayer().getMarker();
            console.log(getBoard());
            return true;
        }

        else {
            console.log('Space already taken! Choose another one');
            return false;
        }
    }
    return { getBoard, writeOnBoard };
})();

const gameflow = (function () {
    let playerTurn = 1;
    let gameOverMsg;
    const getActivePlayer = () => {
        if (playerTurn === 1) {
            return player1;
        }
        else {
            return player2;
        }
    }
    const changeActivePlayer = () => {
        if (playerTurn === 1) {
            return playerTurn = 2;
        }
        else {
            return playerTurn = 1;
        }
    }
    const selectSpace = (x, y) => {
        if (gameboard.writeOnBoard(x, y)) {
            displayController.updDisplayBoard();
            checkGameOver();
            if (gameOverMsg) {
                console.log(gameOverMsg);
            }
            else {
                changeActivePlayer();
            }
        }
    }
    const checkGameOver = () => {

        let board = gameboard.getBoard();
        let row = col = diag = ['', '', ''];
        let checkArr;
        let checkFull = ['', '', ''];

        function goCheck(arr, x) {
            for (let i = 0; i < 3; i++) {
                if (arr[i].every((val) => val === arr[i][0]) && arr[i][0] != '') {
                    return true;
                }
                else if (arr[i].every((val) => val != '')) {
                    checkFull[x] = 'full';
                }
                else {
                    checkFull[x] = '';
                }
            }
        }

        for (let x = 0; x < 3; x++) {
            if (x < 2) {
                diag = [board[2 * x][0], board[1][1], board[2 - (2 * x)][2]];
            }
            col = [board[0][x], board[1][x], board[2][x]];
            for (let y = 0; y < 3; y++) {
                row[y] = board[x][y];
            }
            checkArr = [row, col, diag];
            if (goCheck(checkArr, x)) {
                gameOverMsg = `Game Over! ${getActivePlayer().name} wins!`;
            }
            else if (checkFull.every((val) => val === 'full')) {
                gameOverMsg = "Game Over! It's a tie!";
            }
        }
    }

    return { selectSpace, getActivePlayer, changeActivePlayer, checkGameOver };
})();

const displayController = (function () {
    const displayBoard = document.querySelectorAll('.space');

    const addClickEventListener = (function () {
        displayBoard.forEach((space) => space.addEventListener('click', function () {
            gameflow.selectSpace(space.getAttribute('spcx'), space.getAttribute('spcy'));
        }));
    })();


    const updDisplayBoard = () => {
        displayBoard.forEach(space => {
            space.textContent = gameboard.getBoard()[space.getAttribute('spcx')][space.getAttribute('spcy')];
        });
    }

    return { updDisplayBoard };
})();

function createPlayer(name, marker) {
    const getMarker = () => {
        return marker;
    }
    return { name, getMarker };
}

const player1 = createPlayer('Jimothy', 'x');
const player2 = createPlayer('Aroldo', 'o');


displayController.updDisplayBoard();
console.log(gameboard.getBoard());
console.log([player1.name, player1.getMarker()], [player2.name, player2.getMarker()]);
console.log(`It is ${gameflow.getActivePlayer().name}'s turn!`);