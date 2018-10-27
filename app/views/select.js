import { me } from "appbit";
import document from "document";

import * as config from "../config";
import { Application, View, $at } from "../lib/view";
import GPS from "../subviews/gps";

const $ = $at("#view-select");

export class ViewSelect extends View {
  el = $();

  constructor() {
    this.gps = new GPS("#subview-gps1");
    this.btnStart = $("#btnStart");
    this.lblTitle = $("#lblTitle");

    super();
  }

  handleStart = () => {
    Application.switchTo("ViewExercise");
  }

  handleKeypress = (evt) => {
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
