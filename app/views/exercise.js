import document from "document";
import exercise from "exercise";

import Clock from "../subviews/clock";
import * as config from "../config";
import Cycle from "../lib/cycle"
import Gps from "../subviews/gps";
import Hrm from "../subviews/hrm";
import Popup from "../subviews/popup";
import * as utils from "../lib/utils";
import { Application, View, $at } from "../lib/view";

const $ = $at("#view-exercise");

export class ViewExercise extends View {
  el = $();

  btnFinish = $("#btnFinish");
  btnToggle = $("#btnToggle");
  lblStatus = $("#lblStatus");

  elBoxStats = $("#boxStats");
  lblSpeed = $("#lblSpeed");
  lblSpeedUnits = $("#lblSpeedUnits");
  lblSpeedAvg = $("#lblSpeedAvg");
  lblSpeedAvgUnits = $("#lblSpeedAvgUnits");
  lblSpeedMax = $("#lblSpeedMax");
  lblSpeedMaxUnits = $("#lblSpeedMaxUnits");
  lblDistance = $("#lblDistance");
  lblDistanceUnits = $("#lblDistanceUnits");
  lblActiveTime = $("#lblActiveTime");
  lblCalories = $("#lblCalories");

  handlePopupNo = () => {
    this.remove(this.popup);
  };

  handlePopupYes = () => {
    this.remove(this.popup);
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
    utils.show(this.btnFinish);
  };

  handleResume = () => {
    exercise.resume();
    this.lblStatus.text = "";
    this.setComboIcon(this.btnToggle, config.icons.pause);
    utils.hide(this.btnFinish);
  };

  setComboIcon(combo, icon) {
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
    this.popup = new Popup("#popup", popupSettings);
    this.insert(this.popup);
  };

  handleCancel = () => {
    this.gps.callback = undefined;
    Application.switchTo("ViewSelect");
  }

  handleLocationSuccess = () => {
    utils.show(this.btnToggle);
    exercise.start(config.exerciseName, config.exerciseOptions);
    this.lblStatus.text = "";
    this.gps.callback = undefined;
  };

  handleRefresh = () => {
    this.render();
  }

  handleButton = (evt) => {
    evt.preventDefault();
    switch (evt.key) {
      case "back":
        if (exercise.state === "stopped") {
          this.handleCancel();
        } else {
          this.cycle.next();
        }
        break;
      case "up":
        if (exercise.state === "paused") {
          this.handleFinish();
        }
        break;
      case "down":
        if (exercise.state === "started") {
          this.handleToggle();
        }
        break;
    }
  }

  onMount() {
    utils.hide(this.btnFinish);
    utils.hide(this.btnToggle);
    this.setComboIcon(this.btnToggle, config.icons.pause);
    this.lblStatus.text = "connecting";

    this.clock = new Clock("#subview-clock", "seconds", this.handleRefresh);
    this.insert(this.clock);

    this.hrm = new Hrm("#subview-hrm");
    this.insert(this.hrm);

    this.gps = new Gps("#subview-gps2", this.handleLocationSuccess);
    this.insert(this.gps);

    this.cycle = new Cycle(this.elBoxStats);

    this.toggleListener = this.handleToggle;
    this.btnToggle.addEventListener("click", this.toggleListener);

    this.finishListener = this.handleFinish;
    this.btnFinish.addEventListener("click", this.finishListener);

    this.buttonListener = this.handleButton;
    document.addEventListener("keypress", this.buttonListener);
  }

  onRender() {
    if (exercise && exercise.stats) {

      const speed = utils.formatSpeed(exercise.stats.speed.current);
      this.lblSpeed.text = speed.value;
      this.lblSpeedUnits.text = `speed ${speed.units}`;

      const speedAvg = utils.formatSpeed(exercise.stats.speed.average);
      this.lblSpeedAvg.text = speedAvg.value;
      this.lblSpeedAvgUnits.text = `speed avg ${speedAvg.units}`;

      const speedMax = utils.formatSpeed(exercise.stats.speed.max);
      this.lblSpeedMax.text = speedMax.value;
      this.lblSpeedMaxUnits.text = `speed max ${speedMax.units}`;

      const distance = utils.formatDistance(exercise.stats.distance);
      this.lblDistance.text = distance.value;
      this.lblDistanceUnits.text = `distance ${distance.units}`;

      this.lblActiveTime.text = utils.formatActiveTime(exercise.stats.activeTime);

      this.lblCalories.text = utils.formatCalories(exercise.stats.calories);
    }
  }

  onUnmount() {
    this.cycle.destroy();

    this.btnToggle.removeEventListener("click", this.toggleListener);
    this.btnFinish.removeEventListener("click", this.finishListener);
    document.removeEventListener("keypress", this.buttonListener);
  }
}
