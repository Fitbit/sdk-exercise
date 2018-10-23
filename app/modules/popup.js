import { show, hide } from "./utils";

export default class Popup {

  settings = {
    title: "Default Title",
    message: "Default question?",
    btnLeftLabel: "No",
    btnLeftCallback: undefined,
    btnRightLabel: "Yes",
    btnRightCallback: undefined
  }

  show = () => {
    show(this.parent);
  }

  hide = () => {
    hide(this.parent);
  }

  handleButton = (callback) => {
    if (typeof callback === "function") {
      callback();
    } else {
      this.hide();
    }
    this.removeEvents();
    this.hide();
  }

  handleLeft = () => {
    this.handleButton(this.settings.btnLeftCallback);
  }

  handleRight = () => {
    this.handleButton(this.settings.btnRightCallback);
  }

  addEvents = () => {
    this.btnLeft.addEventListener("click", this.handleLeft.bind(this));
    this.btnRight.addEventListener("click", this.handleRight.bind(this));
  }

  removeEvents = () => {
    this.btnLeft.removeEventListener("click", this.handleLeft.bind(this));
    this.btnRight.removeEventListener("click", this.handleRight.bind(this));
  }

  applySettings = () => {
    this.lblTitle.text = this.settings.title;
    this.lblMessage.text = this.settings.message;
    this.btnLeft.text = this.settings.btnLeftLabel;
    this.btnRight.text = this.settings.btnRightLabel;
  }

  constructor(element, settings) {
    if (!element) return;

    this.parent = element;
    this.lblTitle = this.parent.getElementById("header");
    this.lblMessage = this.parent.getElementById("copy");
    this.btnLeft = this.parent.getElementById("#btnLeft");
    this.btnRight = this.parent.getElementById("#btnRight");

    if (settings) {
      this.settings = settings;
    }

    this.applySettings();
    this.addEvents();
    this.show();
  }
}
