function turnsLeft(lives) {
  if (lives < 1) {
    return '';
  }

  return "❤️ " + turnsLeft(lives - 1);
}

function charMatch(char, matchWith, index) {
  if (index === matchWith.length) {
    return "_";
  }

  if (char === matchWith[index]) {
    return char;
  }

  return charMatch(char, matchWith, ++index);
}

function encryptWord(wordLength, word, matchWith) {
  if (wordLength === word.length) {
    return "";
  }

  const char = word[wordLength];

  return charMatch(char, matchWith, 0) + encryptWord(++wordLength, word, matchWith);
}

function isUnderscores(encryptedWord, index) {
  if (index === encryptedWord.length) {
    return false;
  }

  if (encryptedWord[index] === "_") {
    return true;
  }

  return isUnderscores(encryptedWord, ++index);
}

function praise(number) {
  switch (number) {
    case 1:
      return "Fabulous!!!";
    case 2:
      return "Awesome!!!";
    case 3:
      return "Well Done!!!";
    case 4:
      return "Wonderful!!!";
    case 5:
      return "Fantastic!!!";
  }
}

function wordSelect1(wordNumber) {
  switch (wordNumber) {
    case 1:
      return "security";
    case 2:
      return "tropical";
    case 3:
      return "violence";
    case 4:
      return "appendix";
    case 5:
      return "offshore";
  }
}

function wordSelect2(wordNumber) {
  switch (wordNumber) {
    case 1:
      return "badminton";
    case 2:
      return "prospect";
    case 3:
      return "occasion";
    case 4:
      return "parental";
    case 5:
      return "patience";
  }
}

function wordSelect3(wordNumber) {
  switch (wordNumber) {
    case 1:
      return "sequence";
    case 2:
      return "artistic";
    case 3:
      return "audience";
    case 4:
      return "heritage";
    case 5:
      return "precious";
  }
}

function wordSelect4(wordNumber) {
  switch (wordNumber) {
    case 1:
      return "spectrum";
    case 2:
      return "enthusiasm";
    case 3:
      return "chrysanthemum";
    case 4:
      return "republic";
    case 5:
      return "woodland";
  }
}

function wordSelect5(wordNumber) {
  switch (wordNumber) {
    case 1:
      return "warranty";
    case 2:
      return "adequate";
    case 3:
      return "concrete";
    case 4:
      return "argument";
    case 5:
      return "argument";
  }
}

function wordSetSelect(setNumber, wordNumber) {
  switch (setNumber) {
    case 1:
      return wordSelect1(wordNumber);
    case 2:
      return wordSelect2(wordNumber);
    case 3:
      return wordSelect3(wordNumber);
    case 4:
      return wordSelect4(wordNumber);
    case 5:
      return wordSelect5(wordNumber);
  }
}

function select() {
  const wordSetNum = Math.round((Math.random() * 4) + 1);
  const wordNum = Math.round((Math.random() * 4) + 1);

  return wordSetSelect(wordSetNum, wordNum);
}

function guessChar(lives) {
  if (lives === 0) {
    return "Ohho, You lost!!!\n TRY AGAIN!!!\nBetter Luck Next Time!!!"
  }
  const char = prompt("Guess the next letter!!!");
  return char;
}

function startGame() {
  return confirm("Do you want to play?");
}

function play(chance, word, char, lives, originalWord) {
  if (chance === 0) {
    originalWord = display(word, char);
    console.log(originalWord);
  }

  if (lives === 0) {
    return "Ohho, You lost!!!\n TRY AGAIN!!!\nBetter Luck Next Time!!!"
  }

  if (!isUnderscores(originalWord, 0)) {
    const wordNum = Math.round(Math.random() * 4 + 1);
    return praise(wordNum) + "\nYou Win!!!";
  }

  char += guessChar(lives);
  const newWord = display(word, char);

  lives = originalWord === newWord ? --lives : lives;
  console.log(turnsLeft(lives));
  console.log(newWord);
  return play(++chance, word, char, lives, newWord);
}

function display(word, char) {
  return encryptWord(0, word, "aeiou" + char)
}

function offerAgain() {
  if (startGame()) {
    const word = select();
    console.log(play(0, word, "", 4, ""));
    return offerAgain();
  }
  return "See You Again!!!\nHave A Nice Day!!!";
}

console.log(offerAgain());