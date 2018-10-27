import { me } from "appbit";
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";
import { HeartRateSensor } from "heart-rate";
import { user } from "user-profile";

import { View, $at } from "../lib/view";

export default class HRM extends View {
  constructor(parent) {
    if (!parent) throw new Error("HRM parent element is undefined");

    const $ = $at(parent);
    this.label = $("#lblHrm");
  }

  eventHandler = () => {
    if (display.on) {
      this.bodySensor.start();
      this.hrmSensor.start();
    } else {
      if (this.hrmSensor) this.hrmSensor.stop();
      if (this.bodySensor) this.bodySensor.stop();
    }
  }

  setupEvents() {
    display.addEventListener("change", this.eventHandler);
    this.eventHandler();
  }

  getBPM() {
    if (!this.bodySensor.present) {
      return "--"; // off-wrist
    }
    return this.hrmSensor.heartRate;
  }

  getZone() {
    return user.heartRateZone(this.hrmSensor.heartRate || 0);
  }

  onMount() {
    if (me.permissions.granted("access_heart_rate") && me.permissions.granted("access_activity")) {
      this.bodySensor = new BodyPresenceSensor();
      this.hrmSensor = new HeartRateSensor();
      this.setupEvents();
    } else {
      console.warn("Denied Heart Rate or User Profile permissions");
    }
  }

  onRender() {
    this.label.text = this.getBPM() || "--";
  }

  onUnmount() {
    display.removeEventListener("change", this.eventHandler);
    if (this.hrmSensor) this.hrmSensor.stop();
    if (this.bodySensor) this.bodySensor.stop();
  }
}
