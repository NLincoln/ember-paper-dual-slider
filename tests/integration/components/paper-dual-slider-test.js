import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper dual slider', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`<PaperDualSlider />`);

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    await render(hbs`
      <PaperDualSlider>
        template block text
      </PaperDualSlider>
    `);

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
