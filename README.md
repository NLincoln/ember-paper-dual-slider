# ember-paper-dual-slider

To install:

```sh
ember install ember-paper-dual-slider
```

You must have ember-paper already installed.

Use it like this:

```hbs
  <PaperDualSlider
    @from={{this.state.from}}
    @to={{this.state.to}}
    @min=0
    @max=300
    @onChange={{fn (mut this.state)}}
  />
```

All options that `paper-slider` supports are supported, except for `value`, which is replaced by `from` and `to`.

## Installation

* `git clone <repository-url>` this repository
* `cd ember-paper-dual-slider`
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
