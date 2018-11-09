'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class Header {
  constructor (props) {
    this.props = props;

    etch.initialize(this);
  }

  render () {
    return (
      <label for="body">Header
        <textarea value={this.props.request.header} on={{input: this.props.onChange }} name="body"/>
        </label>
    )
  }

  update () {
    return etch.update(this)
  }

  destroy () {
    return etch.destroy(this)
  }
}
