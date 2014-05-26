svgEditor.addExtension("Network", function(S) {'use strict';

		var started, newGroup, selElems, selectedBox;
		
		function showPanel(on){
			$('#network_panel').toggle(on);
		}

		function setAttr(attr, val){
			svgCanvas.changeSelectedAttribute(attr, val);
			if( selectedBox ) {
				var boxId = $(selectedBox).attr("id");
				var textId = "#" + boxId + "-" + attr;
				var textElem = $(selectedBox).find(textId);
				if( textElem ) {
					$(textElem).text( attr + ": " + val );
				}
			}
			S.call("changed", selElems);
		}
    
		return {
			name: "Network",
			svgicons: svgEditor.curConfig.extPath + "network-icon.svg",

			buttons: [{
				id: "network",
				type: "mode",
				title: "Network",
				events: {
					'click': function() {
						svgCanvas.setMode("network");
						showPanel(true);
					}
				}
			}],

			context_tools: [{
				type: "input",
				panel: "network_panel",
				title: "IP Address",
				id: "network-ip",
				label: "IP",
				size: 12,
				defval: "0.0.0.0",
				events: {
					change: function(){
						setAttr('ip', this.value);
					}
				}
			},
			{
				type: "input",
				panel: "network_panel",
				title: "Burk",
				id: "network-burk",
				label: "Burk",
				size: 10,
				defval: "Encoder",
				events: {
					change: function(){
						setAttr('burk', this.value);
					}
				}
			}],


			mouseDown: function(opts) {
				if(svgCanvas.getMode() == "network") {

					var rgb = svgCanvas.getColor("fill");
					var sRgb = svgCanvas.getColor("stroke");
					var sWidth = svgCanvas.getStrokeWidth();
					var id = S.getNextId();
					
					var newRect = S.addSvgElementFromJson({
						"element": "rect",
						"attr": {
							"x": opts.start_x,
							"y": opts.start_y,
							"id": id + "-rect",
							"width": 100,
							"height": 50,
							"fill": rgb,
							"strokecolor": sRgb,
							"strokeWidth": sWidth
						}
					});
					
					var newText = S.addSvgElementFromJson({
						"element": "text",
						"attr": {
							"x": opts.start_x,
							"y": opts.start_y + 65,
							"id": id + "-ip",
							"font-size": "12"
						}
					});
					
					$(newText).text( "ip: " + document.getElementById("network-ip").value );

					var newText2 = S.addSvgElementFromJson({
						"element": "text",
						"attr": {
							"x": opts.start_x,
							"y": opts.start_y + 80,
							"id": id + "-burk",
							"font-size": "12"
						}
					});
					
					$(newText2).text( "burk: " + document.getElementById("network-burk").value );

					newGroup = S.addSvgElementFromJson({
						"element": "g",
						"attr": {
							"id": id,
							"shape": "network",
							"ip": document.getElementById("network-ip").value,
							"burk": document.getElementById("network-burk").value
						}
					});
					
					$(newGroup).append( $(newRect) );
					$(newGroup).append( $(newText) );
					$(newGroup).append( $(newText2) );

					return {started: true};
				}
			},

			mouseMove: function(opts){
				if (!started) {
					return;
				}
				if (svgCanvas.getMode() == "network") {
					var x = opts.mouse_x;
					var y = opts.mouse_y;
					
					newGroup.setAttributeNS(null, 'x', x);
					newGroup.setAttributeNS(null, 'y', y);
					
					return {
						started: true
					};
				}
				
			},
			
			mouseUp: function(opts) {
				if(svgCanvas.getMode() == "network") {
					return {
						keep: true,
						element: newGroup
					}
				}
			},

			selectedChanged: function(opts) {
				selElems = opts.elems;
				
				var i = selElems.length;
				var showIt = false;
				
				while (i--) {
					var elem = selElems[i];
					if (elem && elem.getAttributeNS(null, 'shape') === 'network') {
						selectedBox = opts.selectedElement;
						if (opts.selectedElement && !opts.multiselected) {
							$('#network-ip').val(elem.getAttribute("ip"));
							$('#network-burk').val(elem.getAttribute("burk"));							
							showIt = true;
						}
					}
				}
				showPanel( showIt );
			}
			
		};
});

