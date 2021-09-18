const shift_size = 13;
const first_letter_code = "A".charCodeAt();
const last_letter_code = "Z".charCodeAt();
const alphabet_size = last_letter_code - first_letter_code + 1;

function rot13(str) {
  return str.split("")
    .map((it) => it.charCodeAt())
    .map((it) => shiftChar(it))
    .map((it) => String.fromCharCode(it))
    .join("");
}

function shiftChar(num) {
  if (!isUppercaseLetterCode(num)) {
    return num;
  }
  return first_letter_code + (num - first_letter_code + shift_size) % alphabet_size;
}

function isUppercaseLetterCode(num) {
  return (first_letter_code <= num)  && (num <= last_letter_code);
}

rot13("SERR PBQR PNZC");