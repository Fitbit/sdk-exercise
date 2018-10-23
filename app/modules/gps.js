/*
  Watch the current location to warmup the GPS.
*/
import { me } from "appbit";
import { geolocation } from "geolocation";

export default class Gps {
  iconGps;
  constructor(icon, callback) {
    if (icon) this.iconGps = icon;
    if (typeof callback === "function") this.callback = callback;

    if (me.permissions.granted("access_location")) {
      this.watch();
    } else {
      this.gpsBad();
    }
  }

  destroy() {
    geolocation.clearWatch(this.watchId)
  }

  watch() {
    this.watchId = geolocation.watchPosition(
      this.handleSuccess.bind(this),
      this.handleError.bind(this)
    );
  }

  gpsGood() {
    if (this.iconGps) this.iconGps.style.fill = "fb-green";
  }

  gpsBad() {
    if (this.iconGps) this.iconGps.style.fill = "fb-red";
  }

  handleSuccess(position) {
    this.gpsGood();
    if (typeof this.callback === "function") this.callback();
    console.log(JSON.stringify(position));
  }

  handleError(error) {
    this.gpsBad();
    console.log(JSON.stringify(error));
  }
}
