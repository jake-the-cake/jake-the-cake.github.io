const MULTIPLIER = [100,50,20,10,5,1,.25,.1,.05,.01];

let resultDiv = document.getElementById('result-container');

const dontTouchThat = () => {
    alert('don\'t touch that!');
    console.log('don\'t do that ever again!');
}

const validateIntegerInput = (input) => {
    const returnData = { input:input };
    if (Number(input) * 0 !== 0) {
        returnData.error = `'${input}' is not valid`;
        return returnData;
    } else if (Number(input) === parseInt(input)) {
        returnData.status = 'valid';
        return returnData;
    } else if (Number(input) === 0) {
        returnData.status = 'valid';
        returnData.int = '0';
        return returnData;
    } else {
        returnData.status = 'valid';
        returnData.int = parseInt(input);
        return returnData;
    }
}

const handleForm = () => {
    const data = document.forms['calc-form'];
    const validatedData = [
        [validateIntegerInput(data['hundred-input'].value), 'hundred-error'],
        [validateIntegerInput(data['fifty-input'].value), 'fifty-error'],
        [validateIntegerInput(data['twenty-input'].value), 'twenty-error'],
        [validateIntegerInput(data['ten-input'].value), 'ten-error'],
        [validateIntegerInput(data['five-input'].value), 'five-error'],
        [validateIntegerInput(data['single-input'].value), 'single-error'],
        [validateIntegerInput(data['quarter-input'].value), 'quarter-error'],
        [validateIntegerInput(data['dime-input'].value), 'dime-error'],
        [validateIntegerInput(data['nickel-input'].value), 'nickel-error'],
        [validateIntegerInput(data['penny-input'].value), 'penny-error']
    ];
    let stillValid = true;
    let currentBalance = 0;

    for (let i=0; i < validatedData.length; i++) {    
        let messageDiv = document.getElementById(`${validatedData[i][1]}`);
        if (!validatedData[i][0].error) {
            let addedBalance = MULTIPLIER[i];
            if (!validatedData[i][0].int) {
                addedBalance *= validatedData[i][0].input;
                messageDiv.style.display = 'none';
            } else {
                messageDiv.innerHTML = `*NOTE* - '${validatedData[i][0].input}' changed to '${validatedData[i][0].int}'`;
                messageDiv.style.display = 'flex';
                messageDiv.style.color = '#dd0';
                messageDiv.style.backgroundColor = 'rgba(0,0,0,.2)';
                addedBalance *= validatedData[i][0].int;
            }
            currentBalance += addedBalance;
        } else {
            stillValid = false;
            messageDiv.innerHTML = `*ERROR* - ${validatedData[i][0].error}`;
            messageDiv.style.display = 'flex';
            messageDiv.style.color = '#900';
            messageDiv.style.backgroundColor = 'rgba(0,0,0,.2)';
        }
        console.log(currentBalance.toFixed(2));
    }

    // Print out result or error
    if (stillValid === true) {
        console.log('good');
        resultDiv.innerHTML = `$ ${currentBalance.toFixed(2)}`;
        resultDiv.style.color = 'white';
        resultDiv.style.fontSize = '44px';
    } else {
        console.log('bad');
        resultDiv.innerHTML = 'Please correct errors.';
        resultDiv.style.color = 'red';
        resultDiv.style.fontSize = '20px';
    }

    return false;
}

const handleClear = () => {
    const data = document.forms['calc-form'];
    const divData = [
        [data['hundred-input'], 'hundred-error'],
        [data['fifty-input'], 'fifty-error'],
        [data['twenty-input'], 'twenty-error'],
        [data['ten-input'], 'ten-error'],
        [data['five-input'], 'five-error'],
        [data['single-input'], 'single-error'],
        [data['quarter-input'], 'quarter-error'],
        [data['dime-input'], 'dime-error'],
        [data['nickel-input'], 'nickel-error'],
        [data['penny-input'], 'penny-error']
    ];
    for (let i=0; i < divData.length; i++) {
        let messageDiv = document.getElementById(`${divData[i][1]}`);
        divData[i][0].value = '';
        resultDiv.innerHTML = '';
        messageDiv.style.display = 'none';
    }
}