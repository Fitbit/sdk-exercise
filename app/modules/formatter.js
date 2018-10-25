import { zeroPad, formatNumberThousands } from "./utils";
import { units } from "user-settings";

// Input: Speed, in m/s.
// Output: Speed per hour, based on user-preference.
export function formatSpeed(speed) {
  return convertMetersToMilesOrKilometers(speed * 60 * 60, "kph", "mph");
}

// Input: Distance travelled, in meters.
// Output: Distance travelled, based on user-preference.
export function formatDistance(distance) {
  return convertMetersToMilesOrKilometers(distance, "kilometers", "miles");
}

// Input: Time spent in the "started" state, in milliseconds.
// Output: Time spent in the "started" state, hh:mm:ss.
export function formatActiveTime(activeTime) {
  let seconds = (activeTime / 1000).toFixed(0);
  let minutes = Math.floor(seconds / 60);
  let hours;
  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    hours = zeroPad(hours);
    minutes = minutes - (hours * 60);
    minutes = zeroPad(minutes);
  }
  seconds = Math.floor(seconds % 60);
  seconds = zeroPad(seconds);
  if (hours) {
    return `${hours}:${minutes}:${seconds}`;
  }
  return `${minutes}:${seconds}`;
}

// Input: Number of calories burned, in calories (kcal).
// Output: Number of calories burned, in calories (kcal), formatted for 1,000s.
export function formatCalories(calories) {
  return formatNumberThousands(calories);
}

// Convert meters into the user preference for kilometers or miles.
function convertMetersToMilesOrKilometers(meters, unitK, unitM) {
  let val = (meters || 0) / 1000;
  let u = unitK;
  if(units.distance === "us") {
    val *= 0.621371;
    u = unitM;
  }
  return {
    value: val.toFixed(2),
    units: u
  }
}
