const buttons = document.querySelectorAll(".seatRow > button");
const selectedSeat = document.getElementById("selectedSeat");
const selectedSeatCouterDisplay = document.getElementById( "selectedSeatCouterDisplay");
const availbleSeat = document.getElementById("availbleSeat");
const emptyMessage = document.getElementById("emptyMessage");
const totalPriceField = document.getElementById("totalPrice");
const cuoponInputField = document.getElementById("couponField");
const cuoponBtn = document.getElementById("cuoponApplyBtn");



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
