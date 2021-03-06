const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

export function calculateWinner(board: (string | null)[]) {
    for (let i = 0; i < lines.length; i++) {
        const [first, second, third] = lines[i];
        if (board[first] && board[first] === board[second] && board[first] === board[third]) {
            return board[second];
        }
    }

    return null;
}
