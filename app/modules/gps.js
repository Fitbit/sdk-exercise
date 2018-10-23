/*
  Watch the current location to warmup the GPS.
*/
import { me } from "appbit";
import { geolocation } from "geolocation";

import { View, $at } from "../modules/view";

let $;
export default class Gps extends View {
  //el = $();

  constructor(parent, callback) {
    $ = $at(parent);
    this.iconGps = $("#icon-gps");
    if (typeof callback === "function") this.callback = callback;
    super();
  }

  onMount() {
    if (me.permissions.granted("access_location")) {
      this.watch();
    } else {
      this.gpsBad();
    }
  }

  onUnmount() {
    geolocation.clearWatch(this.watchId);
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
    console.log(JSON.stringify(position));
    this.gpsGood();
    if (typeof this.callback === "function") this.callback();
  }

  handleError(error) {
    console.log(JSON.stringify(error));
    this.gpsBad();
  }
}
