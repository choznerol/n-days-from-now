import {
  addDays,
  formatDate,
  parseLocalDate,
  todayString,
  PRESET_DAYS,
  WEEKDAYS_ZH,
} from "./calculator.js";

const dateInput = document.getElementById("base-date");
const resultsEl = document.getElementById("results");
const customInput = document.getElementById("custom-days");
const customBtn = document.getElementById("custom-add");
const customList = document.getElementById("custom-list");
const baseWeekday = document.getElementById("base-weekday");

let extraDays = [];

// Set default date to today
dateInput.value = todayString();

function render() {
  const base = parseLocalDate(dateInput.value);
  baseWeekday.textContent = `（${WEEKDAYS_ZH[base.getDay()]}）`;
  const allDays = [...PRESET_DAYS, ...extraDays].sort((a, b) => a - b);

  resultsEl.innerHTML = allDays
    .map(
      (n) => `
    <tr>
      <td class="n-label">${n}天後</td>
      <td class="date-cell">${formatDate(addDays(base, n))}</td>
    </tr>
  `,
    )
    .join("");
}

function addCustomDay() {
  const val = parseInt(customInput.value, 10);
  if (!val || val < 1 || extraDays.includes(val) || PRESET_DAYS.includes(val)) {
    customInput.select();
    return;
  }
  extraDays.push(val);
  customInput.value = "";

  // Show tag
  const tag = document.createElement("span");
  tag.className = "custom-tag";
  tag.textContent = `${val}天`;
  const remove = document.createElement("button");
  remove.textContent = "×";
  remove.setAttribute("aria-label", `移除 ${val} 天`);
  remove.onclick = () => {
    extraDays = extraDays.filter((d) => d !== val);
    tag.remove();
    render();
  };
  tag.appendChild(remove);
  customList.appendChild(tag);
  render();
}

dateInput.addEventListener("change", render);
customBtn.addEventListener("click", addCustomDay);
customInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addCustomDay();
});

render();
