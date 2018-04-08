var acctInfo;

$(function() {

  $("#centerContentButton").click(function() {
    incrementDay();
  });

  $("#eventModalClose").click(function(){
    $("#eventModal").toggleClass("hidden");
    $("#screenCover").toggleClass("hidden");
  });
});

function setupAccount() {
  acctInfo = getUserThings(acctInfo);
  console.log(acctInfo);
  updateInfo(acctInfo);
}

function updateInfo(acctInfo) {
  $("#profileStatusContent").html(acctInfo["status"]);
  $("#profileEmploymentContent").html(acctInfo.employment);
  $("#profileDependantsContent").html(acctInfo.dependants);
  $("#profileHousingContent").html(acctInfo.housing);
  $("#leftBarContentProfileBalanceContent").html("$" + acctInfo.balance.toFixed(2));

  updateAssets();
  updateExpenses();
  updateAllTransactions();
}

function updateAssets() {
  $("#rightBarContentAssetsContent").html("");
  var assets = acctInfo.assets;
  for (var i = 0; i < assets.length; i++) {
    var assetItem = $("<div></div>");
    assetItem.attr("id", "asset" + centerContentTransactionLogContent.childElementCount);
    assetItem.attr("class", "assetItem");
    var assetItemFreq = $("<div></div>");
    assetItemFreq.attr("class", "assetItemFreq");

    if (assets[i].frequency == 1) {
      assetItemFreq.html("Daily");
    } else if (assets[i].frequency % 30 == 0) {
      if ((assets[i].frequency / 30) == 1) {
        assetItemFreq.html("Monthly");
      } else {
        assetItemFreq.html((assets[i].frequency / 30) + " months");
      }
    } else if (assets[i].frequency % 7 == 0) {
      if ((assets[i].frequency / 7) == 1) {
        assetItemFreq.html("Weekly");
      } else {
        assetItemFreq.html((assets[i].frequency / 7) + " weeks");
      }
    } else {
      assetItemFreq.html(assets[i].frequency + " days");
    }

    var assetItemDesc = $("<div></div>");
    assetItemDesc.attr("class", "assetItemName");
    assetItemDesc.html(assets[i].name);
    var assetItemMoney = $("<div></div>");
    assetItemMoney.attr("class", "assetItemMoney");
    assetItemMoney.html("$" + assets[i].gain.toFixed(2));

    assetItem.append(assetItemDesc);
    assetItem.append(assetItemMoney);
    assetItem.append(assetItemFreq);
    $("#rightBarContentAssetsContent").append(assetItem);
  }
}

function updateExpenses() {
  $("#rightBarContentExpensesContent").html("");
  var expenses = acctInfo.expenses;
  for (var i = 0; i < expenses.length; i++) {
    var expenseItem = $("<div></div>");
    expenseItem.attr("id", "expense" + centerContentTransactionLogContent.childElementCount);
    expenseItem.attr("class", "expenseItem");
    var expenseItemFreq = $("<div></div>");
    expenseItemFreq.attr("class", "expenseItemFreq");

    if (expenses[i].frequency == 1) {
      expenseItemFreq.html("Daily");
    } else if (expenses[i].frequency % 30 == 0) {
      if ((expenses[i].frequency / 30) == 1) {
        expenseItemFreq.html("Monthly");
      } else {
        expenseItemFreq.html((expenses[i].frequency / 30) + " months");
      }
    } else if (expenses[i].frequency % 7 == 0) {
      if ((expenses[i].frequency / 7) == 1) {
        expenseItemFreq.html("Weekly");
      } else {
        expenseItemFreq.html((expenses[i].frequency / 7) + " weeks");
      }
    } else {
      expenseItemFreq.html(expenses[i].frequency + " days");
    }

    var expenseItemDesc = $("<div></div>");
    expenseItemDesc.attr("class", "expenseItemName");
    expenseItemDesc.html(expenses[i].name);
    var expenseItemMoney = $("<div></div>");
    expenseItemMoney.attr("class", "expenseItemMoney");
    expenseItemMoney.html("$" + expenses[i].loss.toFixed(2));

    expenseItem.append(expenseItemDesc);
    expenseItem.append(expenseItemMoney);
    expenseItem.append(expenseItemFreq);
    $("#rightBarContentExpensesContent").append(expenseItem);
  }
}

function updateAllTransactions(){
  $("#centerContentTransactionLogContent").html("");
  var transaction = acctInfo.transaction;
  for (var i = 0; i < transaction.length; i++) {
    viewTransaction(transaction[i]);
  }
}

function incrementDay() {
  acctInfo.day++;
  var prob = Math.random();
  var prob2 = Math.random();
  if (Math.abs(prob - prob2).toFixed(1) <= 0.1) {
    console.log("EVENT");
    $("#eventModal").toggleClass("hidden");
    $("#screenCover").toggleClass("hidden");
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
    transaction.type = "DEPOSIT";
  } else {
    transaction.type = "WITHDRAWAL";
  }
  acctInfo.transaction.push(transaction);
}

function viewTransaction(order) {
  var transaction = $("<div></div>");
  transaction.attr("id", "transaction" + centerContentTransactionLogContent.childElementCount);
  transaction.attr("class", "transactionItem");
  var transactionType = $("<div></div>");
  transactionType.attr("class", "transactionItemType");
  transactionType.html(order.type);
  var transactionDesc = $("<div></div>");
  transactionDesc.attr("class", "transactionItemDesc");
  transactionDesc.html(order.desc);
  var transactionMoney = $("<div></div>");
  transactionMoney.attr("class", "transactionItemMoney");
  transactionMoney.html("$" + order.money.toFixed(2));

  transaction.append(transactionType);
  transaction.append(transactionDesc);
  transaction.append(transactionMoney);
  $("#centerContentTransactionLogContent").append(transaction);
}
