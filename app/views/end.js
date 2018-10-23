import { Application, View, $at } from "../modules/view";

const $ = $at("#view-end");

export class ViewEnd extends View {
  el = $();

  onMount() {}

  onRender() {}

  onUnmount() {}
}
