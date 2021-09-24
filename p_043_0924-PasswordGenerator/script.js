const resultHolder = document.getElementById('result');
//
const lengthSetting = document.getElementById('length');
const uppercaseSetting = document.getElementById('uppercase');
const lowercaseSetting = document.getElementById('lowercase');
const numbersSetting = document.getElementById('numbers');
const symbolsSetting = document.getElementById('symbols');
//
const generateBtn = document.getElementById('generate');
const clipboardBtn = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

generateBtn.addEventListener('click', () => {
    const length = +lengthSetting.value;
    const hasUpper = uppercaseSetting.checked;
    const hasLower = lowercaseSetting.checked;
    const hasNumber = numbersSetting.checked;
    const hasSymbol = symbolsSetting.checked;
    resultHolder.innerText = generatePassword(length, hasUpper, hasLower, hasNumber, hasSymbol);
});
clipboardBtn.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultHolder.innerText;

    if(!password) { return }

    textarea.value = password;
    document.body.appendChild(textarea);
    //-- copy to the clipboard *****
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    //------------------------ *****
    alert('Password copied to clipboard!');
});

function generatePassword(length, upper, lower, number, symbol) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
    
    if(typesCount === 0) {
        return ''
    };

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}