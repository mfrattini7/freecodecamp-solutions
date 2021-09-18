function palindrome(str) {
  let str = stripNonCharacters(str.toLowerCase());
  for (let i = 0; i < str.length; i++) {
    if (str[i] != str[str.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

function stripNonCharacters(str) {
  return str.replace(/[^0-9a-z]/gi, "");
}