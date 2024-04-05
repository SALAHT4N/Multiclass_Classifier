import { Group } from "../models/Point";

const decrementBtn = document.querySelector("#dcr-btn");
const IncrementBtn = document.querySelector("#incr-btn");
const groupsSelect = document.querySelector(
  "#groups-select"
) as HTMLSelectElement;
const startBtn = document.querySelector("#start-button");
const clearBtn = document.querySelector("#clear-button");
const learningRateNumInput = document.querySelector(
  "#lrnrt-input"
) as HTMLInputElement;
const numberOfEpochsInput = document.querySelector(
  "#epochs-input"
) as HTMLInputElement;

export function addDecrementBtnHandler(handler: () => void) {
  decrementBtn?.addEventListener("click", handler);
}

export function addIncrementBtnHandler(handler: () => void) {
  IncrementBtn?.addEventListener("click", handler);
}

export function updateSelectGroupsInput(groups: Group[]) {
  while (groupsSelect?.firstChild) {
    groupsSelect.removeChild(groupsSelect.firstChild);
  }

  groups.forEach((group): void => {
    const newOption = document.createElement("option");
    newOption.text = group;
    groupsSelect?.appendChild(newOption);
  });
}

export function addSelectGroupsHasChangedHandler(
  handler: (group: Group) => void
) {
  groupsSelect?.addEventListener("change", () => {
    var selectedOption = groupsSelect.options[groupsSelect.selectedIndex].text;
    handler(selectedOption as Group);
  });
}

export function clearStartButtonToggle(): void {
  clearBtn?.classList.toggle("hidden");
  startBtn?.classList.toggle("hidden");
}

export function addStartButtonClickedHandler(handler: () => void) {
  startBtn?.addEventListener("click", handler);
}

export function addClearButtonClickedHandler(handler: () => void): void {
  clearBtn?.addEventListener("click", handler);
}

export function getLearningAlgorithmParamters(): {
  learningRate: number;
  epochs: number;
} {
  return {
    learningRate: +learningRateNumInput!.value || 1,
    epochs: +numberOfEpochsInput!.value || 2,
  };
}
