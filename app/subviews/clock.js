/*
A basic digital clock
*/
import clock from "clock";
import { preferences } from "user-settings";

import { zeroPad } from "../lib/utils";
import { View, $at } from "../lib/view";

export default class Clock extends View {
  constructor(parent, granularity, callback) {
    if (!parent) throw new Error("Clock parent element is undefined");

    const $ = $at(parent);
    this.lblClock = $("#lblClock");
    clock.granularity = granularity || "seconds";
    this.callback = callback;
    super();
  }

  onMount() {
    clock.addEventListener("tick", this.handleTick);
  }

  handleTick = (evt) => {
    const today = evt.date;
    const hours = today.getHours();
    const mins = zeroPad(today.getMinutes());

    if (preferences.clockDisplay === "12h") {
      hours = hours % 12 || 12; // 12h format
    } else {
      hours = zeroPad(hours); // 24h format
    }
    this.lblClock.text = `${hours}:${mins}`;
    if (typeof this.callback === "function") this.callback();
  };

  onUnmount() {
    clock.removeEventListener("tick", this.handleTick);
  }
}
