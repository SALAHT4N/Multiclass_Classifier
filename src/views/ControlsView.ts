import { Group } from "../models/Point";

const decrementBtn = document.querySelector("#dcr-btn");
const IncrementBtn = document.querySelector("#incr-btn");
const groupsSelect = document.querySelector(
  "#groups-select"
) as HTMLSelectElement;

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
