import exercise from "exercise";

import Clock from "../subviews/clock";
import * as formatter from "../modules/formatter";
import { View, $at } from "../modules/view";

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

    this.lblActiveTime.text = `active time: ${exercise.stats.activeTime}`;

    this.lblHeartRateAvg.text = `heart rate avg: ${exercise.stats.heartRate
      .average || 0} bpm`;
    this.lblHeartRateMax.text = `heart rate max: ${exercise.stats.heartRate
      .max || 0} bpm`;

    const speedAvg = formatter.formatSpeed(exercise.stats.speed.average);
    this.lblSpeedAvg.text = `speed avg: ${speedAvg.value} ${speedAvg.units}`;

    const speedMax = formatter.formatSpeed(exercise.stats.speed.max);
    this.lblSpeedMax.text = `speed avg: ${speedMax.value} ${speedMax.units}`;

    const distance = formatter.formatDistance(exercise.stats.distance);
    this.lblDistance.text = `distance: ${distance.value} ${distance.units}`;
  }

  onRender() {}

  onUnmount() {}
}
