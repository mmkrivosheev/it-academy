const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
    btn.disabled = true;
    const result = walksHorse();

    for (let i = 0; i < result.length; i++) {
        setTimeout(() => {
            result[i] = result[i].join(",");
            const cell = document.querySelector(`.cell[data-cell="${result[i]}"]`);
            cell.innerHTML = `${i + 1}`;
            cell.style.backgroundColor = "gray";
        }, 400 * i);
    }
});

function walksHorse() {
    const board = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ];

    const cur = [0, 0];
    const isSolution = [false];
    return getMoves(cur, board, isSolution);
}

function getMoves(cur, board, isSolution) {
    const moves = [];

    board = board.map((n, i) => {
        return (i === cur[0])
            ? n.map((n, i) => i === cur[1] ? 1 : n)
            : n
    });

    if (checkIsAllOne(board)) {
        isSolution[0] = true;
        return [cur];
    }

    for (let i = 0; i < 8; i++) {
        const next = [];

        if (i === 0) next.push(cur[0] + 1, cur[1] + 2);
        if (i === 1) next.push(cur[0] + 2, cur[1] + 1);
        if (i === 2) next.push(cur[0] + 2, cur[1] - 1);
        if (i === 3) next.push(cur[0] + 1, cur[1] - 2);
        if (i === 4) next.push(cur[0] - 1, cur[1] - 2);
        if (i === 5) next.push(cur[0] - 2, cur[1] - 1);
        if (i === 6) next.push(cur[0] - 2, cur[1] + 1);
        if (i === 7) next.push(cur[0] - 1, cur[1] + 2);

        if (checkIsCrossBorder(next) && board[next[0]][next[1]] !== 1 && !isSolution[0])
            moves.push([cur, ...getMoves(next, board, isSolution)]);
        else moves.push([cur]);
    }

    return moves.reduce((prev, cur) => prev.length > cur.length ? prev : cur);
}

function checkIsCrossBorder(cur) {
    if (cur[0] < 0 || cur[0] > 7 || cur[1] < 0 || cur[1] > 7)
        return false;

    return true;
}

function checkIsAllOne(board) {
    let count = 0;

    for (let arr of board) {
        arr.forEach(n => {
            if (n !== 1) count++;
        }) ;
    }

    return !count;
}