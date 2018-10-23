import document from "document";
import exercise from "exercise";

import Clock from "../modules/clock";
import * as config from "../config";
import Cycle from "../modules/cycle";
import Gps from "../modules/gps";
import Hrm from "../modules/hrm";
import Popup from "../modules/popup.js";
import { show, hide, formatNumberThousands } from "../modules/utils";
import { Application, View, $at } from "../modules/view";

const $ = $at("#view-exercise");

export class ViewExercise extends View {
  el = $();

  popup = undefined;

  modPopup = $("#popup");
  btnFinish = $("#btnFinish");
  btnToggle = $("#btnToggle");
  lblStatus = $("#lblStatus");

  elBoxStats = $("#boxStats");
  lblHrm = $("#lblHrm");
  lblSpeed = $("#lblSpeed");
  lblSpeedAvg = $("#lblSpeedAvg");
  lblSpeedMax = $("#lblSpeedMax");
  lblDistance = $("#lblDistance");
  lblDuration = $("#lblDuration");
  lblCalories = $("#lblCalories");

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
    this.lblStatus.text = "paused";
    this.setComboIcon(this.btnToggle, config.icons.play);
    show(this.btnFinish);
  };

  handleResume = () => {
    exercise.resume();
    this.lblStatus.text = "";
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

  handleLocationSuccess = () => {
    show(this.btnToggle);
    exercise.start(config.exerciseName, config.exerciseOptions);
    this.lblStatus.text = "";
    // this.gps.destroy();
  };

  handleButton = (evt) => {
    evt.preventDefault();
    switch (evt.key) {
      case "back":
        this.cycle.next();
        break;
      case "up":
        this.handleFinish();
        break;
      case "down":
        this.handleToggle();
        break;
    }
  }

  onMount() {
    hide(this.btnFinish);
    this.setComboIcon(this.btnToggle, config.icons.pause);
    hide(this.btnToggle);

    this.lblStatus.text = "connecting";

    this.insert(new Clock());

    this.hrm = new Hrm();

    this.insert(new Gps(this.handleLocationSuccess.bind(this)));

    this.cycle = new Cycle(this.elBoxStats);

    this.btnToggle.addEventListener("click", this.handleToggle);
    this.btnFinish.addEventListener("click", this.handleFinish);

    document.addEventListener("keypress", this.handleButton);
  }

  onRender() {
    this.lblHrm.text = this.hrm.getBPM() || "--";

    if (exercise && exercise.stats) {
      // SPEED METERS/SECOND - TODO: Format for locale
      this.lblSpeed.text = exercise.stats.speed.current;
      this.lblSpeedAvg.text = exercise.stats.speed.average;
      this.lblSpeedMax.text = exercise.stats.speed.max;

      // DISTANCE METERS - TODO: Format for locale
      this.lblDistance.text = exercise.stats.distance;

      // DURATION - TODO: format for hh:mm:ss
      this.lblDuration.text = exercise.stats.activeTime;

      // CALORIES - TODO: Format for locale
      this.lblCalories.text = formatNumberThousands(exercise.stats.calories);
    }

  }

  onUnmount() {
    this.hrm.destroy();
    this.cycle.destroy();

    this.btnToggle.removeEventListener("click", this.handleToggle);
    this.btnFinish.removeEventListener("click", this.handleFinish);

    document.removeEventListener("keypress", this.handleButton);
  }
}
