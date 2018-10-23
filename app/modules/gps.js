/*
  Peek the current location to warmup the GPS.
*/
import { me } from "appbit";
import { geolocation } from "geolocation";

export default class Gps {
  iconGps;
  constructor(icon) {
    if (icon) this.iconGps = icon;

    if (me.permissions.granted("access_location")) {
      geolocation.getCurrentPosition(
        this.handleSuccess.bind(this),
        this.handleError.bind(this)
      );
    } else {
      this.gpsBad();
    }
  }

  gpsGood() {
    if (this.iconGps) this.iconGps.style.fill = "fb-green";
  }

  gpsBad() {
    if (this.iconGps) this.iconGps.style.fill = "fb-red";
  }

  handleSuccess(position) {
    this.gpsGood();
    console.log(JSON.stringify(position));
  }

  handleError(error) {
    this.gpsBad();
    console.log(JSON.stringify(error));
  }
}
