'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import ResponseContent from './response-content'

export default class ResponseView {
  constructor (props) {
    this.props = props || {};
    this.props.response = {
      status: '',
      time: '',
      jsonData: ''
    };
    etch.initialize(this);
  }

  render () {
    return (
      <div className="response">
        <ResponseContent response={this.props.response} />
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

  clear() {
    this.props.response = {
      status: '',
      time: '',
      jsonData: ''
    };
    this.update(this.props);
  }
}
