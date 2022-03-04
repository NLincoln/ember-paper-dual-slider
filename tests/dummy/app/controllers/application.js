import Controller from '@ember/controller';

export default class ApplicationController extends Controller {

  state = {
    from: 0,
    to: 100
  }

  min = 0;
  max = 300;

  template = `
    <PaperDualSlider
        @from={{this.state.from}}
        @to={{this.state.to}}
        @min={{this.min}}
        @max={{this.max}}
        @onChange={{fn (mut this.state)}}
    />`;
}
