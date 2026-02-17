let cells = document.querySelectorAll(".cell");
let currentPlayer = "X";


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

    // Change Player Turn
    changeCurrentPlayer();

    // Update player turn text on frontend
    document.getElementById("currentPlayer").innerText = currentPlayer;
}

// Iterating over cells
cells.forEach(cell => cell.addEventListener("click", handleClick));
