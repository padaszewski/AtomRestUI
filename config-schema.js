'use babel'

// config that can be seen in package-settings
 export default {
   general: {
     type: 'object',
     order: 1,
     properties: {
   autoActivation: {
     order: 2,
     type: 'boolean',
     default: false,
     title: 'Auto-Activation',
     description: 'Package is automatically activated when starting the editor.'
   }
  }
}
}
