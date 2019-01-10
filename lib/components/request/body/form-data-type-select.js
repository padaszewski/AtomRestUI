'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class ReqTypeSelect {
  constructor (props) {
    this.props = props;
    this.options = ['Text', 'File'];
    etch.initialize(this);
  }

  render () {
    return (
          <select defaultValue={'Text'} on={{change: this.props.updateReqType}} name={'test'}>
          {this.options.map((option) => {
            return <option value={option}> {option} </option>
          })
          }
         </select>
    )
  }

  update () {
    return etch.update(this)
  }

  destroy () {
    return etch.destroy(this)
  }
}
