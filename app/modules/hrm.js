import { me } from "appbit";
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";
import { HeartRateSensor } from "heart-rate";
import { user } from "user-profile";

export default class Hrm {
  bodySensor;
  hrmSensor;
  constructor() {
    if (me.permissions.granted("access_heart_rate")) {
      this.bodySensor = new BodyPresenceSensor();
      this.hrmSensor = new HeartRateSensor();
      this.setupEvents();
    } else {
      console.log("Denied Heart Rate or User Profile permissions");
    }
  }

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

  destroy() {
    console.log("destroy hrm")
    display.removeEventListener("change", this.eventHandler);
  }
}
