import { me } from "appbit";
import document from "document";

import * as config from "../config";
import Gps from "../modules/gps";
import { show, hide } from "../modules/utils";
import { Application, View, $at } from "../modules/view";

const $ = $at("#view-select");

export class ViewSelect extends View {
  el = $();

  btnStart = $("#btnStart");
  lblTitle = $("#lblTitle");

  handleStart = () => {
    Application.switchTo("ViewExercise");
  };

  handleKeypress = (evt) => {
    if (evt.key === "down") this.handleStart();
  }

  onMount() {
    show(this.btnStart);
    me.appTimeoutEnabled = false; // Disable timeout

    this.insert(new Gps());

    this.btnStart.addEventListener("click", this.handleStart);
    document.addEventListener("keypress", this.handleKeypress);
  }

  onRender() {
    this.lblTitle.text = config.exerciseName;
  }

  onUnmount() {
    hide(this.btnStart);
    // this.gps.destroy();
    this.btnStart.removeEventListener("click", this.handleStart);
    document.addEventListener("keypress", this.handleKeypress);
  }
}
