const gameboard = (function () {
    let board = [['', '', ''], ['', '', ''], ['', '', '']];
    const getBoard = () => {
        return board;
    }
    const writeOnBoard = (x, y) => {
        if (board[x][y] === '') {
            board[x][y] = gameflow.getActivePlayer().getMarker();
            return true;
        }

        else {
            displayController.updMsgDisplay('Space already taken! Choose another one');
            return false;
        }
    }
    return { getBoard, writeOnBoard };
})();

const gameflow = (function () {
    let player1;
    let player2;
    let playerTurn = 1;
    let gameOverMsg;
    const setPlayersNames = (xname, oname) => {
        player1 = createPlayer(xname, 'x');
        player2 = createPlayer(oname, 'o');
    }
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
                displayController.updMsgDisplay(gameOverMsg);
            }
            else {
                changeActivePlayer();
                displayController.updMsgDisplay('turn');
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

    return { selectSpace, getActivePlayer, changeActivePlayer, checkGameOver, setPlayersNames };
})();

const displayController = (function () {

    let displayBoard;
    let msgDisplay;
    let resetButton;
    let gameContainer;

    const playerXName = document.querySelector('#playerx');
    const playerOName = document.querySelector('#playero');

    const startContainer = document.querySelector('.start-container');
    const mainContainer = document.querySelector('.main-container');

    const removeStartScreen = () => {
        if (playerXName.value && playerOName.value) {
            gameflow.setPlayersNames(playerXName.value, playerOName.value);
            mainContainer.removeChild(startContainer);
            return true;
        }
        return false;
    }

    const resetScreen = () => {
        mainContainer.removeChild(gameContainer);
        mainContainer.appendChild(startContainer);
        document
    }

    const createBoard = () => {
        gameContainer = document.createElement('div');
        gameContainer.setAttribute('class', 'game-container');
        msgDisplay = document.createElement('span');
        msgDisplay.setAttribute('class', 'messages');
        resetButton = document.createElement('button');
        resetButton.setAttribute('class', 'reset');
        resetButton.innerHTML = 'Reset';
        resetButton.addEventListener('click', resetScreen);
        const board = document.createElement('div');
        board.setAttribute('class', 'board');
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                let space = document.createElement('div');
                space.setAttribute('class', 'space');
                space.setAttribute('spcx', x);
                space.setAttribute('spcy', y);
                space.addEventListener('click', function () {
                    gameflow.selectSpace(space.getAttribute('spcx'), space.getAttribute('spcy'));
                });
                board.appendChild(space);
            }
        }
        gameContainer.appendChild(msgDisplay);
        gameContainer.appendChild(board);
        gameContainer.appendChild(resetButton);
        mainContainer.appendChild(gameContainer);
        displayBoard = document.querySelectorAll('.space');
        updMsgDisplay('turn');
    }

    const updMsgDisplay = (arg) => {
        if (arg === 'turn') {
            msgDisplay.innerHTML = `${gameflow.getActivePlayer().name}, it's your turn!`;
        }
        else { msgDisplay.innerHTML = arg; }
    }

    const updDisplayBoard = () => {
        displayBoard.forEach(space => {
            space.textContent = gameboard.getBoard()[space.getAttribute('spcx')][space.getAttribute('spcy')];
        });
    }

    const startButton = document.querySelector('.start');
    startButton.addEventListener('click', () => {
        if (removeStartScreen()) {
            createBoard();
        }
    });

    return { updDisplayBoard, createBoard, updMsgDisplay };
})();



function createPlayer(name, marker) {
    const getMarker = () => {
        return marker;
    }
    return { name, getMarker };
}


