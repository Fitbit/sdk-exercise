import Clock from "../subviews/clock";

import { View, $at } from "../modules/view";

const $ = $at("#view-end");

export class ViewEnd extends View {
  el = $();

  handleRefresh() {
    this.render();
  }

  onMount() {
    this.clock = new Clock("#subview-clock2", "seconds", this.handleRefresh.bind(this));
    this.insert(this.clock);
  }

  onRender() {}

  onUnmount() {}
}
