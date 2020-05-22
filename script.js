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
        const getMoves = () => playedMoves;
        return { getName, addMove, getSign, getMoves}
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
        return {divs, firstPlayerInput, secondPlayerInput, submitButton};
    })();

    function changeCurrentPlayer() {
        if (currentPlayer == playersArray[0]) {
            currentPlayer = playersArray[1];
        }
        else {
            currentPlayer = playersArray[0];
        }
    }

    function gameOver() {
        let movesPlayed = currentPlayer.getMoves;
        winningCombinations.forEach((combination) => {
            //fix this function
            for(let i = 0; i < combination.length; i++) {
                let count = 0;
                if (movesPlayed.includes(combination[i])) {
                    console.log(count);
                    count += 1;
                    console.log(count);
                }
               if (count == 3) {
                    return true;
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
            currentPlayer = playersArray[0];
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
                let index = +e.target.dataset.id;
                currentPlayer.addMove(index);
                let move = currentPlayer.getSign();
                div.textContent = move;
                numberOfPlays += 1;
                //if current player = player1 textContent = x else textcontet = O
                if (gameOver) {
                    console.log("GAME OVER");
                }
                changeCurrentPlayer();
                //check if gameover
            })
        })
    })();
    
    /* return {
        board
    } */
    return {playersArray}
})();
//let divs = document.querySelectorAll(".divs")
//console.log(divs);