
let room = {
    start: [0,3],
    end: [3,3],
    length: 0,
    right: true
}

function crosswordValidator(empty_puzzle, words) {
    if (typeof empty_puzzle !== 'string' || empty_puzzle === '') return false
    if (!Array.isArray(words) || words.length === 0) return false

    // check for invalid chars in puzzle
    const rgx = /[^210.\n]/g
    if (empty_puzzle.match(rgx) !== null) return false

    // Test words repetition
    let low = new Set(words)
    if (low.size != words.length) return false

    // check type of words elements
    for (elem of words) {
        if (typeof elem !== 'string') {
            return false
        }
    }

    // Test mismatch between number of input words and puzzle starting cells
    let wordStarts = /[21]/g
    let wordsSum = 0
    for (elem of empty_puzzle.match(wordStarts)) {
        wordsSum += Number(elem)
    }
    if (words.length !== wordsSum) return false

    return true
} 

function crosswordSolver(emptyPuzzle, words) {
    if (!crosswordValidator(emptyPuzzle, words)) return "Error";

    let board = createBoard(emptyPuzzle)
    if (board === undefined) return "Error"


}



function createBoard(emptyPuzzle) {
    let board = []
    emptyPuzzle.split('\n').map(elem => {
        board.push([...elem])
    })
    let LineLength = board[0].length
    let a = board.filter(elem => elem.length !== LineLength)
    if (a.length !== 0) return undefined

    return board
}

function foundPathe(board, row, colon, right) {
    let last = 0
    let foundIt = false
    
    if (right) {
        board[row][colon] = board[row][colon] === "2" ? "1" : "x"
        for (let i = colon + 1; i < board[row].length; i++) {
            if (board[row][i] == ".") {
                return i - 1
            } else if (board[row][i] == "0") {
                board[row][i] = "x"
            }
            if (i == board.length - 1) {
                return i
            }
        }
    } else {
        board[row][colon] = board[row][colon] === "2" ? "1" : "x"
        for (let i = row+1; i < board.length; i++) {
            if (board[i][colon] == ".") {
                return i - 1
            } else if (board[i][colon] == "0") {
                board[i][colon] = "x"
            }
            if (i == board.length - 1) {
                board[i][colon] = "x"
                return i
            }
        }
    }
}



const emptyPuzzle = `200.
0..0
.000
0..0`
const words = ['casa', 'alan', 'ciao', 'anta']
let board = createBoard(emptyPuzzle)
let end= foundPathe(board, 0, 0,true)

console.log(board, end)

end = foundPathe(board, 0, 0,false)

console.log(board, end)

// foundPathe(board, 2, 0,true)
// console.log(board, end)

