export let path = {
    start: [],
    end: [],
    len: 0,
    right: true
}

export function extractPaths(board, origin) {
    let paths = []
    for (let line = 0; line < board.length; line++) {
        for (let char = 0; char < board[line].length; char++) {
            if (board[line][char] == '2') {
                paths.push(buildPath([line, char], [line, findEndPath(board, line, char, true)], true))
                paths.push(buildPath([line, char], [findEndPath(board, line, char, false), char], false))

            } else if (board[line][char] == '1') {
                let canGoRight = char !== board[line].length - 1
                let canGoDown = line !== board.length - 1

                if (canGoRight && (origin[line][char + 1] === '0')) {
                    if ((char === 0) || (char > 0 && origin[line][char - 1] != '0')) {
                        paths.push(buildPath([line, char], [line, findEndPath(board, line, char, true)], true))
                    }
                }

                if (canGoDown && origin[line + 1][char] === '0') {
                    if ((line === 0) || (line > 0 && origin[line - 1][char] != '0')) {
                        paths.push(buildPath([line, char], [findEndPath(board, line, char, false), char], false))
                    }
                }
            }
        }
    }
    return paths
}

export function buildPath(start, end, right) {
    let path = {
        start,
        end,
        right
    }
    path.len = right ? (+end[1] - start[1] + 1) : (+end[0] - start[0] + 1)
    return path
}

function findEndPath(board, row, colon, right) {
    if (right) {
        board[row][colon] = board[row][colon] === "2" ? "1" : "x"
        for (let i = colon + 1; i < board[row].length; i++) {
            if (board[row][i] == ".") {
                return i - 1
            }
            if (i == board[row].length - 1) {
                return i
            }
        }
    } else {
        board[row][colon] = board[row][colon] === "2" ? "1" : "x"
        for (let i = row + 1; i < board.length; i++) {
            if (board[i][colon] == ".") {
                return i - 1
            }
            if (i == board.length - 1) {
                return i
            }
        }
    }
}