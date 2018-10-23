/*
A basic digital clock
*/
import clock from "clock";
import { preferences } from "user-settings";

import { zeroPad } from "./utils";
import { View, $at } from "../modules/view";

const $ = $at("#subview-clock");
export default class Clock extends View {
  el = $();

  lblClock = $("#lblClock");

  constructor(granularity = "seconds", callback) {
    clock.granularity = granularity;
    if (typeof callback === "function") this.callback = callback;
    super();
  }

  onMount() {
    clock.addEventListener("tick", this.handleTick);
  }

  handleTick = (evt) => {
    const today = evt.date;
    const hours = today.getHours();
    if (preferences.clockDisplay === "12h") {
      hours = hours % 12 || 12; // 12h format
    } else {
      hours = zeroPad(hours); // 24h format
    }
    const mins = zeroPad(today.getMinutes());

    this.lblClock.text = `${hours}:${mins}`;

    if (typeof this.callback === "function") this.callback();
  }

  onUnmount() {
    clock.removeEventListener("tick", this.handleTick);
    this.callback = undefined;
  }
}
