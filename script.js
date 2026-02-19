let cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let resetBtn = document.querySelector(".reset-btn");
let winStatus = false;

// Modal and its inner message and button
let modal = document.getElementById("resultModal");
let resultMessage = document.getElementById("resultMessage");
let playAgainBtn = document.getElementById("playAgainBtn");

// Wining Combinations
let winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
];


// Function to reset game
function resetGame() {
    cells.forEach(cell => {
        // Removing all the "X" and "O" stylings
        cell.classList.remove("X");
        cell.classList.remove("O");

        // Making the cells keyboard accessible again
        cell.setAttribute(
            "tabindex",
            "0"
        );
    })

    currentPlayer = "X";
    winStatus = false;
    
    document.getElementById("currentPlayer").innerText = currentPlayer;

    // Hide Modal
    modal.classList.remove("show");
}


function checkGameWin() {
    let cellInputs = [];
    cells.forEach(cell => {
        // Store "O" or "X" in case the cell is filled, else store "|" in cellinputs array
        cellInputs.push(cell.classList[1] ?? "|")
    });

    // Check winning combinations
    winStatus = winningCombinations.some(([a, b, c]) =>
        cellInputs[a] === currentPlayer && 
        cellInputs[b] === currentPlayer && 
        cellInputs[c] === currentPlayer
    )


    if (winStatus) {
        resultMessage.innerText = currentPlayer + " won the game!🎉"
        modal.classList.add("show");
        return true;
    }

    return false;

}


// Update modal inner message to game over and show it
function displayGameOverMessage() {
    resultMessage.innerText = "The game ended in a draw!";
    modal.classList.add("show");
}


function checkGameOver() {

    // If there is an empty cell, do nothing
    for (let cell of cells) {
        if (!cell.classList.contains("X") && !cell.classList.contains("O")) {
            return false;
        }
    }

    // If all the cells are filled and there is no winner, return true for game over
    if(!winStatus) {
        return true;
    }
}


function changeCurrentPlayer() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
}


// Handle cell click
function handleClick(e) {
    let cell = e.target;

    // Do nothing on cell click if there is already "X" or "O" in it
    if (cell.classList.contains("X") || cell.classList.contains("O")) {
        return;
    }

    // Add class "O" or "X" to the cell
    cell.classList.add(currentPlayer);

    // Screen reader announcement in case a cell is selected
    cell.setAttribute(
        "aria-label",
        `Player ${currentPlayer} selected this cell`
    );

    // Making a cell keyboard inaccessible once it is selected
    cell.setAttribute(
        "tabindex",
        "-1"
    );

    // Check game won status, else check game over status or continue game
    if (!checkGameWin()) {

        // Check if game is over/draw then display game over message
        if (checkGameOver()) {
            displayGameOverMessage();
        } else {
            // Change Player Turn
            changeCurrentPlayer();
        }

    } 

    

    // Update player turn text on frontend
    document.getElementById("currentPlayer").innerText = currentPlayer;
}

// Iterating over cells
cells.forEach(cell => cell.addEventListener("click", handleClick));

// Click Handler for Reset Button
resetBtn.addEventListener("click", resetGame);

// Click Handler for Modal Play Again button
playAgainBtn.addEventListener("click", resetGame);