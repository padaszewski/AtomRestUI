'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import Body from './body.js'
import Header from './header.js'

export default class RequestContent {
  constructor (props) {
    this.props = props;
    etch.initialize(this);
  }

  render () {
    return (
      <div className="request-content">
      <Header request={this.props.request} onChange={this.props.updateHeader}/>
      <Body request={this.props.request} onChange={this.props.updateBody}/>
      </div>
    )
  }

  update (props) {
    this.props = props;
    console.log('props in request-content', this.props);
    return etch.update(this)
  }

  destroy () {
    return etch.destroy(this)
  }
}
