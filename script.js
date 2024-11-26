document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const restartButton = document.getElementById("restart");
    const toggleAIButton = document.getElementById("toggleAI");

    let cells = [];
    let currentPlayer = "X";
    let isAIEnabled = false;
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const createBoard = () => {
        board.innerHTML = "";
        cells = Array.from({ length: 9 }, (_, i) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            board.appendChild(cell);
            return cell;
        });
        updateStatus();
    };

    const updateStatus = () => {
        status.textContent = gameActive ? `Player ${currentPlayer}'s Turn` : "Game Over";
    };

    const checkWinner = () => {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                cells[a].textContent &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent
            ) {
                gameActive = false;
                status.textContent = `Player ${currentPlayer} Wins!`;
                highlightWinningCells([cells[a], cells[b], cells[c]]);
                return true;
            }
        }
        if (cells.every(cell => cell.textContent)) {
            gameActive = false;
            status.textContent = "It's a Tie!";
            return true;
        }
        return false;
    };

    const highlightWinningCells = (winningCells) => {
        winningCells.forEach(cell => {
            cell.style.background = "#28a745";
        });
    };

    const handleCellClick = (cell) => {
        if (!gameActive || cell.textContent) return;

        cell.textContent = currentPlayer;
        cell.classList.add("taken");

        if (checkWinner()) return;

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatus();

        if (isAIEnabled && currentPlayer === "O") {
            makeAIMove();
        }
    };

    const makeAIMove = () => {
        const emptyCells = cells.filter(cell => !cell.textContent);
        if (emptyCells.length === 0) return;

        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        setTimeout(() => {
            handleCellClick(randomCell);
        }, 500); // Simulates AI thinking
    };

    const restartGame = () => {
        gameActive = true;
        currentPlayer = "X";
        createBoard();
    };

    const toggleAI = () => {
        isAIEnabled = !isAIEnabled;
        toggleAIButton.textContent = `Play Against AI: ${isAIEnabled ? "On" : "Off"}`;
        restartGame();
    };

    board.addEventListener("click", (e) => {
        if (e.target.classList.contains("cell")) {
            handleCellClick(e.target);
        }
    });

    restartButton.addEventListener("click", restartGame);
    toggleAIButton.addEventListener("click", toggleAI);

    createBoard();
});
