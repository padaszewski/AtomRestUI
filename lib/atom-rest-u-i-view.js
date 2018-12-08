'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import GeneralRequestView from './components/request-ui.js'
import ResponseView from './components/response.js'


export default class AtomRestUIView {
  constructor (model) {
    this.model = model;

    etch.initialize(this);
  }

  render () {
    return (
      <div className="ui-container native-key-bindings">
      <GeneralRequestView request="" ref="reqView" model={this.model} />
      <ResponseView response="" ref="resView" />
      </div>
    )
  }

  update (props) {
    return etch.update(this)
  }

  destroy () {
    return etch.destroy(this)
  }


}
