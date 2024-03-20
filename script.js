const gameboard = ( function () {
    let board = [['','',''],['','',''],['','','']];
    const getBoard = () => {
        console.log(board);
    }
    return {getBoard};

})();
    
gameboard.getBoard();

