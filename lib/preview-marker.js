'use babel'

export default class PreviewMarkerContainer {

constructor() {
  this.reqMapping = new Map();
}

addPreviewMarker(request, marker) {

  this.reqMapping.set(marker, request);
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
    const marker = editor.markBufferRange(obj.bufferRange);
    console.log(marker);
    editor.decorateMarker(marker, {type: 'highlight', class: "hl"});
    this.addPreviewMarker(obj.request, marker);
  })
}

}
