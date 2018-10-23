import document from "document";
import exercise from "exercise";

import Clock from "../modules/clock";
import * as config from "../config";
import Cycle from "../modules/cycle";
import Gps from "../modules/gps";
import Popup from "../modules/popup.js";
import { show, hide } from "../modules/utils";
import { Application, View, $at } from "../modules/view";

const $ = $at("#view-exercise");

export class ViewExercise extends View {
  el = $();

  popup = undefined;

  modPopup = $("#popup");
  btnFinish = $("#btnFinish");
  btnToggle = $("#btnToggle");
  lblClock = $("#lblClock");
  elBoxStats = $("#boxStats");
  imgGps = $("#icon-gps");

  handlePopupNo = () => {
    // Paused
  };

  handlePopupYes = () => {
    exercise.stop();
    Application.switchTo("ViewEnd");
  };


  handleToggle = () => {
    if (exercise.state === "started") {
      this.handlePause();
    } else {
      this.handleResume();
    }
  };

  handlePause = () => {
    exercise.pause();
    this.setComboIcon(this.btnToggle, config.icons.play);
    show(this.btnFinish);
  };

  handleResume = () => {
    exercise.resume();
    this.setComboIcon(this.btnToggle, config.icons.pause);
    hide(this.btnFinish);
  };

  setComboIcon = (combo, icon) => {
    combo.getElementById("combo-button-icon").href = icon;
    combo.getElementById("combo-button-icon-press").href = icon;
  }

  handleFinish = () => {
    let popupSettings = {
      title: "End activity?",
      message: `Are you sure you want to finish this ${
        config.exerciseName
      } session?`,
      btnLeftLabel: "Cancel",
      btnLeftCallback: this.handlePopupNo,
      btnRightLabel: "End",
      btnRightCallback: this.handlePopupYes
    };
    this.popup = new Popup(this.modPopup, popupSettings);
  };

  handleClockTick = () => {
    this.render();
  };

  handleLocationSuccess = () => {
    exercise.start(config.exerciseName, config.exerciseOptions);
    this.gps.destroy();
  };

  handleButton = (evt) => {
    switch (evt.key) {
      case "back":
        evt.preventDefault();
        this.cycle.next();
        break;
      case "up":
        evt.preventDefault();
        this.handleFinish();
        break;
      case "down":
        evt.preventDefault();
        this.handleToggle();
        break;
      default:
    }
  }

  onMount() {
    hide(this.btnFinish);
    this.setComboIcon(this.btnToggle, config.icons.pause);
    show(this.btnToggle);

    this.clock = new Clock("seconds", this.handleClockTick);

    this.gps = new Gps(this.imgGps, this.handleLocationSuccess.bind(this));

    this.cycle = new Cycle(this.elBoxStats);

    this.btnToggle.addEventListener("click", this.handleToggle);
    this.btnFinish.addEventListener("click", this.handleFinish);

    document.addEventListener("keypress", this.handleButton);
  }

  onRender() {
    this.lblClock.text = this.clock.timeString || "";
  }

  onUnmount() {
    this.clock.destroy();
    this.cycle.destroy();

    this.btnToggle.removeEventListener("click", this.handleToggle);
    this.btnFinish.removeEventListener("click", this.handleFinish);

    document.removeEventListener("keypress", this.handleButton);
  }
}
