let convertBtn = document.getElementById("conversion");
// 所得金額欄位
let quotation = document.getElementById("amount");
// 實得金額欄位
let netIncome = document.getElementById("netIncome");
let personalTax = document.getElementById("personalTax");
let healthTax = document.getElementById("healthTax");
let healthTaxValue = document.getElementById("healthTaxValue");
let personalTaxValue = document.getElementById("personalTaxValue");

// 扣除額小數
let deduction = 0;
// 方向選擇 ture=所得 flase = 實得
let CalculateDirection = 0;
// 方向Icon
let DirectionBtn = document.getElementById("DirectionIcon");

// 按下計算方向按鈕
DirectionBtn.addEventListener("click", () => {
  // 偶數往下 基數往上
  if (CalculateDirection % 2 == 0) {
    DirectionBtn.classList.add("IconRotate");
    quotation.classList.remove("Useing");
    netIncome.classList.add("Useing");
  } else {
    DirectionBtn.classList.remove("IconRotate");
    quotation.classList.add("Useing");
    netIncome.classList.remove("Useing");
  }
  CalculateDirection++;
});

// 按下計算
convertBtn.addEventListener("click", () => {
  // 計算扣除%數多少
  deduction =
    1 -
    (percentageToDecimal(personalTax.value) +
      percentageToDecimal(healthTax.value));
  // 判斷用哪一種方法計算
  if (CalculateDirection % 2 == 0) {
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
