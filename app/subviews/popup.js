import { show, hide } from "../lib/utils";
import { View, $at, $ as x$ } from "../lib/view";

export default class Popup extends View {
  constructor(parent, settings = {}) {
    if (!parent) throw new Error("Popup parent element is undefined");

    this.parent = x$(parent);

    const $ = $at(parent);

    this.lblTitle = $("#header");
    this.lblMessage = $("#copy");
    this.btnLeft = $("#btnLeft");
    this.btnRight = $("#btnRight");

    this.settings = {
      ...{
        title: "Default Title",
        message: "Default question?",
        btnLeftLabel: "No",
        btnLeftCallback: undefined,
        btnRightLabel: "Yes",
        btnRightCallback: undefined
      },
      ...settings
    };

    super();
  }

  onMount() {
    this.addEvents();
    this.lblTitle.text = this.settings.title;
    this.lblMessage.text = this.settings.message;
    this.btnLeft.text = this.settings.btnLeftLabel;
    this.btnRight.text = this.settings.btnRightLabel;
    show(this.parent);
  }

  onRender() {}

  onUnmount() {
    hide(this.parent);
    this.removeEvents();
  }

  handleButton = callback => {
    if (typeof callback === "function") callback();
  };

  handleLeft = () => {
    this.handleButton(this.settings.btnLeftCallback);
  };

  handleRight = () => {
    this.handleButton(this.settings.btnRightCallback);
  };

  addEvents = () => {
    this.btnLeft.addEventListener("click", this.handleLeft);
    this.btnRight.addEventListener("click", this.handleRight);
  };

  removeEvents = () => {
    this.btnLeft.removeEventListener("click", this.handleLeft);
    this.btnRight.removeEventListener("click", this.handleRight);
  };
}
