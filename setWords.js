export function placeOtherWord(board, paths, wordsObj) {
    let solutions = 0;
    let result = [];

    function cansetWord(board, path, word) {
        if (word.length !== path.len) return false;
        if (path.right) {
            for (let i = 0; i < path.len; i++) {
                let currentChar = board[path.start[0]][path.start[1] + i];
                if (currentChar == '1' || currentChar == '2' || currentChar == '0') continue;
                if (currentChar == '.' || currentChar !== word[i]) {
                    return false;
                }
            }
        } else {
            for (let i = 0; i < path.len; i++) {
                let currentChar = board[path.start[0] + i][path.start[1]];
                if (currentChar == '1' || currentChar == '2' || currentChar == '0') continue;
                if (currentChar == '.' || currentChar !== word[i]) {
                    return false;
                }
            }
        }
        return true;
    }

    function setWord(board, path, word) {
        if (path.right) {
            for (let i = 0; i < path.len; i++) {
                board[path.start[0]][path.start[1] + i] = word[i];
            }
        } else {
            for (let i = 0; i < path.len; i++) {
                board[path.start[0] + i][path.start[1]] = word[i];
            }
        }
        return board
    }

    function removeWord(board, path, original) {
        if (path.right) {
            for (let i = 0; i < path.len; i++) {
                board[path.start[0]][path.start[1] + i] = original[path.start[0]][path.start[1] + i];
            }
        } else {
            for (let i = 0; i < path.len; i++) {
                board[path.start[0] + i][path.start[1]] = original[path.start[0] + i][path.start[1]];
            }
        }
    }

    function backtrack(index) {
        if (index === paths.length) {
            solutions++;
            if (solutions > 1) return true;
            result = board.map(row => row.join("")).join("\n");
            return false;
        }

        let path = paths[index];
        let availableWords = wordsObj[path.len] || [];

        for (let i = 0; i < availableWords.length; i++) {
            let word = availableWords[i];

            if (cansetWord(board, path, word)) {
                let bb = copy(board)
                setWord(board, path, word);
                let removedWord = availableWords.splice(i, 1)[0];
                if (backtrack(index + 1)) return true;

                availableWords.splice(i, 0, removedWord);
                removeWord(board, path, bb);
            }
        }
        return false;
    }

    if (backtrack(0) || solutions === 0) {
        return "Error";
    } else {
        return result;
    }
}

function copy(arr){
    let arr2 = []
    for (let elem of arr){
        arr2.push([...elem])
    }
    return arr2
}

export function createWordsObj(words) {
    var obj = {}

    for (let word of words) {
        if (obj[word.length] === undefined) {
            obj[word.length] = []
        }
        obj[word.length] = [...obj[word.length], word]
    }
    return obj
}