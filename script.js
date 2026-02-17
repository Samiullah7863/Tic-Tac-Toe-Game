let cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let resetBtn = document.querySelector(".reset-btn");
let winStatus = false;

// Modal and its inner message and button
let modal = document.getElementById("resultModal");
let resultMessage = document.getElementById("resultMessage");
let playAgainBtn = document.getElementById("playAgainBtn");


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
        if (cell.classList[1]) {
            cellInputs += cell.classList[1];
        } else {
            cellInputs += "|";
        }
    });

    // Check winning combinations
    if(cellInputs[0] === currentPlayer && cellInputs[1] === currentPlayer && cellInputs[2] === currentPlayer) {
        winStatus = true;
    }
    else if(cellInputs[3] === currentPlayer && cellInputs[4] === currentPlayer && cellInputs[5] === currentPlayer) {
        winStatus = true;
    }
    else if(cellInputs[6] === currentPlayer && cellInputs[7] === currentPlayer && cellInputs[8] === currentPlayer) {
        winStatus = true;
    }
    else if(cellInputs[0] === currentPlayer && cellInputs[3] === currentPlayer && cellInputs[6] === currentPlayer) {
        winStatus = true;
    }
    else if(cellInputs[1] === currentPlayer && cellInputs[4] === currentPlayer && cellInputs[7] === currentPlayer) {
        winStatus = true;
    }
    else if(cellInputs[2] === currentPlayer && cellInputs[5] === currentPlayer && cellInputs[8] === currentPlayer) {
        winStatus = true;
    }
    else if(cellInputs[0] === currentPlayer && cellInputs[4] === currentPlayer && cellInputs[8] === currentPlayer) {
        winStatus = true;
    }
    else if(cellInputs[2] === currentPlayer && cellInputs[4] === currentPlayer && cellInputs[6] === currentPlayer) {
        winStatus = true;
    }

    if (winStatus) {
        resultMessage.innerText = currentPlayer + " won the game!🎉"
        modal.classList.add("show");
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

    // Check if game is being won
    checkGameWin();

    // Change Player Turn
    changeCurrentPlayer();

    // Update player turn text on frontend
    document.getElementById("currentPlayer").innerText = currentPlayer;
}

// Iterating over cells
cells.forEach(cell => cell.addEventListener("click", handleClick));

// Click Handler for Reset Button
resetBtn.addEventListener("click", resetGame);

// Click Handler for Modal Play Again button
playAgainBtn.addEventListener("click", resetGame);