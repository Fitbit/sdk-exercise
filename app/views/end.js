import exercise from "exercise";

import * as utils from "../lib/utils";
import { View, $at } from "../lib/view";
import Clock from "../subviews/clock";

const $ = $at("#view-end");

export class ViewEnd extends View {
  el = $();

  lblActiveTime = $("#lblActiveTime");
  lblHeartRateAvg = $("#lblHeartRateAvg");
  lblHeartRateMax = $("#lblHeartRateMax");
  lblSpeedAvg = $("#lblSpeedAvg");
  lblSpeedMax = $("#lblSpeedMax");
  lblDistance = $("#lblDistance");

  onMount() {
    this.clock = new Clock("#subview-clock2", "seconds");
    this.insert(this.clock);

    this.lblActiveTime.text = `active time: ${utils.formatActiveTime(
      exercise.stats.activeTime || 0
    )}`;

    this.lblHeartRateAvg.text = `heart rate avg: ${exercise.stats.heartRate
      .average || 0} bpm`;
    this.lblHeartRateMax.text = `heart rate max: ${exercise.stats.heartRate
      .max || 0} bpm`;

    const speedAvg = utils.formatSpeed(exercise.stats.speed.average || 0);
    this.lblSpeedAvg.text = `speed avg: ${speedAvg.value} ${speedAvg.units}`;

    const speedMax = utils.formatSpeed(exercise.stats.speed.max || 0);
    this.lblSpeedMax.text = `speed max: ${speedMax.value} ${speedMax.units}`;

    const distance = utils.formatDistance(exercise.stats.distance || 0);
    this.lblDistance.text = `distance: ${distance.value} ${distance.units}`;
  }

  onRender() {}

  onUnmount() {}
}
