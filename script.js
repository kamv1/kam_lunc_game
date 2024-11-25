let isWalletConnected = false;
let round = 1;
let userWins = 0;
let computerWins = 0;

const walletAddresses = {
    btc: "1CVkvbFFZ2BPCQYWjXisicZ1FzbkeT3nTx",
    eth: "0x5891014db0da0f3d2df596854fcb5653d4a12af4",
    lunc: "terra15nke8ae5fstjxpvkxykfxazxgpjzcnhthm0gvh",
    shido: "0xbb82b93350441c2ecbfc136b10753f7bc050c601",
    bnb: "0x5891014db0da0f3d2df596854fcb5653d4a12af4"
};

function registerUser() {
    const username = document.getElementById('username').value;
    if (username.trim() === '') {
        alert('Please enter a valid username.');
        return;
    }
    document.getElementById('player-name').textContent = username;
    document.getElementById('registration-panel').style.display = 'none';
    document.getElementById('game-panel').style.display = 'block';
    updateScoreboardHeader(); // Tablo başlığını güncelle
}

function connectWallet() {
    isWalletConnected = true;
    document.getElementById('wallet-status').textContent = 'Wallet: Connected';
    alert('Wallet connected successfully!');
}

function playGame(userChoice) {
    if (!isWalletConnected) {
        alert('Please connect your wallet to play the game.');
        return;
    }

    if (userWins === 3 || computerWins === 3) {
        return;
    }

    const choices = ['lunc', 'shido', 'ustc'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    document.getElementById('user-choice').textContent = `Your choice: ${userChoice.toUpperCase()}`;
    document.getElementById('computer-choice').textContent = `KAM's choice: ${computerChoice.toUpperCase()}`;

    let result = '';

    if (userChoice === computerChoice) {
        result = "It's a tie!";
    } else if (
        (userChoice === 'lunc' && computerChoice === 'ustc') ||
        (userChoice === 'ustc' && computerChoice === 'shido') ||
        (userChoice === 'shido' && computerChoice === 'lunc')
    ) {
        result = "You win!";
        userWins++;
    } else {
        result = "KAM wins!";
        computerWins++;
    }

    document.getElementById('result').textContent = `Result: ${result}`;
    updateScoreboard(userChoice, computerChoice, result);

    checkWinner();
}

function updateScoreboard(userChoice, computerChoice, result) {
    const scoreTable = document.getElementById('score-table');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${round++}</td>
        <td>${userChoice.toUpperCase()}</td>
        <td>${computerChoice.toUpperCase()}</td>
        <td>${result}</td>
    `;
    scoreTable.appendChild(row);
}

// Tablo başlıklarını güncelleme
function updateScoreboardHeader() {
    const headerRow = document.querySelector('.scoreboard thead tr');
    headerRow.innerHTML = `
        <th>Round</th>
        <th>Your Choice</th>
        <th>KAM's Choice</th>
        <th>Result</th>
    `;
}

function checkWinner() {
    if (userWins === 3) {
        document.getElementById('game-status').textContent = "🎉 Congratulations! You won the game!";
        showButtons();
    } else if (computerWins === 3) {
        document.getElementById('game-status').textContent = "💻 Sorry! KAM won the game!";
        showButtons();
    }
}

function showButtons() {
    document.getElementById('restart-button').style.display = 'block';
    document.getElementById('donate-button').style.display = 'block';
}

function resetGame() {
    document.getElementById('game-status').textContent = "";
    document.getElementById('score-table').innerHTML = "";
    document.getElementById('restart-button').style.display = 'none';
    document.getElementById('donate-button').style.display = 'none';
    userWins = 0;
    computerWins = 0;
    round = 1;
}

// Donate Modal Functions
function showDonateOptions() {
    document.getElementById('donate-modal').style.display = 'block';
}

function closeDonateModal() {
    document.getElementById('donate-modal').style.display = 'none';
    document.getElementById('wallet-address').textContent = "";
}

function showAddress(currency) {
    const address = walletAddresses[currency];
    const addressElement = document.getElementById('wallet-address');
    addressElement.textContent = `Wallet Address: ${address}`;
    addressElement.setAttribute('data-address', address);
}

function copyToClipboard() {
    const addressElement = document.getElementById('wallet-address');
    const address = addressElement.getAttribute('data-address');
    if (address) {
        navigator.clipboard.writeText(address);
        alert('Wallet address copied to clipboard!');
    }
}
