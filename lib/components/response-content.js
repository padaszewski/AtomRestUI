'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class ResponseContent {
  constructor (props) {
    this.props = props;
    this.bodyContent = null;
    this.headerContent = null;
    this.props.response = {
      status: 200,
      time: 20
    }

    etch.initialize(this);
  }

  render () {
    return (
      <div className="response">
        <div id="response-header">
          <div>Status:{this.props.response.status} </div>
          <div>Time: {this.props.response.time} ms </div>
          </div>
        <label>
        Reponse:
        <textarea value={JSON.stringify(this.props.response)} />
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
