function separator(timesRepeat, line) {
  if (timesRepeat > 20) {
    return '_';
  }

  return line + separator(++timesRepeat, "_-_-_-");
}

function spaces(timesRepeat, whiteSpace) {
  if (timesRepeat === 0) {
    return '';
  }

  return whiteSpace + spaces(--timesRepeat, " ");
}

function turnsLeft(lives) {
  if (lives < 1) {
    return '';
  }

  return "❤️ " + turnsLeft(lives - 1);
}

function replace(char, matchWith, index) {
  if (index === matchWith.length) {
    return "_";
  }

  if (char === matchWith[index]) {
    return char;
  }

  return replace(char, matchWith, ++index);
}

function encryptWord(wordLength, word, matchWith) {
  if (wordLength === word.length) {
    return "";
  }

  const char = word[wordLength];

  return replace(char, matchWith, 0) + encryptWord(++wordLength, word, matchWith);
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
      return " ❤️ ❤️ ❤️ Fabulous!!!❤️ ❤️ ❤️";
    case 2:
      return " ❤️ ❤️ ❤️ Awesome!!!❤️ ❤️ ❤️";
    case 3:
      return " ❤️ ❤️ ❤️ Well Done!!!❤️ ❤️ ❤️";
    case 4:
      return " ❤️ ❤️ ❤️ Wonderful!!!❤️ ❤️ ❤️";
    case 5:
      return " ❤️ ❤️ ❤️ Fantastic!!!❤️ ❤️ ❤️";
  }
}

function wordSelect1(wordNumber) {
  console.log("Hint: Professions")
  switch (wordNumber) {
    case 1:
      return "psychologists";
    case 2:
      return "designer";
    case 3:
      return "cashier";
    case 4:
      return "receptionist";
    case 5:
      return "analyst";
  }
}

function wordSelect2(wordNumber) {
  console.log("Hint: Sports/ Games/ Adventurous Activities ")
  switch (wordNumber) {
    case 1:
      return "badminton";
    case 2:
      return "paragliding";
    case 3:
      return "soccer";
    case 4:
      return "bowling";
    case 5:
      return "gymnastics";
  }
}

function wordSelect3(wordNumber) {
  console.log("Hint: Food")
  switch (wordNumber) {
    case 1:
      return "zucchini";
    case 2:
      return "waffle";
    case 3:
      return "hamburger";
    case 4:
      return "granola";
    case 5:
      return "Cranberry";
  }
}

function wordSelect4(wordNumber) {
  console.log("Hint: Animals/ Birds/ Reptiles")
  switch (wordNumber) {
    case 1:
      return "leopard";
    case 2:
      return "caterpillar";
    case 3:
      return "dragonfly";
    case 4:
      return "flamingo";
    case 5:
      return "squirrel";
  }
}

function wordSelect5(wordNumber) {
  console.log("Hint: Flower")
  switch (wordNumber) {
    case 1:
      return "daffodils";
    case 2:
      return "hibiscus";
    case 3:
      return "dandelion";
    case 4:
      return "daisy";
    case 5:
      return "lavender";
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

function selectWord() {
  const wordSetNum = Math.round((Math.random() * 4) + 1);
  const wordNum = Math.round((Math.random() * 4) + 1);

  return wordSetSelect(wordSetNum, wordNum);
}

function guessChar(lives) {
  if (lives === 0) {
    return "Ohho, You lost!!!\n TRY AGAIN!!!\nBetter Luck Next Time!!!"
  }
  const char = prompt("Guess the letter!!!");
  return char;
}

function startGame() {
  return confirm("Do you want to play?");
}

function play(chance, word, char, lives, originalWord, line) {
  let format = spaces(51, " ");
  if (chance === 0) {
    originalWord = display(word, char);
    console.log(format + "\t" + originalWord + format + "\n\n\n");
  }

  if (lives === 0) {
    console.clear();
    console.log("The word is: " + word);
    return "\n\n\n" + format + "Ohho, You lost!!!\n" + format + "TRY AGAIN!!!\n" + format + "Better Luck Next Time!!!"
  }

  if (!isUnderscores(originalWord, 0)) {
    const wordNum = Math.round(Math.random() * 4 + 1);
    console.clear();
    console.log("The word is: " + word);
    return "   " + praise(wordNum) + "\n" + format + " 🏆 🏆 🏆 You Win!!!🏆 🏆 🏆\n\n" + line;
  }

  char += guessChar(lives);
  console.clear();
  const newWord = display(word, char);

  if (originalWord === newWord) {
    --lives;
    console.log("\n\n\n" + format + "Ohho, incorrect letter entered!!!\n");
  }

  console.log("\n\n" + line + "\n\n" + format + "Lives Remaining: " + turnsLeft(lives) + format + "\n\n" + line + "\n");
  console.log(format + "\t" + newWord + format + "\n\n\n");
  return play(++chance, word, char, lives, newWord, line);
}

function display(word, char) {
  return encryptWord(0, word, "aeiou" + char)
}

function offerAgain(line, format) {
  console.clear();
  if (startGame()) {
    console.clear();
    const word = selectWord();
    console.log("\n\n" + line + "\n\n" + format + "Lives Remaining: " + turnsLeft(4) + format + "\n" + line + "\n\n");
    console.log("\n\n" + line + "\n\n" + format + play(0, word, "", 4, "", line));
  console.log("\n\n\n\n\n");
    prompt("press 'Enter' to continue!!!");
    return offerAgain(line, format);
  }

  console.clear();
  format = spaces(46, " ");
  const exit = format + "🫡 🙇‍♀️ ....See You Again!!!....🙇‍♀️ 🫡"
  format = spaces(48, " ");
  const greet = format + "🙏 ....Have A Nice Day!!!.... 🙏"
  return line + "\n" + exit + "\n" + greet + "\n\n" + line;
}

function guidelines() {
  const rule1 = "1. All the vowels are already displayed...";
  const rule2 = "2. Once you have entered one letter, all it's occrences will be replaced...";
  const rule3 = "3. Any letter once entered will be incorrect if entered again...";
  const rule4 = "4. You will get 4 lives to begin with...";
  const rule5 = "5. With each incorrect guess, one life will be deducted...";
  const rule6 = "6. You will win if you guess the word before you ran out of the lives...";
  const rule7 = "7. You will lose the game if you ran out of the lives...";

  const list1 = rule1 + "\n" + rule2 + "\n" + rule3 + "\n" + rule4 + "\n";
  const list2 = rule5 + "\n" + rule6 + "\n" + rule7 + "\n";

  return list1 + list2;
}

function welcoming() {
  console.clear();
  const welcome = "Welcome to Game Zone!!!";
  const game = "GUESS THE WORD!";
  const line = separator(0, "_-_-_-");
  let format = spaces(52, " ");
  console.log("\n" + line + "\n\n" + format + welcome + format);
  format = spaces(56, " ");
  console.log("\n\n" + line + "\n\n" + format + game + format);
  format = spaces(58, " ");
  console.log("\n\n" + line + "\n\n" + format + "GUIDELINES!\n\n" + guidelines() + format + "\n\n");

  format = spaces(50, " ");
  if (!confirm(line + "\n\n" + format + "Are you ready to play?")) {
    console.clear();
    format = spaces(16, " ");
    const exit = format + "🫡 🙇‍♀️ ....Ohho, We would like to see you again!!!....🙇‍♀️ 🫡";
    format = spaces(24, " ");
    const greet = format + "🙏 ....Have A Nice Day!!!.... 🙏"
    return exit + "\n" + greet;
  }

  console.clear();

  const word = selectWord();
  console.log("\n\n" + line + "\n\n" + format + "Lives Remaining: " + turnsLeft(4) + "\n\n" + line + "\n\n");
  console.log("\n\n" + line + "\n\n" + format + play(0, word, "", 4, "", line));
  console.log("\n\n\n\n\n");
  prompt("press 'Enter' to continue!!!");
  return offerAgain(line, format);
}

console.log(welcoming());
