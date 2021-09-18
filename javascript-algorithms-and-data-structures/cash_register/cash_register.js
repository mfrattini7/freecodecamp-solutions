function checkCashRegister(price, cash, cid) {

  const valueMap = new Map();

  valueMap.set("ONE HUNDRED", 100);
  valueMap.set("TWENTY", 20);
  valueMap.set("TEN", 10);
  valueMap.set("FIVE", 5);
  valueMap.set("ONE", 1);
  valueMap.set("QUARTER", 0.25);
  valueMap.set("DIME", 0.1);
  valueMap.set("NICKEL", 0.05);
  valueMap.set("PENNY", 0.01);

  let cashback = cash - price;

  let components = [];
  for (let [name, unitValue] of valueMap) {  
    let amountAvailable = getAmountAvailable(cid, name);
    if (cashback >= unitValue) {      
      let {left, units} = calculateUnits(cashback, unitValue, amountAvailable);
      components.push([name, units * unitValue]);
      cashback = left;
    }
  }

  if (cashback > 0) {
    return {"status": "INSUFFICIENT_FUNDS", "change": []};
  }

  let leftOverCid = sub(cid, components);
  if (totalAvailable(leftOverCid) == 0) {
    return {"status": "CLOSED", "change": cid};
  }
  return {"status": "OPEN", "change": components};
}

function notEnoughMoney(cashback, cid) {
  return cashback > totalAvailable(cid);
}

function totalAvailable(cid) {
  let sum = 0;
  for (let [_, value] of cid) {
    sum += value;
  }
  return sum;
}

function getAmountAvailable(cid, name) {
  for (let item of cid) {
    if (item[0] == name) {
      return item[1];
    }
  }
}

function calculateUnits(cashback, unitValue, amountAvailable) {
  let min = cashback < amountAvailable ? cashback : amountAvailable;
  let units = Math.floor(min / unitValue);
  let left = Math.round((cashback - units * unitValue) * 100) / 100;
  return {
    "left": left,
    "units": units
  }
}

function sub(cid1, cid2) {
  let res = [];
  for (let [name1, amount1] of cid1) {
    let idx = cid2.findIndex((item) => item[0] == name1);
    if (idx == -1) {
      res.push([name1, amount1]);
    } else {
      res.push([name1, amount1 - cid2[idx][1]]);
    }
  }
  return res;
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);