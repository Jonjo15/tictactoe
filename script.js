let Gameboard = (() => { 
    let board = createEmptyBoard();
    function createEmptyBoard() {
        return Array.apply(null, Array(9));
    }

    let playerFactory = (name, sign) => {
        playedMoves = []
        //this.sign = sign;
        const getSign = () => sign
        const getName = () => name;
        const addMove = (position) => this.playedMoves.push(position);
        return { getName, addMove, getSign}
    }

    playersArray = [];
    let currentPlayer;

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
            currentPlayer = playersArray[0];
        })
        cacheDom.divs.forEach((div) => {
            div.addEventListener("click", (e) => {
                console.log(e.target.dataset.id)
                //if current player = player1 textContent = x else textcontet = O
                //changeCurrentPlayer();
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