import document from "document";
import exercise from "exercise";

import Clock from "../subviews/clock";
import * as config from "../config";
import Cycle from "../modules/cycle";
import Gps from "../subviews/gps";
import Hrm from "../subviews/hrm";
import Popup from "../subviews/popup";
import { show, hide, formatNumberThousands } from "../modules/utils";
import { Application, View, $at } from "../modules/view";

const $ = $at("#view-exercise");

export class ViewExercise extends View {
  el = $();

  btnFinish = $("#btnFinish");
  btnToggle = $("#btnToggle");
  lblStatus = $("#lblStatus");

  elBoxStats = $("#boxStats");
  lblSpeed = $("#lblSpeed");
  lblSpeedAvg = $("#lblSpeedAvg");
  lblSpeedMax = $("#lblSpeedMax");
  lblDistance = $("#lblDistance");
  lblDuration = $("#lblDuration");
  lblCalories = $("#lblCalories");

  handlePopupNo() {
    this.remove(this.popup);
  };

  handlePopupYes() {
    this.remove(this.popup);
    exercise.stop();
    Application.switchTo("ViewEnd");
  };


  handleToggle() {
    if (exercise.state === "started") {
      this.handlePause();
    } else {
      this.handleResume();
    }
  };

  handlePause() {
    exercise.pause();
    this.lblStatus.text = "paused";
    this.setComboIcon(this.btnToggle, config.icons.play);
    show(this.btnFinish);
  };

  handleResume() {
    exercise.resume();
    this.lblStatus.text = "";
    this.setComboIcon(this.btnToggle, config.icons.pause);
    hide(this.btnFinish);
  };

  setComboIcon(combo, icon) {
    combo.getElementById("combo-button-icon").href = icon;
    combo.getElementById("combo-button-icon-press").href = icon;
  }

  handleFinish() {
    let popupSettings = {
      title: "End activity?",
      message: `Are you sure you want to finish this ${
        config.exerciseName
      } session?`,
      btnLeftLabel: "Cancel",
      btnLeftCallback: this.handlePopupNo.bind(this),
      btnRightLabel: "End",
      btnRightCallback: this.handlePopupYes.bind(this)
    };
    this.popup = new Popup("#popup", popupSettings);
    this.insert(this.popup);
  };

  handleLocationSuccess() {
    show(this.btnToggle);
    exercise.start(config.exerciseName, config.exerciseOptions);
    this.lblStatus.text = "";
    this.gps.callback = undefined;
  };

  handleRefresh() {
    this.render();
  }

  handleButton(evt) {
    evt.preventDefault();
    switch (evt.key) {
      case "back":
        this.cycle.next();
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
    hide(this.btnFinish);
    hide(this.btnToggle);
    this.setComboIcon(this.btnToggle, config.icons.pause);
    this.lblStatus.text = "connecting";

    this.clock = new Clock("#subview-clock", "seconds", this.handleRefresh.bind(this));
    this.insert(this.clock);

    this.hrm = new Hrm("#subview-hrm");
    this.insert(this.hrm);

    this.gps = new Gps("#subview-gps2", this.handleLocationSuccess.bind(this));
    this.insert(this.gps);

    this.cycle = new Cycle(this.elBoxStats);

    this.toggleListener = this.handleToggle.bind(this);
    this.btnToggle.addEventListener("click", this.toggleListener);

    this.finishListener = this.handleFinish.bind(this);
    this.btnFinish.addEventListener("click", this.finishListener);

    this.buttonListener = this.handleButton.bind(this);
    document.addEventListener("keypress", this.buttonListener);
  }

  onRender() {
    //this.hrm.render();
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
    this.cycle.destroy();

    this.btnToggle.removeEventListener("click", this.toggleListener);
    this.btnFinish.removeEventListener("click", this.finishListener);
    document.removeEventListener("keypress", this.buttonListener);
  }
}
