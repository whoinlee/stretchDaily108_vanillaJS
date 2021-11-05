const resultHolder = document.getElementById("result");
const lengthSetting = document.getElementById("length");
const uppercaseSetting = document.getElementById("uppercase");
const lowercaseSetting = document.getElementById("lowercase");
const numbersSetting = document.getElementById("numbers");
const symbolsSetting = document.getElementById("symbols");
const randomFunc = {
  upper: getRandomUpper,
  lower: getRandomLower,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

const generateBtn = document.getElementById("generate");
const clipboardBtn = document.getElementById("clipboard");
//
generateBtn.addEventListener("click", () => {
  const length = +lengthSetting.value; //-- to number
  const hasUpper = uppercaseSetting.checked; //-- 1 or 0
  const hasLower = lowercaseSetting.checked;
  const hasNumber = numbersSetting.checked;
  const hasSymbol = symbolsSetting.checked;
  resultHolder.innerText = generatePassword(
    length,
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol
  );
});
clipboardBtn.addEventListener("click", () => {
  const password = resultHolder.innerText;

  if (!password) return;
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(password);
    return;
  }

  navigator.clipboard.writeText(password).then(
    function () {
      alert("Password copied to clipboard!");
    },
    function (err) {
      alert("Could not copy password: ", err);
    }
  );
});

function fallbackCopyTextToClipboard(text) {
  const textarea = document.createElement("textarea");
  const password = text;

  textarea.value = password;
  document.body.appendChild(textarea);
  //-- copy to the clipboard *****
  textarea.select();
  document.execCommand("copy"); //*****/
  window.getSelection();
  textarea.remove();
  //------------------------ *****

  alert("Password copied to clipboard!!!");
}

function generatePassword(length, upper, lower, number, symbol) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  // console.log("typesCount:", typesCount)
  //-- filtering only the true category
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  ); //***********/

  if (typesCount === 0) return "";
  for (let i = 0; i < length; i += typesCount) {
    shuffle(typesArr);
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0]; //***********/
      console.log("funcName?? ", funcName);
      generatedPassword += randomFunc[funcName]();
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
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  //-- While there remain elements to shuffle...
  while (currentIndex != 0) {
    //-- Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    //-- And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
