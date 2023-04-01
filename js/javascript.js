let convertBtn = document.getElementById("conversion");
let quotation = document.getElementById("amount");
let netIncome = document.getElementById("netIncome");
let personalTax = document.getElementById("personalTax");
let healthTax = document.getElementById("healthTax");
let healthTaxValue = document.getElementById("healthTaxValue");
let personalTaxValue = document.getElementById("personalTaxValue");
let deduction = 0;

convertBtn.addEventListener("click", () => {
  // 計算扣除%數多少
  deduction =
    1 -
    (percentageToDecimal(personalTax.value) +
      percentageToDecimal(healthTax.value));
  // 判斷用哪一種方法計算
  if (quotation.value >= 1) {
    TaxToIncome();
  } else {
    IncomeToTax();
  }
});

// 稅前金額換算成實拿金額
function TaxToIncome() {
  //判斷是否超過2萬要扣稅
  if (quotation.value > 20000) {
    netIncome.value = PayTaxes(quotation.value);
  } else {
    netIncome.value = quotation.value;
  }
}

// 超過兩萬扣稅
function PayTaxes(money) {
  personalTaxValue.value =
    Math.round(quotation.value * percentageToDecimal(personalTax.value)) * -1;
  healthTaxValue.value =
    Math.round(quotation.value * percentageToDecimal(healthTax.value)) * -1;
  AfterTax = money * deduction;
  return Math.round(AfterTax);
}

// 實拿金額換算成稅前金額
function IncomeToTax() {
  AfterTax = netIncome.value / deduction;
  quotation.value = Math.round(AfterTax);
  personalTaxValue.value =
    Math.round(quotation.value * percentageToDecimal(personalTax.value)) * -1;
  healthTaxValue.value =
    Math.round(quotation.value * percentageToDecimal(healthTax.value)) * -1;
}

//換算百分比
function percentageToDecimal(percentage) {
  return percentage / 100;
}
