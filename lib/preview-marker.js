'use babel'

import { CompositeDisposable } from 'atom';

/** Container for each editor containing previews and markers*/

export default class PreviewMarkerContainer {

constructor() {
  this.reqMapping = new Map();

  //used to unsubscribe from subs when being destroyed
  this.subscriptions = new CompositeDisposable();
}

addPreviewMarker(request, marker) {
  this.reqMapping.set(marker, request);

  // check for changes, e.g. marker invalidated
  const sub = marker.onDidChange(() => {
    if(!marker.isValid()) {
      this.reqMapping.delete(marker); // delete marker
      sub.dispose(); // get rid of subscription
  }
  })
}

isCursorInMarker(cursorPos) {
    for([req, marker] of requests) {
      if(marker.getBufferRange().containsPoint(cursorPos)) {
        return marker;
      }
    }
    return false;
}

serialize() {
  const arr = [];
  //create array of objects containing request and range of marker
  this.reqMapping.forEach((req, marker) => {
     arr.push({bufferRange: marker.getBufferRange().serialize(), request: req});
   });
   return arr;
}

deserialize(editor, state) {
  state.forEach((obj) => {
    const marker = editor.markBufferRange(obj.bufferRange, {invalidate: 'overlap', maintainHistory: true});
    console.log(marker);
    editor.decorateMarker(marker, {type: 'highlight', class: "hl"});
    this.addPreviewMarker(obj.request, marker);
  })
}

}
