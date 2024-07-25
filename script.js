const defaultToken = '';
const BOARD_ROW = 3;
const BOARD_COLUMN = 3;

function Cell() {
    let token = defaultToken;

    const setToken = function(newToken) {
        token = newToken;
    }

    const getToken = () => token;

    return {
        setToken, 
        getToken
    };
}

function gameBoardFactory() {
    let board = [];

    const getBoard = () => board;
    const printBoard = () => console.log(board);

    const dropToken = function (row, column, token) {
        if (row >= 3 || column >= 3) {
            return false;
        }

        if (board[row][column] !== defaultToken) {
            return false;
        }

        board[row][column] = token;

        return true;
    };

    const init = () => {
        for (let i = 0; i < BOARD_ROW; i++) {
            board[i] = [];
            for (let j = 0; j < BOARD_COLUMN; j++) {
                board[i].push(defaultToken);
            }
        }
    }

    init();

    return {
        init,
        getBoard,
        printBoard,
        dropToken,
    };
}

function gameController() {
    const player = [
        {
            name: 'player 1',
            token: 'X',
        },
        {
            name: 'player 2',
            token: 'O',
        }
    ]

    const board = gameBoardFactory();
    const boardContent = board.getBoard();
    let activePlayer = player[0];

    const getActivePlayer = () => activePlayer;
    const switchPlayer = function () {
        activePlayer = activePlayer == player[0] ? player[1] : player[0];
    }

    const printNewRound = () => {
        console.log(`${activePlayer.name}'s (${activePlayer.token}) turn.`);
        board.printBoard();
    }

    const dropToken = (row, column) => board.dropToken(row, column, activePlayer.token);

    const playRound = (row, column) => {
        if (!dropToken(row, column)) {
            return;
        }
        
        if (gotWinner(row, column)) {
            console.log(`Winner is ${activePlayer.name} (${activePlayer.token}).`);
            return;
        } else if (!availableSpacesLeft()) {
            console.log('Drawwwww!');
            return;
        } else {
            switchPlayer();
            printNewRound();
        }
    }
    
    const gotWinner = (row, column) => {
        // row win.
        for (let j = 0; j < BOARD_COLUMN; j++) {
            if (boardContent[row][j] !== activePlayer.token) {
                break;
            }

            if (j === BOARD_COLUMN - 1) {
                console.log(`${activePlayer.name} (${activePlayer.token}) win, at row ${row + 1}.`);
                return true;
            }
        }

        // column win.
        for (let i = 0; i < BOARD_ROW; i++) {
            if (boardContent[i][column] !== activePlayer.token) {
                break;
            }

            if (i === BOARD_ROW - 1) {
                console.log(`${activePlayer.name} (${activePlayer.token}) win, at column ${column + 1}.`);
                return true;
            }
        }

        // Diagnal (\) win.
        for (let i = 0; i < BOARD_ROW; i++) {
            if (boardContent[i][i] !== activePlayer.token) {
                break;
            }

            if (i === BOARD_ROW - 1) {
                console.log(`${activePlayer.name} (${activePlayer.token}) win, at diagnal (\\).`);
                return true;
            }
        }

        // Diagnal (/) win.
        if (activePlayer.token === boardContent[0][2] &&
            activePlayer.token === boardContent[1][1] &&
            activePlayer.token === boardContent[2][0]) {
                
            console.log(`${activePlayer.name} win, at diagnal (/).`);
            return true;
        }

        return false;
    }

    const availableSpacesLeft = () => {
        for (let i = 0; i < BOARD_ROW; i++) {
            for (let j = 0; j < BOARD_COLUMN; j++) {
                if (boardContent[i][j] === defaultToken) {
                    return true;
                }
            }
        }

        return false;
    }

    const reset = () => {
        board.init();
        activePlayer = player[0];
        printNewRound();
    }

    printNewRound();

    return {
        reset,
        getActivePlayer,
        playRound,
    }
}

let controller = gameController();

// draw
// controller.playRound(0, 0);
// controller.playRound(0, 2);
// controller.playRound(1, 1);
// controller.playRound(2, 2);
// controller.playRound(2, 0);
// controller.playRound(1, 0);
// controller.playRound(0, 1);
// controller.playRound(2, 1);
// controller.playRound(1, 2);

// column
// controller.playRound(1, 1);
// controller.playRound(1, 0);
// controller.playRound(0, 1);
// controller.playRound(0, 0);
// controller.playRound(2, 1);

// row
// controller.playRound(0, 0);
// controller.playRound(1, 0);
// controller.playRound(0, 1);
// controller.playRound(1, 1);
// controller.playRound(0, 2);
// console.log('=============================');

// diagnal (\)
// controller.playRound(1, 1);
// controller.playRound(0, 1);
// controller.playRound(0, 0);
// controller.playRound(2, 1);
// controller.playRound(2, 2);

// diagnal (/)
controller.playRound(1, 0);
controller.playRound(0, 2);
controller.playRound(1, 2);
controller.playRound(1, 1);
controller.playRound(0, 1);
controller.playRound(2, 0);

//controller.reset();