/*globals svgEditor*/

svgEditor.setConfig({
extensions: ['ext-network.js',
'ext-overview_window.js','ext-markers.js','ext-connector.js','ext-eyedropper.js','ext-shapes.js','ext-imagelib.js','ext-grid.js','ext-panning.js','ext-storage.js'],
//emptyStorageOnDecline: true
	allowedOrigins: [window.location.origin] // May be 'null' (as a string) when used as a file:// URL
});
