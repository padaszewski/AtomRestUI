'use babel'

export default class PreviewMarkerContainer {

constructor(editor) {
  this.requests = new Map();
  this.editor = editor;
}

addPreviewMarker(request, marker) {

  this.requests.set(marker, request);
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
  this.requests.forEach((req, marker) => {
     arr.push({bufferRange: marker.getBufferRange().serialize(), request: req});
   });

   return arr;

}

}
