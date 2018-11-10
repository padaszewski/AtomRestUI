'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class Body {
  constructor (props) {
    this.props = props;

    etch.initialize(this);
  }

  render () {
    return (
        <label for="body">Body
          <textarea value={this.props.request.body} on={{input: this.props.onChange }} name="body"/>
        </label>
    )
  }

  update (props) {
    this.props = props;
    return etch.update(this)
  }

  destroy () {
    return etch.destroy(this)
  }
}
