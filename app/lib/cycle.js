import { show, hide } from "./utils";

export default class Cycle {
  index = 0;

  constructor(container) {
    if (!container) throw new Error("Cycle parent element is undefined");

    this.container = container;
    this.items = this.container.getElementsByClassName("item");
    this.touch = this.container.getElementById("touch");
    this.addEvents();
  }

  next = () => {
    this.index++;
    if (this.index >= this.items.length) {
      this.index = 0;
    }
    this.items.forEach((item, index) => {
      if (index === this.index) {
        show(item);
      } else {
        hide(item);
      }
    });
  }

  addEvents() {
    this.touch.addEventListener("click", this.next);
  }

  removeEvents() {
    this.touch.removeEventListener("click", this.next);
  }
}
