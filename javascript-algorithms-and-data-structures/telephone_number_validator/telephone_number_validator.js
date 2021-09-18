function telephoneCheck(str) {
  if (
    containsForbiddenCharacters(str) ||
    !validFirstCharacter(str[0]) ||
    !balancedBrackets(str) ||
    !bracketsAllowed(str) ||
    tooManyGroups(str)
  ) {
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

// a phone number can contain only numbers and [" ", "-", "(", ")"]
function containsForbiddenCharacters(str) {
  const regex = new RegExp("[^(0-9\\s-\\(\\))]");
  return regex.test(str);
}

// the first character can be only a number or "("
function validFirstCharacter(char) {
  const regex = new RegExp("[0-9\\(]");
  return regex.test(char);
}

// all "(" and ")" must be balanced
function balancedBrackets(str) {
  let stack = [];
  for (let char of str) {
    if (char == "(") {
      stack.push(char);
    } else if (char == ")") {
      if (stack.length == 0) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.length == 0;
}

// if present, brackets must contain 3 chars
function bracketsAllowed(str) {
  let open_bracket_idx = str.search("\\(");
  let closed_bracket_idx = str.search("\\)");
  if (open_bracket_idx == -1 || closed_bracket_idx == -1) {
    return true;
  }
  if (closed_bracket_idx - open_bracket_idx == 4) {
    return true;
  }
  return false;
}

// splitting over separators cannot produce more than 4 elements
function tooManyGroups(str) {
  return str.replaceAll("-", " ").split(" ").length > 4
}

function keepOnlyNumbers(str) {
  const regex = new RegExp("[0-9]");
  return str.split("").filter((char) => regex.test(char));
}

telephoneCheck("555-555-5555");