'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class ResponseContent {
  constructor (props) {
    this.props = props;

    etch.initialize(this);
  }

  render () {
    return (
      <div className="response">
        <div className="response-header">

          <div>Status: {this.props.response.status} </div>
          <div>Time: {this.props.response.time} {this.props.response.time !== '' ? 'ms' : ''} </div>
          </div>
        <label>
        <textarea className="response-content" value={this.props.response.jsonData} />
        </label>
      </div>
    )
  }

  update (props) {
    console.log('props in response content', props);
    this.props = props;
    return etch.update(this)
  }

  destroy () {
    return etch.destroy(this)
  }
}
