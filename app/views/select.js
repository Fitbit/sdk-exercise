import { me } from "appbit";
import document from "document";

import * as config from "../config";
import Gps from "../subviews/gps";
import * as numbers from "../modules/formatter";
import { Application, View, $at } from "../modules/view";

const $ = $at("#view-select");

export class ViewSelect extends View {
  el = $();

  constructor() {
    this.gps = new Gps("#subview-gps1");
    this.btnStart = $("#btnStart");
    this.lblTitle = $("#lblTitle");

    super();
  }

  handleStart() {
    Application.switchTo("ViewExercise");
  }

  handleKeypress(evt) {
    if (evt.key === "down") this.handleStart();
  }

  onMount() {
    me.appTimeoutEnabled = false; // Disable timeout

    this.insert(this.gps);

    this.btnStart.addEventListener("click", this.handleStart);
    document.addEventListener("keypress", this.handleKeypress);
  }

  onRender() {
    this.lblTitle.text = config.exerciseName;
  }

  onUnmount() {
    this.btnStart.removeEventListener("click", this.handleStart);
    document.removeEventListener("keypress", this.handleKeypress);
  }
}
