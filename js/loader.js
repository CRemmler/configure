// FUNCTIONS
// newGraph
// newCanvas

// function to setup a new graph for nodes and edges
function newGraph() {
	cy = cytoscape({
       		headless: true
	});

}


function resetCanvas() {

//        group = new Group();
	group.removeChildren();
        tempIntersectionGroup = new Group();
        permIntersectionGroup = new Group();
        tempIntersectionGroupFill = new Group();
        permIntersectionGroupFill = new Group();

        nodeId = 0;
        groupId = 0;
        edgeId = 0;
        helperId = 0;
        groupIdList = new Object(); // store which n,c,l,h are in which group
        intersectionList = [];
        drawingFirstLine = false;

	newGraph();
}

// function to setup a new canvas for drawing
function newCanvas(){

        //define and resize canvas
        $("#content").height($(window).height()-90);

        var canvasdiv = '<canvas id="canvas" width="'+$(window).width()+'" height="'+($(window).height()-90)+'"></canvas>';
        $("#content").html(canvasdiv);

	canvas=document.getElementById("canvas");
        canvasOffset = $("#canvas").offset();
	var offset = canvasOffset;

	// Setup directly from canvas id:
	paper.setup('canvas');

    	// setup canvas
        ctx=document.getElementById("canvas").getContext("2d");

        // prevent footer to toggle on touch
        $("[data-role=footer]").toolbar({ tapToggle: false });

	group = new Group();
        tempIntersectionGroup = new Group();
        permIntersectionGroup = new Group();
        tempIntersectionGroupFill = new Group();
        permIntersectionGroupFill = new Group();

        nodeId = 0;
        groupId = 0;
        edgeId = 0;
        helperId = 0;
        groupIdList = new Object(); // store which n,c,l,h are in which group
        intersectionList = [];
        drawingFirstLine = false;




	$("#canvas").on("vmousemove", function(event) {
                if (drawingFirstLine == true) {
                        if (mode == "draw") {
                                thisX = event.pageX - offset.left;
                                thisY = event.pageY - offset.top;
                                removeTempIntersections();
                                updatePoint(drawingPoint,thisX, thisY);
                                pointIntersection(event,drawingPoint.name);
                        }
                }

	});

       $("#canvas").on("vmousedown", function(event) {
                var objectClicked = hitTest(event);
                if (objectClicked == false) {
                      if ((mode != 'drag') && (mode != 'draw')) {
                                $("#drag").trigger('click');
                        }
			if (mode == "draw") {
				drawingFirstLine = true;
                        	thisX = event.pageX - offset.left;
                        	thisY = event.pageY - offset.top;
	                        initialPoint = new Point(thisX, thisY);
                        	createLine(thisX, thisY, thisX + 2, thisY + 2);
                        	dragThisLine = 'l' + (edgeId - 1);
                        	dragPoint(group.children['n' + (nodeId - 1)], thisX, thisY);
                        	drawingPoint = group.children['n' + (nodeId - 1)];
                        	transferPermtoTemp(dragThisLine);
			}
		} else {
//console.log('clicked on something');
		}
	});

	$("#canvas").on("vmouseup", function(event) {

	});


       $("#canvas").on("click", function(event) {
		var objectClicked = hitTest(event);
		if (objectClicked == false) {
                        if (mode == "draw") {
//                                createPoint(event.pageX - offset.left, event.pageY - offset.top);
                        }
		}	
        });


	function hitTest(event) {
        	var thisPoint = new Point(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);
		var objectClicked = group.hitTest(thisPoint);
		if (objectClicked != undefined ) {
			objectClicked = objectClicked.item.name;
		} else { objectClicked = false; }
		return objectClicked;
	}


        group.onClick = function(event) {
                var thisPoint = new Point(event.point.x, event.point.y);
                var objectClicked = group.hitTest(thisPoint);
                if (objectClicked != undefined ) {
                        objectClicked = objectClicked.item.name;
//			console.log('clicked on ' + objectClicked);
		}	

	}
	

}


