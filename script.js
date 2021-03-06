let Gameboard = (() => { 
    let board = createEmptyBoard();
    function createEmptyBoard() {
        return Array.apply(null, Array(9));
    }

    let playerFactory = (name, sign) => {
        let playedMoves = []
        //this.sign = sign;
        const getSign = () => sign
        const getName = () => name;
        const addMove = (position) => playedMoves.push(position);
        const resetPlayedMoves = () => {
            playedMoves = [];
            return;
        }
        const getMoves = () => playedMoves;
        return { getName, addMove, getSign, getMoves, resetPlayedMoves}
    }
    let winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    playersArray = [];
    let currentPlayer;
    let numberOfPlays = 0;
    let flowControl = (()=> {
        //switchturns function
        //checkifgameover
        //whowon
        //tie?
    })();
    let cacheDom = (() => {
        let divs = document.querySelectorAll(".divs");
        let firstPlayerInput = document.querySelector("#p1");
        let secondPlayerInput = document.querySelector("#p2");
        let submitButton = document.querySelector("#submit");
        let resetButton = document.querySelector("#reset");
        let scoreBoard = document.querySelector(".scoreBoard");
        let score = document.querySelector(".score");
        let announceWinner = document.querySelector(".announce");
        let submitArea = document.querySelector(".createPlayers");
        return {divs, firstPlayerInput, secondPlayerInput, submitButton, resetButton, scoreBoard, score, announceWinner, submitArea};
    })();

    function removeScoreBoard() {
       // cacheDom.scoreBoar
       //finish this
    }
    function changeCurrentPlayer() {
        if (currentPlayer == playersArray[0]) {
            currentPlayer = playersArray[1];
        }
        else {
            currentPlayer = playersArray[0];
        }
    }
    let firstWins = 0;
    let secondWins = 0;
    let numTies = 0;
    function setScoreBoard() {
        let firstPlayer = playersArray[0].getName();
        let secondPlayer = playersArray[1].getName();
        cacheDom.score.textContent = firstPlayer + ":" + firstWins + " Ties:" + numTies + " " + secondPlayer + ":" + secondWins;
    }
    let gameFinished = false;
    function gameOver() {
        let movesPlayed = currentPlayer.getMoves();
        winningCombinations.forEach((combination) => {
            //fix this function
            let count = 0;
            //console.log(combination);
            for(let i = 0; i < combination.length; i++) {
                //console.log(combination);
                //let count = 0;
                if (movesPlayed.includes(combination[i])) {
                    //console.log(count);
                    count += 1;
                    //console.log(count);
                }
               if (count == 3) {
                   //console.log("GAMEOVER");
                    gameFinished = true;
               }
            } 
        });
        return false;
    }

    let bindEvents = (() => {
        cacheDom.submitButton.addEventListener("click", (e) => {
            if (playersArray.length > 1) { 
                return;
            }
            //console.log(cacheDom.secondPlayerInput.value);
            let firstPlayerName = cacheDom.firstPlayerInput.value;
            let firstPlayer = playerFactory(firstPlayerName, "X");
            playersArray.push(firstPlayer);
            //console.log(cacheDom.firstPlayerInput.value);
            let secondPlayerName = cacheDom.secondPlayerInput.value;
            let secondPlayer = playerFactory(secondPlayerName, "O");
            playersArray.push(secondPlayer);
            //console.log(currentPlayer);
            setScoreBoard();
            currentPlayer = playersArray[0];
            cacheDom.submitArea.style.display = "none";
            //console.log(currentPlayer.getName());
        })
        cacheDom.divs.forEach((div) => {
            div.addEventListener("click", (e) => {
                if (playersArray.length == 0) {
                    return;
                }
                if (numberOfPlays >= 9) {
                    return;
                }
                if (div.classList.contains("marked")) { 
                    return;
                }
                if (gameFinished) {
                    return;
                }
                cacheDom.firstPlayerInput.value = "";
                cacheDom.secondPlayerInput.value = "";
                div.classList.add("marked");
                let index = +e.target.dataset.id;
                currentPlayer.addMove(index);
                let move = currentPlayer.getSign();
                div.textContent = move;
                numberOfPlays += 1;
                //if current player = player1 textContent = x else textcontet = 
                gameOver();
                if (numberOfPlays == 9 && !gameFinished) {
                    cacheDom.announceWinner.textContent = "TIE!"
                    numTies += 1;
                    setScoreBoard();
                    startNewGameButton = document.createElement("button");
                    startNewGameButton.textContent = "Play Again";
                    startNewGameButton.addEventListener("click", (e) => {
                    startNew();
                    cacheDom.announceWinner.textContent = "";
                    startNewGameButton.remove();
                    });
                    cacheDom.scoreBoard.appendChild(startNewGameButton);
                }
                if (gameFinished) {
                    if (currentPlayer == playersArray[0]) {
                        firstWins += 1;
                        setScoreBoard();
                    }
                    else {
                        secondWins += 1;
                        setScoreBoard();
                    }
                    announceWinner();
                    //cacheDom.announceWinner.textContent = currentPlayer.getName() + " is the winner"
                    //alert("GAME OVER, " + currentPlayer.getName() + " is the winner");
                }
                changeCurrentPlayer();
                //check if gameover
            })
        });
        cacheDom.resetButton.addEventListener("click", (e) => {
            console.log("RESET WORKS");
            resetBoard();
        });
    })();
    function announceWinner() {
        cacheDom.announceWinner.textContent = currentPlayer.getName() + " is the winner";
        startNewGameButton = document.createElement("button");
        startNewGameButton.textContent = "Play Again";
        startNewGameButton.addEventListener("click", (e) => {
            startNew();
            cacheDom.announceWinner.textContent = "";
            startNewGameButton.style.display = "none";
        });
        cacheDom.scoreBoard.appendChild(startNewGameButton);
    }
    function startNew() {
        cacheDom.divs.forEach((div) => {
            div.textContent = "";
            if (div.classList.contains("marked")) {
                div.classList.remove("marked");
            }
        });
        numberOfPlays = 0;
        gameFinished = false;
        playersArray.forEach((player) => {
            player.resetPlayedMoves();
        })
    }
    function resetBoard() {
        cacheDom.divs.forEach((div) => {
            div.textContent = "";
            if (div.classList.contains("marked")) {
                div.classList.remove("marked");
            }
        });
        cacheDom.submitArea.style.display = "block";
        cacheDom.firstPlayerInput.value = "";
        cacheDom.secondPlayerInput.value = "";
        cacheDom.score.textContent = "";
        playersArray = [];
        numberOfPlays = 0;
        firstWins = 0;
        secondWins = 0;
        numTies = 0;
        gameFinished = false;
    }
    /* return {
        board
    } */
    return {playersArray}
})();
//let divs = document.querySelectorAll(".divs")
//console.log(divs);