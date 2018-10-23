import document from "document";
import exercise from "exercise";

import Clock from "../modules/clock";
import Cycle from "../modules/cycle";
import Gps from "../modules/gps";
import Popup from "../modules/popup.js";
import { show, hide } from "../modules/utils";
import { Application, View, $at } from "../modules/view";

const $ = $at("#view-exercise");

export class ViewExercise extends View {
  el = $();

  popup = undefined;

  btnPause = $("#btnPause");
  btnResume = $("#btnResume");
  btnStop = $("#btnStop");
  lblClock = $("#lblClock");
  elBoxStats = $("#boxStats");
  imgGps = $("#icon-gps");

  handlePopupNo = () => {
    // Do nothing
  }

  handlePopupYes = () => {
    Application.switchTo("ViewSelect");
  }

  popupSettings = {
    title: "Stop Exercise",
    message: "Are you sure you want to stop?",
    btnLeftLabel: "No",
    btnLeftCallback: this.handlePopupNo,
    btnRightLabel: "Yes",
    btnRightCallback: this.handlePopupYes
  }


  handleClose = (evt) => {
    if (evt.key === 'back') {
      evt.preventDefault();
      this.popup = new Popup($('#popup'), this.popupSettings);
    }
  }


  handlePause = () => {
    //exercise.pause();
    hide(this.btnPause);
    show(this.btnResume);
  }

  handleResume = () => {
    //exercise.resume();
    hide(this.btnResume);
    show(this.btnPause);
  }

  handleStop = () => {
    //exercise.stop();
  }

  handleClockTick = () => {
    this.render();
  }

  onMount() {
    hide(this.btnResume);
    show(this.btnPause);

    this.clock = new Clock("seconds", this.handleClockTick.bind(this));

    this.gps = new Gps(this.imgGps);

    this.cycle = new Cycle(this.elBoxStats);

    this.btnPause.addEventListener("click", this.handlePause.bind(this));
    this.btnResume.addEventListener("click", this.handleResume.bind(this));

    document.addEventListener("keypress", this.handleClose.bind(this));

    //exercise.start(config.exerciseName, config.exerciseOptions);
  }

  onRender() {
    this.lblClock.text = this.clock.timeString;
  }

  onUnmount() {
    this.clock.destroy();
    this.cycle.destroy();

    this.btnPause.removeEventListener("click", this.handlePause.bind(this));
    this.btnResume.removeEventListener("click", this.handleResume.bind(this));

    document.removeEventListener("keypress", this.handleClose.bind(this));
  }
}
