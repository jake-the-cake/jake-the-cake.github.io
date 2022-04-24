console.log('js active...');

/* constants */
const MAX_HISTORY_ROWS = 10;
const MULTIPLIERS = [3,1.6,1.5];

/* misc variables */
const priceHistory = [];
let historyOutput = '';
let rowCounter = 1;

/* html elements */
const historyDiv = document.getElementById('historyField');
const outputDiv = document.getElementById('outputField');
const inputDiv = document.getElementById('inputField');

/* key binding */
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('submitButton').click();
    }
})
document.addEventListener('keyup', function(event) {
    if (event.key === 'Delete') {
        event.preventDefault();
        inputDiv.value = '';
    }
})

/* construct table header for history list */
const tableHeader = `    
    <div class="history-row">
        <div class="history-cell history-title">Our Cost</div>
        <div class="history-cell history-title">List Price</div>
        <div class="history-cell history-title">Comp</div>
        <div class="history-cell history-title">Trade</div>
    </div>
`;

/* main function to calculate and display outputs */
function requestPricing(value=inputDiv.value) {
    // debug input
    value = value.replaceAll(/[^a-zA-Z0-9.]/g,'');
    let garbageVar = value * 0;
    let outputOutput = '';
    
    // remove last item from list if over 'MAX_HISTORY_ROWS' items
    if (rowCounter > MAX_HISTORY_ROWS) {
        let historyOutputHolder = historyDiv;
        historyOutputHolder.removeChild(historyOutputHolder.lastElementChild);
        historyOutputHolder.removeChild(historyOutputHolder.firstElementChild);
        historyOutput = historyOutputHolder.innerHTML;
    }
    
    // handle calculations and display - OR - display error output
    if (garbageVar === 0) {
        priceHistory.push({
            cost: Number(value).toFixed(2),
            list: (value * MULTIPLIERS[0]).toFixed(2),
            comp: (value * MULTIPLIERS[1]).toFixed(2),
            trade: (value * MULTIPLIERS[2]).toFixed(2),
        });
        let currentPrice = priceHistory[priceHistory.length - 1];
        outputOutput = `
            <div class="output-row flex100">
                <div class="output-cell">cost:</div>
                <div class="output-cell">$ ${currentPrice.cost}</div>
            </div>
            <div class="output-row">
                <div class="output-cell">list:</div>
                <div class="output-cell">$ ${currentPrice.list}</div>
            </div>
            <div class="output-row">
                <div class="output-cell">comp:</div>
                <div class="output-cell">$ ${currentPrice.comp}</div>
            </div>
            <div class="output-row">
                <div class="output-cell">trade:</div>
                <div class="output-cell">$ ${currentPrice.trade}</div>
            </div>
        `;
        historyOutput = `
            <div class="history-row">
                <div class="history-cell">$ ${currentPrice.cost}</div>
                <div class="history-cell">$ ${currentPrice.list}</div>
                <div class="history-cell">$ ${currentPrice.comp}</div>
                <div class="history-cell">$ ${currentPrice.trade}</div>
            </div>
        ` + historyOutput;
        //outputDiv.innerHTML = outputOutput;
        //historyDiv.innerHTML = tableHeader + historyOutput;
    } else {
        console.log('bad input');
        historyOutput = `
        <div class="history-row error-row">
            '${value}' is not a valid input.
        </div>
    ` + historyOutput;
    outputOutput = `
        <div class="output-row">
            Not a valid input.
        </div>
    `;
    //outputDiv.innerHTML = outputOutput;
    //historyDiv.innerHTML = tableHeader + historyOutput;
    }

    outputDiv.innerHTML = outputOutput;
    historyDiv.innerHTML = tableHeader + historyOutput;

    // reset input field, focus on it, and increase the row counter
    inputDiv.value = '';
    inputDiv.focus();
    rowCounter++;
}

/* click anywhere to focus on input */
function focusOnInput() {
    inputDiv.focus();
}