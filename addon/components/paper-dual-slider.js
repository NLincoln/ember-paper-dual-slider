import Ember from 'ember';
import layout from '../templates/components/paper-dual-slider';

import FocusableMixin from 'ember-paper/mixins/focusable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import clamp from 'ember-paper/utils/clamp';
import Component from 'ember-paper/components/paper-slider';

const {
  String: {
    htmlSafe
  },
  computed
} = Ember;

const percentStyleComputed = (key) => computed(key, function() {
  const percent = this.get(key);
  return htmlSafe(`left: ${(percent || 0) * 100}%;`);
});

const percentComputed = (key) => computed(key, 'min', 'max', function() {
  const value = this.get(key);
  const min = parseFloat(this.get('min') || 0, 10);
  const max = parseFloat(this.get('max') || 0, 10);

  return clamp((value - min) / (max - min), 0, 1);
});

export default Component.extend(FocusableMixin, ColorMixin, {
  layout,
  leftPercent: percentComputed('from'),
  rightPercent: percentComputed('to'),

  leftThumbStyle: percentStyleComputed('leftPercent'),
  rightThumbStyle: percentStyleComputed('rightPercent'),

  activeTrackStyle: computed('leftPercent', 'rightPercent', function() {
    let left = this.get('leftPercent');
    let right = this.get('rightPercent');
    left *= 100;
    right *= 100;
    return htmlSafe(`left: ${left}%; width: ${right - left}%;`);
  }),

  isMinimum: computed('leftPercent', 'min', function() {
    return this.get('leftPercent') === this.get('min');
  }),

  stepValidator(value) {
    let step = parseFloat(this.get('step'), 10);
    return parseFloat((Math.round(value / step) * step).toFixed(1), 10);
  },

  getClosestState(value) {
    const fromDistance = Math.abs(this.get('from') - value);
    const toDistance = Math.abs(this.get('to') - value);
    if (toDistance < fromDistance) {
      return 'to';
    } else {
      return 'from';
    }
  },

  setValueFromEvent(value) {
    let states = {
      from: this.get('from'),
      to: this.get('to')
    };

    let exactVal = this.percentToValue(this.positionToPercent(value));
    let closestVal = this.minMaxValidator(this.stepValidator(exactVal));

    states[this.getClosestState(closestVal)] = closestVal;

    this.sendAction('onChange', states);
  }
});
