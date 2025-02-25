
let path = {
    start: [],
    end: [],
    len: 0,
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
    let boardCopy = createBoard(emptyPuzzle)
    let paths = extractPaths(boardCopy, board)
    console.log(paths)
}


function buildPath(start, end, right) {
    let path = {
        start,
        end,
        right
    }

    path.len = right ? +end[1] - start[1] + 1 : +end[0] - start[0] + 1
    return path
}


function extractPaths(board, origin) {
    let paths = []
    for (let line = 0; line < board.length; line++) {
        for (let char = 0; char < board[line].length; char++) {
            if (board[line][char] == '2') {
                paths.push(buildPath([line, char], [line, findEndPath(board, line, char, true)], true))
                paths.push(buildPath([line, char], [findEndPath(board, line, char, false), char], false))
            } else if (board[line][char] == '1') {
                let canGoRight = char !== board[line].length - 1 
                let canGoDown = line !== board.length - 1

                //if (canGoRight && board[line][char + 1] !== '.' ) {
                if (canGoRight && (origin[line][char+1] === '0')) {
                    if ((char === 0) || (char > 0 && origin[line][char-1] != '0')) {
                        paths.push(buildPath([line, char], [line, findEndPath(board, line, char, true)], true))
                    }
                }
                if (canGoDown && origin[line+1][char] === '0') {
                //if (canGoDown && board[line + 1][char] !== '.' && (board[line + 2][char] !== 'x' || board[line - 1][char] !== '0') ) {
                    if ((line === 0) || (line > 0 && origin[line-1][char] != '0')) {
                        paths.push(buildPath([line, char], [findEndPath(board, line, char, false), char], false))
                    }
                }
            }
        }
    }
    return paths
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

function findEndPath(board, row, colon, right) {
    if (right) {
        
        board[row][colon] = board[row][colon] === "2" ? "1" : "x"
        for (let i = colon + 1; i < board[row].length; i++) {
            if (board[row][i] == ".") {
                return i - 1
            } else if (board[row][i] == "0" || board[row][i] == "x") {
                board[row][i] = "x"
            }
            if (i == board[row].length - 1) {
                board[row][i] = "x"
                return i
            }
        }
    } else {
        board[row][colon] = board[row][colon] === "2" ? "1" : "x"
        for (let i = row + 1; i < board.length; i++) {
            if (board[i][colon] == ".") {
                return i - 1
            } else if (board[i][colon] == "0" || board[i][colon] == "x") {
                board[i][colon] = "x"
            }
            if (i == board.length - 1) {
                board[i][colon] = "x"
                return i
            }
        }
    }
}

function ret_len(words) {
    var arr = []
    var obj = {}

    for (let word of words) {
        if (obj[word.length] === undefined) {
            obj[word.length] = []
        }
        obj[word.length]= [...obj[word.length],word]
    }
    return obj
}

/*const puzzle = `2001
0..0
1000
0..0`
const words = ['casa', 'alan', 'ciao', 'anta']*/

const puzzle = `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`
const words = [
    'sunglasses',
    'deckchair',
    'suncream',
    'swimming',
    'icecream',
    'seaside',
    'sandals',
    'bikini',
    'beach',
    'sand',
    'sun',
    'tan',
]


console.log(ret_len(words))
console.log(crosswordSolver(puzzle, words))