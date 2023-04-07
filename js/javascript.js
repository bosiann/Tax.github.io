const convertBtn = document.getElementById("conversion");

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

// 計算方向Icon
const DirectionBtn = document.getElementById("DirectionIcon");
//.Useing 輸入值外框
//IconRotate 旋轉Icon
// 計算方向按鈕
DirectionBtn.addEventListener("click", () => {
  DirectionBtn.classList.toggle("IconRotate");
  quotation.classList.toggle("Useing");
  netIncome.classList.toggle("Useing");
  quotation.classList.toggle("disableInput");
  netIncome.classList.toggle("disableInput");
});

// 按下計算按鈕
convertBtn.addEventListener("click", () => {
  // 計算扣除%數多少
  deduction = 1 - (ToDecimal(personalTax.value) + ToDecimal(healthTax.value));
  const CalculateIsTop = quotation.classList.contains("Useing");
  // 判斷用哪一種方法計算
  if (CalculateIsTop) {
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
    personalTaxValue.innerHTML =
      Math.round(quotation.value * ToDecimal(personalTax.value)) * -1;
    healthTaxValue.innerHTML =
      Math.round(quotation.value * ToDecimal(healthTax.value)) * -1;
  } else {
    netIncome.value = quotation.value;
    personalTaxValue.innerHTML = 0;
    healthTaxValue.innerHTML = 0;
  }
}

// 超過兩萬扣稅
function PayTaxes(money) {
  AfterTax = money * deduction;
  return Math.round(AfterTax);
}

// 實拿金額換算成稅前金額
function IncomeToTax() {
  AfterTax = netIncome.value / deduction;
  quotation.value = Math.round(AfterTax);
  personalTaxValue.innerHTML =
    Math.round(quotation.value * ToDecimal(personalTax.value)) * -1;
  healthTaxValue.innerHTML =
    Math.round(quotation.value * ToDecimal(healthTax.value)) * -1;
}

//判斷是否有在保證明
const ProveRadio = document.querySelectorAll('input[name="prove"]');
let ProveCheck = false;
ProveRadio.forEach((item) => {
  this.addEventListener("click", () => {
    if (item.checked) {
      if (item.value == 0) {
        ProveCheck = false;
        healthTax.value = 2.11;
      } else {
        ProveCheck = true;
        healthTax.value = 0;
      }
    }
  });
});

//換算百分比
function ToDecimal(percentage) {
  return percentage / 100;
}
// //千位數格式
// function numberWithCommas(x) {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }
