'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import ReqTypeSelect from './req-type-select.js'
import Body from './body.js'
import Header from './header.js'

export default class RequestBar {
  constructor (props) {
    this.props = props;
    this.bodyContent = null;
    this.headerContent = null;
    console.log('req-bar', props)

    etch.initialize(this);
  }

  render () {
    return (
        <div className="main-bar native-key-bindings">
          <ReqTypeSelect/>
          <input id="urlInput" on={{input: this.props.updateURL}} value={this.props.request.url} type="text" placeholder="Type in route..."/>
          <input type="button" on={{click: this.props.sendRequest}} value="Send"/>
          <input type="button" value="Save"/>
        </div>
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
