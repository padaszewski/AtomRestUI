'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import ReqTypeSelect from './req-type-select.js'
import Body from './body.js'
import Header from './header.js'

export default class RequestBar {
  constructor (props) {
    this.props = props;

    etch.initialize(this);
  }

  render () {
    return (
        <div className="main-bar native-key-bindings">
          <ReqTypeSelect updateReqType={this.props.updateReqType}/>
          <input id="urlInput" on={{input: this.props.updateURL}} value={this.props.request.url} type="text" placeholder="Type in route..."/>
        </div>
    )
  }

  update (props) {
    this.props.request = props.request;
    return etch.update(this)
  }

  destroy () {
    return etch.destroy(this)
  }
}
