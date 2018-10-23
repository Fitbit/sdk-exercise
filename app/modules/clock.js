/*
A basic digital clock
*/
import clock from "clock";
import { preferences } from "user-settings";

import { zeroPad } from "./utils";

export default class Clock {
  timeString;
  tickCallback;
  tickListener;

  handleTick(evt) {
    let today = evt.date;
    let hours = today.getHours();
    if (preferences.clockDisplay === "12h") {
      hours = hours % 12 || 12; // 12h format
    } else {
      hours = zeroPad(hours); // 24h format
    }
    let mins = zeroPad(today.getMinutes());

    this.timeString = `${hours}:${mins}`;
    if (typeof this.tickCallback === "function") this.tickCallback();
  }

  constructor(granularity, callback) {
    if (!granularity) granularity = "seconds";
    clock.granularity = granularity;
    if (typeof callback === "function") this.tickCallback = callback;
    this.tickListener = this.handleTick.bind(this);
    clock.addEventListener("tick", this.tickListener);
  }

  destroy() {
    clock.removeEventListener("tick", this.tickListener);
  }
}
