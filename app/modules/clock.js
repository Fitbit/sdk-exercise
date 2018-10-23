import clock from "clock";
import { preferences } from "user-settings";

import { zeroPad } from "./utils";

export default class Clock {
  timeString;
  tickCallback;

  handleTick(evt) {
    let today = evt.date;

    let hours = today.getHours();
    if (preferences.clockDisplay === "12h") {
      // 12h format
      hours = hours % 12 || 12;
    } else {
      // 24h format
      hours = zeroPad(hours);
    }
    let mins = zeroPad(today.getMinutes());
    let secs = zeroPad(today.getSeconds())

    this.timeString = `${hours}:${mins}:${secs}`;
    if (typeof this.tickCallback === "function") this.tickCallback();
  }

  constructor(granularity, callback) {
    clock.granularity = granularity;
    if (typeof callback === "function") this.tickCallback = callback;
    clock.addEventListener("tick", this.handleTick.bind(this));
  }

  destroy() {
    clock.removeEventListener("tick", this.handleTick.bind(this));
  }
}
