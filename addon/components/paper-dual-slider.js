import PaperSlider from 'ember-paper/components/paper-slider/component';
import {tracked} from '@glimmer/tracking';
import {htmlSafe} from "@ember/string";
import clamp from "ember-paper/utils/clamp";

export default class PaperDualSliderComponent extends PaperSlider {

  @tracked from;
  @tracked to;
  @tracked min;
  @tracked max;
  onChange = undefined;

  constructor(owner, args) {
    super(owner, args);
    const {from, to, min, max, onChange} = args;
    this.from = from;
    this.to = to;
    this.min = min;
    this.max = max;
    this.onChange = onChange;
  }

  calcPercent(key) {
    const value = key
    const min = this.min ? parseFloat(this.min) : 0.0;
    const max = this.max ? parseFloat(this.max) : 10.0;
    return clamp((value - min) / (max - min), 0, 1);
  }

  calcPercentStyle(key) {
    return htmlSafe(`left: ${(key || 0) * 100}%`);
  }

  get leftPercent() {
    return this.calcPercent(this.from);
  }

  get rightPercent() {
    return this.calcPercent(this.to);
  }

  get leftThumbStyle() {
    return this.calcPercentStyle(this.leftPercent);
  }

  get rightThumbStyle() {
    return this.calcPercentStyle(this.rightPercent);
  }

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
    this.get("onChange")(states);
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
