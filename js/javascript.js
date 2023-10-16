// player creator factory function
const createPlayer = (name, marker) => {
    return {name, marker};
};

const gameBoard = (() => {
    // board declaration
    let board = [];
    for (let i = 0; i < 9; i++) {
        board.push("");
    }

    // selector for the fields/squares
    const fields = document.querySelectorAll(".field");
    const message = document.querySelector(".message");

    // clear board
    const clearBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }

        fields.forEach((field) => {
            field.innerText = "";
            field.style.pointerEvents = "auto";
        });
        message.innerText = "New game. Player 1, make your move.";
    };

    // clickable cells
    fields.forEach((field, index) => {
        field.addEventListener("click", () => {
            // fill the sqaure with appropriate marker
            field.innerText = game.activePlayer.marker;
            // disable clicking after cell is filled
            field.style.pointerEvents = "none";
            // reduce remaining spots
            console.log(game.remainingSpots -= 1);
            // add value to array index
            board[index] = game.activePlayer.marker;
            // check winner
            game.checkWinner();
            //console.log board after each click
            console.log(board);

            if (game.winnerDeclared === false) {
                if (game.remainingSpots > 0) {
                    game.alertNextPlayer();
                    game.nextPlayer();
                } else if (game.remainingSpots === 0) {
                    game.declareTie();
                }
            }
        }); 
    });

    return { 
        board,
        fields,
        clearBoard
    };
})();

const game = (() => {
    // message text on load
    window.onload = () => {
        console.log(message.innerText = `Player 1, make your move.`);
    };

    // player declarations
    const player1 = createPlayer("Player 1", "X");
    const player2 = createPlayer("Player 2", "O");

    // starting point
    let activePlayer = player1;
    let winnerDeclared = false;
    let remainingSpots = 9;

    // selectors
    const message = document.querySelector(".message");
    const restartButton = document.querySelector(".restart-button");

    // declare a tie
    const declareTie = () => {
        message.innerText = "Game Over! This round ended in a draw.";
    };

    // change active player
    function nextPlayer() {
        if (this.activePlayer === player1) {
            this.activePlayer = player2;
        } else {
            this.activePlayer = player1;
        }
    }

    function alertNextPlayer() {
        if (this.activePlayer === player1) {
            message.innerText = `Player 2, make your move.`;
        } else {
            message.innerText = `Player 1, make your move.`;
        }
    }

    // restart button
    restartButton.addEventListener("click", (e) => {
        gameBoard.clearBoard();
        game.reset();
    });

    // winning conditions
    const winningAxes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    // check winner
    function checkWinner() {
        winningAxes.forEach((item, index) => {
            if (gameBoard.board[item[0]] === this.activePlayer.marker && 
                gameBoard.board[item[1]] === this.activePlayer.marker && 
                gameBoard.board[item[2]] === this.activePlayer.marker) {
                console.log('winner!');
                message.innerText = `${this.activePlayer.name} wins!`;
                this.winnerDeclared = true;
            } 
        });
    }

    function reset() {
        this.remainingSpots = 9;
        this.activePlayer = player1;
        this.winnerDeclared = false;
    };

    // return
    return {
        nextPlayer,
        alertNextPlayer,
        declareTie,
        remainingSpots,
        winnerDeclared,
        activePlayer,
        remainingSpots,
        checkWinner,
        reset
    };
})();