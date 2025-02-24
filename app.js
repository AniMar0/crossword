
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
    let paths = extractPaths([...board])
    console.log(board)
    console.log(paths)


}


function buildPath(start,end,right) {
    let path = {
        start,
        end,
        // length 
        right
    }

    path.len = right ? +end[1]+1 : +end[0]+1 
    return path
}


function extractPaths(board) {
    let paths = []
    for (let line = 0 ; line < board.length;line++) {
        for (let char = 0 ; char < board[line].length; char++) {
            switch (board[line][char]) {
                case '2':
                    console.log(1)
                    paths.push(buildPath([line,char],[line,findEndPath(board,line,char,true)],true))
                    paths.push(buildPath([line,char],[findEndPath(board,line,char,false),char],false))
                    break;
                case '1':
                    let canGoRight = char !==  board[line].length-1
                    let canGoDown = line !==  board.length-1
                    
                    if (canGoRight && board[line][char+1] !== '.') {
                        paths.push(buildPath([line,char],[line,findEndPath(board,line,char,true)],true))
                    }else if (canGoDown && board[line][char+1] !== '.') {
                        paths.push(buildPath([line,char],[findEndPath(board,line,char,false),char],false))
                    }
                    break;
                default:
                    continue;
            }
        }
    }
    console.log(paths)
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
  'sun',
  'sunglasses',
  'suncream',
  'swimming',
  'bikini',
  'beach',
  'icecream',
  'tan',
  'deckchair',
  'sand',
  'seaside',
  'sandals',
]



console.log(crosswordSolver(puzzle,words))
console.log([undefined||true])