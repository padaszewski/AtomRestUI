'use babel'

import { CompositeDisposable } from 'atom';

/** Container for each editor containing previews and markers*/

export default class PreviewMarkerContainer {

constructor(editor) {
  this.reqMapping = new Map();
  this.editor = editor;
  //used to unsubscribe from subs when being destroyed
  this.subscriptions = new CompositeDisposable();

  this.editor.onDidDestroy(() => {

  })

  this.rangeReqMapping = [];
}

addPreviewMarker(request, marker) {
  this.reqMapping.set(marker, request);
  this.showMarkerInEditor(marker);
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

showMarkerInEditor(marker) {
  this.editor.decorateMarker(marker, {type: 'highlight', class: "hl"});
}

refreshMarkers(editor) {
  this.editor = editor;
  console.log('markers', this.editor.getMarkers());
  Object.keys(this.reqMapping).forEach((marker) => {
    this.showMarkerInEditor(marker);
  })
}

serialize() {
  const arr = [];
  //create array of objects containing request and range of marker
  this.reqMapping.forEach((req, marker) => {
     arr.push({bufferRange: marker.getBufferRange().serialize(), request: req});
   });
   return arr;
}

deserialize(state) {
  state.forEach((obj) => {
    const marker = this.editor.markBufferRange(obj.bufferRange);
    this.addPreviewMarker(obj.request, marker);
  })
}

}
