'use babel'
/** @jsx etch.dom */

import etch from 'etch'

export default class FormDataBody {
  constructor (props) {
    this.props = props;
    this.keyValPairs = new Map();
    this.type = 'json';

    etch.initialize(this);
  }

  render () {
    return (
      <div class="req-body">
        <label for="body">Body
          {(() => {
        switch(this.type) {
          case 'json':
            return <textarea value={this.props.request.body} on={{input: this.props.onChange }} name="body"/>;
          case 'form-data':
            return <Warning text={text} />;
          default:
            return null;
        }
      })()}
        </label>
        {(() => {
        try {
          console.log('req-body', this.props.request.body);
          JSON.parse(this.props.request.body);
          return null;
        } catch(err) {
          return <div>Invalid body (must be JSON)!</div>
        }
      }
    )()}
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
