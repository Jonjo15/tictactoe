let Gameboard = (() => { 
    let board = createEmptyBoard();
    function createEmptyBoard() {
        return Array.apply(null, Array(9));
    }

    let Player = (name) => {
        let playedMoves = []
        const getName = () => name;
        const addMove = (position) => playedMoves.push(position);
        return { getName, addMove}
    }

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

    let bindEvents = (() => {
        cacheDom.submitButton.addEventListener("click", (e) => {
            console.log("works");
        })
    })();
    /* return {
        board
    } */
})();
//let divs = document.querySelectorAll(".divs")
//console.log(divs);