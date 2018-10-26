import { units } from "user-settings";

/** @description Add zero in front of numbers < 10.
 * @param {number} num The number to pad.
 * @return {string}
 */
export function zeroPad(num) {
  if (num < 10) {
    num = "0" + num;
  }
  return num;
}

/** @description Toggle visibility of an element.
 * @param {object} element The element to toggle.
 */
export function toggle(element) {
  element.style.display =
    element.style.display === "inline" ? "none" : "inline";
}

/** @description Hide an element.
 * @param {object} element The element to hide.
 */
export function hide(element) {
  element.style.display = "none";
}

/** @description Show an element.
 * @param {object} element The element to show.
 */
export function show(element) {
  element.style.display = "inline";
}

/** @description String starts with a specific word.
 * @param {string} str The string to check.
 * @param {string} num The word to find at the beginning of the string.
 * @return {boolean}
 */
export function startsWith(str, word) {
  return str.lastIndexOf(word, 0) === 0;
}

/** @description Formats speed per second, into speed per hour. Returns an
 * object containing a value and units.
 * @param {number} speed The Speed, in meters per second.
 * @return {object}
 */
export function formatSpeed(speed) {
  return convertMetersToMilesOrKilometers(speed * 3600, "kph", "mph");
}

/** @description Formats distance in meters into either miles or kilometers.
 * Returns an object containing a value and units.
 * @param {number} distance The distance travelled in meters.
 * @return {object}
 */
export function formatDistance(distance) {
  return convertMetersToMilesOrKilometers(distance, "kilometers", "miles");
}

/** @description Formats the time spent in milliseconds into mm:ss or hh:mm:ss.
 * @param {number} activeTime The time in milliseconds.
 * @return {string}
 */
export function formatActiveTime(activeTime) {
  let seconds = (activeTime / 1000).toFixed(0);
  let minutes = Math.floor(seconds / 60);
  let hours;
  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    hours = zeroPad(hours);
    minutes = minutes - hours * 60;
    minutes = zeroPad(minutes);
  }
  seconds = Math.floor(seconds % 60);
  seconds = zeroPad(seconds);
  if (hours) {
    return `${hours}:${minutes}:${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

/** @description Formats calories with commas for 1,000.
 * @param {number} calories The time in milliseconds.
 * @return {string}
 */
export function formatCalories(calories) {
  return calories.toLocaleString();
}

// Convert meters into the user preference for kilometers or miles.
/** @description Converts a number in meters into either miles or kilometers.
 * Returns an object containing a value and units.
 * @param {number} meters The amount of meters to convert.
 * @param {string} unitK The units to return if the value is kilometers.
 * @param {string} unitM The units to return if the value is miles.
 * @return {object}
 */
export function convertMetersToMilesOrKilometers(meters, unitK, unitM) {
  let val = (meters || 0) / 1000;
  let u = unitK;
  if (units.distance === "us") {
    val *= 0.621371;
    u = unitM;
  }
  return {
    value: val.toFixed(2),
    units: u
  };
}
