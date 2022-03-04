import PaperSlider from "ember-paper/components/paper-slider/component";
import { htmlSafe } from "@ember/string";
import clamp from "ember-paper/utils/clamp";
import { computed } from "@ember/object";

export default class PaperDualSliderComponent extends PaperSlider {
  from = 0;
  to = 100;
  min = 0;
  max = 100;
  onChange = undefined;

  calcPercent(key) {
    const value = key;
    const min = this.min ? parseFloat(this.min) : 0.0;
    const max = this.max ? parseFloat(this.max) : 10.0;
    return clamp((value - min) / (max - min), 0, 1);
  }

  calcPercentStyle(key) {
    return htmlSafe(`left: ${(key || 0) * 100}%`);
  }

  @computed("from", "min", "max")
  get leftPercent() {
    return this.calcPercent(this.from);
  }

  @computed("to", "min", "max")
  get rightPercent() {
    return this.calcPercent(this.to);
  }

  @computed("leftPercent")
  get leftThumbStyle() {
    return this.calcPercentStyle(this.leftPercent);
  }

  @computed("rightPercent")
  get rightThumbStyle() {
    return this.calcPercentStyle(this.rightPercent);
  }

  @computed("leftPercent", "rightPercent")
  get activeTrackStyle() {
    const left = this.leftPercent * 100;
    const right = this.rightPercent * 100;
    return htmlSafe(`left: ${left}%; width: ${right - left}%;`);
  }

  get isMinimum() {
    return this.leftPercent === this.min;
  }

  setValueFromEvent(value) {
    let states = {
      from: this.from,
      to: this.to,
    };

    let exactVal = this.percentToValue(this.positionToPercent(value));
    let closestVal = this.minMaxValidator(this.stepValidator(exactVal));

    states[this.getClosestState(closestVal)] = closestVal;
    this.onChange(states);
  }

  getClosestState(value) {
    const fromDistance = Math.abs(this.from - value);
    const toDistance = Math.abs(this.to - value);
    if (toDistance < fromDistance) {
      return "to";
    } else {
      return "from";
    }
  }
}
