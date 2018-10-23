import { me } from "appbit";
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";
import { HeartRateSensor } from "heart-rate";
import { user } from "user-profile";

import { View, $at } from "../modules/view";

const $ = $at("#subview-hrm");
export default class Hrm extends View {
  el = $();

  label = $("#lblHrm");

  eventHandler() {
    if (display.on) {
      this.bodySensor.start();
      this.hrmSensor.start();
    } else {
      this.hrmSensor.stop();
      this.bodySensor.stop();
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
    if (me.permissions.granted("access_heart_rate")) {
      this.bodySensor = new BodyPresenceSensor();
      this.hrmSensor = new HeartRateSensor();
      this.setupEvents();
    } else {
      console.log("Denied Heart Rate or User Profile permissions");
    }
  }

  onRender() {
    this.label.text = this.getBPM() || "--";
  }

  onUnmount() {
    display.removeEventListener("change", this.eventHandler);
  }
}
