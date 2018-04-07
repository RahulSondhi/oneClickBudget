var acctInfo;

$(function() {

  setupAccount();

  $("#centerContentButton").click(function() {
    incrementDay();
  });

});

function setupAccount() {
  acctInfo = [];
  acctInfo.status = "Single";
  acctInfo.employment = "Employed";
  acctInfo.dependants = "none";
  acctInfo.housing = "none";
  acctInfo.balance = 100.10;
  acctInfo.assets = [{
    name: "Job",
    gain: 50.30,
    frequency: 7
  }];
  acctInfo.expenses = [{
    name: "Food",
    loss: 4.00,
    frequency: 1
  }];
  acctInfo.transaction = [];
  acctInfo.day = 0;
  updateInfo();
}

function updateInfo() {
  console.log(acctInfo);
  $("#profileStatusContent").html(acctInfo.status);
  $("#profileEmploymentContent").html(acctInfo.employment);
  $("#profileDependantsContent").html(acctInfo.dependants);
  $("#profileHousingContent").html(acctInfo.housing);
  $("#leftBarContentProfileBalanceContent").html("$" + acctInfo.balance.toFixed(2));
}

function incrementDay() {
  acctInfo.day++;
  var prob = Math.random();
  var prob2 = Math.random();
  if (Math.abs(prob - prob2).toFixed(1) <= 0.1) {
    console.log("EVENT");
  }
  addAssets();
  removeExpenses();
  updateInfo();
}

function addAssets() {
  var assets = acctInfo.assets;
  for (var i = 0; i < assets.length; i++) {
    if (acctInfo.day % assets[i].frequency == 0) {
      acctInfo.balance = acctInfo.balance + assets[i].gain;
      updateTransactions(true, assets[i].gain, assets[i].name);
    }
  }
}

function removeExpenses() {
  var expenses = acctInfo.expenses;
  for (var i = 0; i < expenses.length; i++) {
    if (acctInfo.day % expenses[i].frequency == 0) {
      acctInfo.balance = acctInfo.balance - expenses[i].loss;
      updateTransactions(false, expenses[i].loss, expenses[i].name);
    }
  }
}

function updateTransactions(add, money, desc) {
  var transaction = [];
  transaction.money = money;
  transaction.desc = desc;
  if (add) {
    transaction.type = "deposit";
  } else {
    transaction.type = "withdrawal";
  }
  acctInfo.transaction.push(transaction);
  viewTransaction();
}

function viewTransaction() {

}
