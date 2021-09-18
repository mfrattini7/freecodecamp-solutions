function telephoneCheck(str) {
  if (containsForbiddenCharacters(str)) {
    return false;
  }
  if (!validFirstCharacter(str[0])) {
    return false;
  }
  if (!balancedBrackets(str)) {
    return false;
  }

  str = keepOnlyNumbers(str);
  if (str.length == 10) {
    return true;
  }
  if (str.length == 11 && str[0] == "1") {
    return true;
  }
  return false;
}

function containsForbiddenCharacters(str) {
  const regex = new RegExp("[^(0-9\\s-\\(\\))]");
  return regex.test(str);
}

function validFirstCharacter(char) {
  const regex = new RegExp("[0-9\\(]");
  return regex.test(char);
}

function balancedBrackets(str) {
  let stack = [];
  for (char of str) {
    if (char == "(") {
      stack.push(char);
    } else if (char == ")") {
      stack.pop();
    }
  }
  return stack.length == 0;
}

function keepOnlyNumbers(str) {
  const regex = new RegExp("[0-9]");
  return str.split("").filter((char) => regex.test(char));
}

telephoneCheck("555-555-5555");