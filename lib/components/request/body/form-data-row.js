'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import ReqTypeSelect from './form-data-type-select.js';


export default class FormDataRow {
  constructor (props) {
    this.props = props;
    this.keyValPairs = new Map();
    etch.initialize(this);
    this.type = 'json';
  }

  render () {
    return (
      <div>
      <input type="text" placeholder="key"/>
      <ReqTypeSelect  />
      <input type="text" placeholder="key" />
      </div>
    )
  }

  update (props) {
    this.props = props;
    return etch.update(this);
  }

  destroy () {
    return etch.destroy(this)
  }
}
