import clock from "clock";
import { preferences } from "user-settings";

import { zeroPad } from "./utils";

export default class Clock {
  timeString;
  tickCallback;
  tickCallbackListener;

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

    this.timeString = `${hours}:${mins}`;
    if (typeof this.tickCallback === "function") this.tickCallback();
  }

  constructor(granularity, callback) {
    clock.granularity = granularity;
    if (typeof callback === "function") this.tickCallback = callback;
    this.tickCallbackListener = this.handleTick.bind(this);
    clock.addEventListener("tick", this.tickCallbackListener);
  }

  destroy() {
    clock.removeEventListener("tick", this.tickCallbackListener);
  }
}
