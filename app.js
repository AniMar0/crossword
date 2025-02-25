import { createBoard } from "./board.js";
import { extractPaths } from "./path.js";
import { createWordsObj, placeOtherWord, } from "./setWords.js";

function crosswordSolver(emptyPuzzle, words) {
    if (!crosswordValidator(emptyPuzzle, words)) return "Error";
    let board = createBoard(emptyPuzzle)
    if (board === undefined) return "Error"
    let boardCopy = createBoard(emptyPuzzle)
    let paths = extractPaths(boardCopy, board)
    let wordsObj = createWordsObj(words)

    console.log(placeOtherWord(board, paths, wordsObj))
    return
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
    for (let elem of words) {
        if (typeof elem !== 'string') {
            return false
        }
    }

    // Test mismatch between number of input words and puzzle starting cells
    let wordStarts = /[21]/g
    let wordsSum = 0
    for (let elem of empty_puzzle.match(wordStarts)) {
        wordsSum += Number(elem)
    }
    if (words.length !== wordsSum) return false

    return true
}

// const puzzle = `...1...........
// ..1000001000...
// ...0....0......
// .1......0...1..
// .0....100000000
// 100000..0...0..
// .0.....1001000.
// .0.1....0.0....
// .10000000.0....
// .0.0......0....
// .0.0.....100...
// ...0......0....
// ..........0....`
// const words = [
//   'sun',
//   'sunglasses',
//   'suncream',
//   'swimming',
//   'bikini',
//   'beach',
//   'icecream',
//   'tan',
//   'deckchair',
//   'sand',
//   'seaside',
//   'sandals',
// ]

const puzzle = '2001\n0..0\n1000\n0..0'
const words = ['casa', 'alan', 'ciao', 'anta']

crosswordSolver(puzzle, words)