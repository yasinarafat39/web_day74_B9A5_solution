const buttons = document.querySelectorAll(".seatRow > button");
const selectedSeat = document.getElementById("selectedSeat");
const selectedSeatCouterDisplay = document.getElementById(
  "selectedSeatCouterDisplay"
);
const availbleSeat = document.getElementById("availbleSeat");
const emptyMessage = document.getElementById("emptyMessage");
const totalPriceField = document.getElementById("totalPrice");
const cuoponInputField = document.getElementById("couponField");
const cuoponBtn = document.getElementById("cuoponApplyBtn");
const grandTotalPriceField = document.getElementById("grandTotal");
const totalSavingAmountField = document.getElementById("total&SavingAmount");

const selectedSeatCount = [];
for (singleSeat of buttons) {
  singleSeat.addEventListener("click", function (event) {
    if (selectedSeatCount.includes(event.target.innerText)) {
      return alert("This seat already booked. Please select another one.");
    } else if (selectedSeatCount.length >= 4) {
      return alert("Maximum seat booked.");
    } else {
      const clickedSeat = event.target;
      clickedSeat.classList.add("bg-primary");
      clickedSeat.classList.add("text-white");
      selectedSeatCount.push(event.target.innerText);
      console.log(selectedSeatCount);

      // ------------- increase selected seat count --------------
      selectedSeatCouterDisplay.innerText = selectedSeatCount.length;

      // ------------------ decrease available seat count from bus information card ------------------
      const totalSeat = parseFloat(availbleSeat.innerText);
      const newTotalSeat = totalSeat - 1;
      availbleSeat.innerText = newTotalSeat;

      // ----------------- add seat to calculate part ----------------
      console.log(selectedSeat);
      const div = document.createElement("div");
      div.className =
        "flex justify-between text-sm text-secondary2 font-medium";
      console.log(div);
      div.innerHTML = ` 
        <p>${event.target.innerText}</p>
        <p>Economy</p>
        <p id="price">550</p> 
        `;
      selectedSeat.appendChild(div);

      // ------------------- hide the Empty Error message -------------------
      console.log(emptyMessage);
      emptyMessage.classList.add("hidden");

      // ------------------------ calculate total price --------------------------
      const newTotalPrice = 550 * selectedSeatCount.length;
      totalPriceField.innerText = newTotalPrice.toFixed(2);

      // ----------------------- Coupon apply -----------------------------
      if (selectedSeatCount.length > 3) {
        cuoponInputField.removeAttribute("disabled");
        cuoponBtn.removeAttribute("disabled");
      }
    }
  });
}

// coupon handle
cuoponBtn.addEventListener("click", function () {
  const couponValue = cuoponInputField.value;
  let savingAmount = 0;

  if (couponValue === "NEW50") {
    // 50% discount
    const totalPrice = parseFloat(totalPriceField.innerText);
    const discountedAmount50 = totalPrice * 0.5;
    const AfterDiscountAmount = (totalPrice - discountedAmount50).toFixed(2);
    grandTotalPriceField.innerText = AfterDiscountAmount;
    savingAmount = discountedAmount50;
    cuoponInputField.value = "";
    alert("Congratulations! You got 50% discount.");
  } else if (couponValue === "COUPON20") {
    // 20% discount
    const totalPrice = parseFloat(totalPriceField.innerText);
    const discountedAmount20 = totalPrice * 0.2;
    const AfterDiscountAmount = (totalPrice - discountedAmount20).toFixed(2);
    grandTotalPriceField.innerText = AfterDiscountAmount;
    savingAmount = discountedAmount20;
    cuoponInputField.value = "";
    alert("Congratulations! You got 20% discount.");
  } else {
    // error (invalid coupon)
    alert("Your Provided Coupon is not valid");
    cuoponInputField.value = "";
    return;
  }

  const div = document.createElement("div");
  div.className = "font-medium flex justify-between";
  div.innerHTML = `
    <p>Discount</p>
    <p>
      <span>-BDT: </span>
      <span>${savingAmount}</span>
    </p>
  `;
  totalSavingAmountField.appendChild(div);
});

// submit ticket
document.getElementById("continueBtn").addEventListener("click", function (event) {

  event.preventDefault();

  const passengerName = document.getElementById("passengerName");
  const passengerPhone = document.getElementById("passengerPhone");
  const passengerEmail = document.getElementById("passengerEmail");

  console.log(passengerName.value, passengerPhone.value, passengerEmail.value);
});
