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

// 輸入金額_限制只能輸入正整數 + 千分位數
const InputAmount = document.querySelectorAll(".OnlyNumberAndComma");
InputAmount.forEach((item) => {
  item.addEventListener("input", () => {
    // 千分位轉換
    const numberWithCommas = NumberWithCommas(RealNumber(item.value));
    item.value = numberWithCommas;
  });
});

//限制只能是正整數
const OnlyNumber = document.querySelector(".OnlyNumber");
OnlyNumber.addEventListener("input", () => {
  OnlyNumber.value = RealNumber(OnlyNumber.value);
});

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
convertBtn.addEventListener("click", FindYourMoney);
// Enter
document.addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    FindYourMoney();
  }
});

// 主要計算程式
function FindYourMoney() {
  // 計算扣除%數多少
  deduction = 1 - (ToDecimal(personalTax.value) + ToDecimal(healthTax.value));
  const CalculateIsTop = quotation.classList.contains("Useing");
  // 判斷用哪一種方法計算
  if (CalculateIsTop) {
    TaxToIncome();
  } else {
    IncomeToTax();
  }
}

// 稅前金額換算成實拿金額
function TaxToIncome() {
  //判斷是否超過2萬要扣稅
  const N_quotation = RealNumber(quotation.value);
  if (N_quotation > 20000) {
    netIncome.value = NumberWithCommas(PayTaxes(N_quotation));
    personalTaxValue.innerHTML =
      "-" +
      NumberWithCommas(Math.round(N_quotation * ToDecimal(personalTax.value)));
    healthTaxValue.innerHTML =
      "-" +
      NumberWithCommas(Math.round(N_quotation * ToDecimal(healthTax.value)));
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
  const N_netIncome = RealNumber(netIncome.value);
  AfterTax = Math.round(N_netIncome / deduction);
  if (AfterTax > 20000) {
    quotation.value = NumberWithCommas(AfterTax);
    personalTaxValue.innerHTML =
      "-" +
      NumberWithCommas(
        Math.round(RealNumber(quotation.value) * ToDecimal(personalTax.value))
      );
    healthTaxValue.innerHTML =
      "-" +
      NumberWithCommas(
        Math.round(RealNumber(quotation.value) * ToDecimal(healthTax.value))
      );
  } else {
    quotation.value = netIncome.value;
    personalTaxValue.innerHTML = 0;
    healthTaxValue.innerHTML = 0;
  }
}

//判斷是否有在保證明
const ProveRadio = document.querySelectorAll('input[name="prove"]');
ProveRadio.forEach((item) => {
  this.addEventListener("click", () => {
    if (item.checked && item.value == 0) {
      healthTax.value = 2.11;
    } else {
      healthTax.value = 0;
    }
  });
});

//換算百分比
function ToDecimal(percentage) {
  return percentage / 100;
}

//限制輸入正整數 string 轉成 number
function RealNumber(x) {
  return Number(x.replace(/\D/g, "").replace(/^0+/, ""));
}

//轉成千分位
function NumberWithCommas(x) {
  return x.toLocaleString("en-US");
}
