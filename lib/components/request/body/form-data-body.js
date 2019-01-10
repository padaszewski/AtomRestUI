'use babel'
/** @jsx etch.dom */

import etch from 'etch'

import FormDataRow from './form-data-row.js';

export default class FormDataBody {
  constructor (props) {
    this.props = props;
    this.keyValPairs = new Map();
    etch.initialize(this);
    this.type = 'json';
  }

  render () {
    return (
      <div>
      <FormDataRow />
      {
        Object.entries(this.keyValPairs).forEach((val, key) => {
          return <FormDataRow value={val} key={key} />
        }

      }
      </div>
    )
  }

  update (props) {
    this.props = props;
    console.log('body:', props);
    return etch.update(this);
  }

  destroy () {
    return etch.destroy(this)
  }
}
