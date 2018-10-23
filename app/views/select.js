import { me } from "appbit";

import * as config from "../config";
import Gps from "../modules/gps";
import { Application, View, $at } from "../modules/view";

const $ = $at("#view-select");

export class ViewSelect extends View {
  el = $();

  btnStart = $("#btnStart");
  lblTitle = $("#lblTitle");
  imgGps = $("#icon-gps");

  handleStart = () => {
    Application.switchTo("ViewExercise");
  };

  onMount() {
    me.appTimeoutEnabled = false; // Disable timeout

    this.gps = new Gps(this.imgGps);

    this.lblTitle.text = config.exerciseName;
    this.btnStart.addEventListener("click", this.handleStart.bind(this));
  }

  onRender() {}

  onUnmount() {
    this.btnStart.removeEventListener("click", this.handleStart.bind(this));
  }
}
