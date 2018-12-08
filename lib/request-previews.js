/** @babel */

import {CompositeDisposable} from 'atom'


export default class RequestPreviewMarkers {
  constructor(editor, markerLayer) {
    this.editor = editor
    this.markerLayer = markerLayer;
    this.decorationLayer = this.editor.decorateMarkerLayer(this.markerLayer, {type: "highlight", class: "hl"})
    this.disposables = new CompositeDisposable()
    this.disposables.add(atom.commands.add(atom.views.getView(this.editor), {

    }))
    this.disposables.add(this.editor.onDidDestroy(this.destroy.bind(this)))
  }


  destroy () {
    this.deactivate()
    this.markerLayer.destroy()
  }

  deactivate () {
    this.decorationLayer.destroy()
    this.disposables.dispose()
  }

  serialize () {
    return {markerLayerId: this.markerLayer.id}
  }

}
