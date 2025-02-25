export function createBoard(emptyPuzzle) {
    let board = []
    emptyPuzzle.split('\n').map(elem => {
        board.push([...elem])
    })
    let LineLength = board[0].length
    let a = board.filter(elem => elem.length !== LineLength)
    if (a.length !== 0) return undefined

    return board
}