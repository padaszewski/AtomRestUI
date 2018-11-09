'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class ReqTypeSelect {
  constructor (props) {
    this.props = props;
    this.options = ['GET', 'POST', 'PUT', 'DELETE'];
    etch.initialize(this);
  }

  render () {
    return (
          <select defaultValue={'lul'} name={'test'}>
          {this.options.map((option) => {
            return <option>{option}</option>
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
