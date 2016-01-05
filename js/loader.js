// FUNCTIONS
// newGraph
// newCanvas

// function to setup a new graph for nodes and edges
function newGraph() {
	cy = cytoscape({
       		headless: true
	});


	nodeId = 0;
	groupId = 0;
	edgeId = 0;
	helperId = 0;


}

// function to setup a new canvas for drawing
function newCanvas(){


        //define and resize canvas
        $("#content").height($(window).height()-90);

        var canvasdiv = '<canvas id="canvas" width="'+$(window).width()+'" height="'+($(window).height()-90)+'"></canvas>';
        $("#content").html(canvasdiv);


 	//canvas = new fabric.Canvas('canvas'); // when using fabricjs

	canvas = document.getElementById('canvas');
	stage = new createjs.Stage(canvas);
	createjs.Touch.enable(stage);


    	// setup canvas
        ctx=document.getElementById("canvas").getContext("2d");

        // setup to trigger drawing on mouse or touch
       // $("#canvas").drawTouch();
       // $("#canvas").drawPointer();
       // $("#canvas").drawMouse();

        // prevent footer to toggle on touch
        $("[data-role=footer]").toolbar({ tapToggle: false });


        stage.on("stagemousedown", function(evt) {
		if (stage.getObjectUnderPoint(evt.stageX, evt.stageY) == undefined) {
			if ((mode != "draw") && (mode != "drag")) {
				$("#drag-one").trigger('click');
                                $("#drag-two").trigger('click');

			}
			if (mode == "draw") {
				createPoint(evt.stageX, evt.stageY);
			}
		}

        })



}


