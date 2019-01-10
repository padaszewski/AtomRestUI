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
      <div class="req-header">
      <label for="body">Header
        <textarea value={this.props.request.header} on={{input: this.props.onChange }} name="body"/>
        </label>
        {(() => {
        try {
          JSON.parse(this.props.request.header);
          return null;
        } catch(err) {
          return <div>Invalid header (must be JSON)!</div>
        }
      }
      )()}
        </div>
    )
  }

  update (props) {
    this.props = props;
    console.log('header-props', this.props);
    return etch.update(this)
  }

  destroy () {
    return etch.destroy(this)
  }
}
