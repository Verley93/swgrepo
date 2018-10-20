
function play() {
    let balance = parseInt(document.forms["lucky7s"]["bet"].value);
    console.log(`Balance: ${balance}`);
    let totalRolls;
    let topWinnings;

    // Form Validation
    formValidation(balance);

    // Set Initial Values
    totalRolls = 0;
    topWinnings = balance;
    document.getElementById("startingBet").innerHTML = `$${balance}.00`;
    document.getElementById("rollCount").innerHTML = totalRolls;
    document.getElementById("highestWon").innerHTML = `$${topWinnings}.00`;
    document.getElementById("rollCountAtHighest").innerHTML = totalRolls;

    // Gamble Away Life
    do {
        let shake = rollDice();
        console.log(`Rolled a ${shake}.`);
        totalRolls++
        document.getElementById("rollCount").innerHTML = totalRolls;
        console.log(`Roll #: ${totalRolls}`);

        if (shake == 7) {
            balance += 4;
            console.log(`The new balance is $${balance}.00.`);
        } else {
            balance -= 1;
            console.log(`The new balance is $${balance}.00.`);
        }

        if (balance > topWinnings) {
            topWinnings = balance;
            document.getElementById("highestWon").innerHTML = `$${topWinnings}.00`;
            document.getElementById("rollCountAtHighest").innerHTML = totalRolls;
            console.log(`The new highest balance is $${topWinnings}.00.`);
            console.log(`The new roll count at highest balance is ${totalRolls}`);

        }
        console.log(`\n \n`);
    } while (balance > 0);

    // Print Results if balance == 0
    if (balance <= 0) {
        printResults();
    }

    // Prevent form from submitting to see results
    return false;
}

// Validate Form
function formValidation(balance) {
    // Throw error if bet is negative or 0 and reset form
    if (Math.sign(balance) == -1 || Math.sign(balance) == 0) {
        alert("Starting Bet must be filled in with a positive integer.");
        document.forms["lucky7s"].className = "has-error text-center";
        reset();

        // Prevent user from progressing with invalid input
        return false;
    }
}

// Clear and Reset Form
function reset() {
    document.forms["lucky7s"]["bet"].value = "";
    document.forms["lucky7s"]["bet"].focus();
    document.forms["lucky7s"].className = "text-center";
    document.getElementById("resetButton").style.display = "none";
    document.getElementById("playButton").style.display = "block";
    document.getElementById("playButton").innerHTML = "Play";
    document.getElementById("results").style.display = "none";
    document.getElementById("startingBet").innerHTML = "";
    document.getElementById("rollCount").innerHTML = "";
    document.getElementById("highestWon").innerHTML = "";
    document.getElementById("rollCountAtHighest").innerHTML = "";
}

// Dice Shaker
function rollDice() {
    const dice1 = Math.floor(Math.random() * 6) + 1;
    console.log(`Dice 1 = ${dice1}`);
    const dice2 = Math.floor(Math.random() * 6) + 1;
    console.log(`Dice 2 = ${dice2}`);
    const result = dice1 + dice2;

    return result;
}

function printResults () {
    document.getElementById("playButton").style.display = "none";
    document.getElementById("resetButton").style.display = "block";
    document.getElementById("resetButton").addEventListener("click", reset);
    document.getElementById("results").style.display = "block";
}
