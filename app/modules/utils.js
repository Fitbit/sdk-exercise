// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Toggle visibility of an element
export function toggle(element) {
  element.style.display =
    element.style.display === "inline" ? "none" : "inline";
}

// Hide an element
export function hide(element) {
  element.style.display = "none";
}

// Show an element
export function show(element) {
  element.style.display = "inline";
}

// String starts with a specific word
export function startsWith(str, word) {
  return str.lastIndexOf(word, 0) === 0;
}

// Add commas every 3rd digit
export function formatNumberThousands(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
