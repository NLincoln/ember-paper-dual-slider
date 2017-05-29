import Ember from 'ember';

export default Ember.Route.extend({
  setupController(controller) {
    controller.set('state', {
      from: 0,
      to: 300
    })
  }
});
