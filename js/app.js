// Error Handling for input fields
const moneyManager = document.getElementById("money-manager");
moneyManager.addEventListener("keyup", function (event) {
  const values = parseFloat(event.target.value);
  const errorMsgTxt = document.getElementById("error-msg-text");
  const errorMsgNum = document.getElementById("error-msg-num");
  if (isNaN(values)) {
    errorMsgTxt.style.display = "block";
    errorMsgNum.style.display = "none";
  } else if (values < 0) {
    errorMsgNum.style.display = "block";
    errorMsgTxt.style.display = "none";
  } else {
    errorMsgTxt.style.display = "none";
    errorMsgNum.style.display = "none";
  }
});

// Get input value
function getInputValue(item) {
  const inputValue = document.getElementById(item);
  const amount = parseInt(inputValue.value);
  return amount;
}

// Get total expense amount
function expenseTotal() {
  const foodValue = getInputValue("food-button");
  const rentValue = getInputValue("rent-button");
  const clothValue = getInputValue("cloths-button");
  const expenseAmount = foodValue + rentValue + clothValue;
  return expenseAmount;
}

// Get update total expense and balance
function updateBalance() {
  const incomeAmount = getInputValue("income-button");
  const expenseAmount = expenseTotal();
  const balanceAmount = incomeAmount - expenseAmount;

  // Error Handling expense and balance
  const errorMsgExp = document.getElementById("error-msg-exp");
  const saveBtn = document.getElementById("save-btn");
  if (incomeAmount < expenseAmount) {
    errorMsgExp.style.display = "block";
    saveBtn.setAttribute("disabled", true);
    document.getElementById("expense-total").innerText = Number(expenseAmount);
    document.getElementById("balance").innerText = Number(balanceAmount);
    return balanceAmount;
  } else {
    errorMsgExp.style.display = "none";
    saveBtn.removeAttribute("disabled", true);
    document.getElementById("expense-total").innerText = Number(expenseAmount);
    document.getElementById("balance").innerText = Number(balanceAmount);
    return balanceAmount;
  }
}

// Using onclick  balance
function savingRemainBalance() {
  debugger;
  const incomeAmount = getInputValue("income-button");
  const savingPercent = getInputValue("percentage-button");
  const savingAmount = parseFloat(incomeAmount * (savingPercent / 100));
  const balanceAmount = updateBalance();

  // Error Handling for saving money and remaining balance
  const errorMsgSaveMoney = document.getElementById("error-msg-save-money");
  if (balanceAmount < 0 || balanceAmount < savingAmount) {
    errorMsgSaveMoney.style.display = "block";
    return;
  } else {
    errorMsgSaveMoney.style.display = "none";
    const remainBalance = parseFloat(balanceAmount) - parseFloat(savingAmount);
    document.getElementById("saving-amount").innerText = savingAmount;
    document.getElementById("remain-balance").innerText = remainBalance;
  }
}

// Handle total addEventListener
document.getElementById("calculate-button").addEventListener("click", function () {
  updateBalance();
});
