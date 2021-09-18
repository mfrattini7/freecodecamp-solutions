function convertToRoman(num) {

  const m = new Map();
 
  m.set(1000, "M");
  m.set(900, "CM");

  m.set(500, "D");
  m.set(400, "CD");

  m.set(100, "C");
  m.set(90, "XC");

  m.set(50, "L");
  m.set(40, "XL");

  m.set(10, "X");
  m.set(9, "IX");

  m.set(5, "V");
  m.set(4, "IV");

  m.set(1, "I");
  
  let str = "";
  for (let [key, val] of m) {
    let {result, remainder} = integerDivision(num, key);
    str += repeatString(val, result);
    num = remainder;
  }

  return str;
}

function integerDivision(num, divider) {
  let remainder = num % divider;
  let result = (num - remainder) / divider;
  return {
    "result": result,
    "remainder": remainder
  };
}

function repeatString(str, times) {
  let result = "";
  for (let i = 0; i < times; i++) {
    result += str;
  }
  return result;
}

convertToRoman(36);