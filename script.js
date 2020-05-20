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
    /* return {
        board
    } */
})();