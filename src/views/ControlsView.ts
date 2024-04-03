const decrementBtn = document.querySelector("#dcr-btn");
const IncrementBtn = document.querySelector("#incr-btn");

export function addDecrementBtnHandler(handler: () => void) {
  decrementBtn?.addEventListener("click", handler);
}

export function addIncrementBtnHandler(handler: () => void) {
  IncrementBtn?.addEventListener("click", handler);
}
