// functions:
// drawCurve, createCurve, computeControlPoints
// drawLine, createLine
// drawPoint, createPoint
// getCurvesFromSpline
// drawIntersectionPoint
// drawIntersectionLine

var startX, startY;



function drawCurve(object,x1,y1,hx,hy,x2,y2) {
        object.x1 = x1;
        object.y1 = y1;
        object.hx = hx;
        object.hy = hy;
        object.x2 = x2;
        object.y2 = y2;

        /*grab (x,y) coordinates of the control points*/
        var x=new Array();
        var y=new Array();
        x[0] = x1; y[0] = y1;
        x[1] = hx; y[1] = hy;
        x[2] = x2; y[2] = y2;

        /*computes control points p1 and p2 for x and y direction*/
        var px = computeControlPoints(x);
        var py = computeControlPoints(y);

        object.helper1x = px.p1[0];
        object.helper1y = py.p1[0];
        object.helper2x = px.p2[0];
        object.helper2y = py.p2[0];
        object.helper3x = px.p1[1];
        object.helper3y = py.p1[1];
        object.helper4x = px.p2[1];
        object.helper4y = py.p2[1];

	object.graphics.clear();
        object.graphics.setStrokeStyle(12).beginStroke('#91b6c2');

        object.graphics.moveTo(x1,y1);
        object.graphics.bezierCurveTo(px.p1[0],py.p1[0],px.p2[0],py.p2[0],hx,hy);
        object.graphics.bezierCurveTo(px.p1[1],py.p1[1],px.p2[1],py.p2[1],x2,y2);
        object.graphics.endStroke();
        stage.update();
}

function createCurve(x1,y1,hx,hy,x2,y2) {

        /*grab (x,y) coordinates of the control points*/
        var x=new Array();
        var y=new Array();

	x[0] = x1; y[0] = y1;
	x[1] = hx; y[1] = hy;
	x[2] = x2; y[2] = y2;

        /*computes control points p1 and p2 for x and y direction*/
        var px = computeControlPoints(x);
        var py = computeControlPoints(y);

        var smoothCurve = new createjs.Shape();
        smoothCurve.graphics.setStrokeStyle(12).beginStroke('#91b6c2');
        smoothCurve.graphics.moveTo(x[0], y[0]);
        smoothCurve.graphics.bezierCurveTo(px.p1[0],py.p1[0],px.p2[0],py.p2[0],x[1],y[1]);
        smoothCurve.graphics.bezierCurveTo(px.p1[1],py.p1[1],px.p2[1],py.p2[1],x[2],y[2]);
        smoothCurve.graphics.endStroke();
	smoothCurve.name = 'c' + edgeId;

	smoothCurve.x1 = x1;
	smoothCurve.y1 = y1;
	smoothCurve.hx = hx;
	smoothCurve.hy = hy;
	smoothCurve.x2 = x2;
	smoothCurve.y2 = y2;
	smoothCurve.helper1x = px.p1[0];
	smoothCurve.helper1y = py.p1[0];
	smoothCurve.helper2x = px.p2[0];
	smoothCurve.helper2y = py.p2[0];
        smoothCurve.helper3x = px.p1[1];
        smoothCurve.helper3y = py.p1[1];
        smoothCurve.helper4x = px.p2[1];
        smoothCurve.helper4y = py.p2[1];

	smoothCurve.groupId = "g" + groupId;

        smoothCurve.addEventListener("click", function(event) {
                switch (mode) {
                        case "toggle":
                                toggleCurve(event.currentTarget.name);
                                break;
                        case "erase":
                                erase(event.currentTarget.name);
                                break;
                        case "cut":
// 0 is lowest way to cut
                                cutEdge(event.currentTarget.name, event.stageX, event.stageY, 5, 5);
                                break;
                        case "draw":
                                cutEdge(event.currentTarget.name, event.stageX, event.stageY, 0, 0);
                                glue(event.stageX, event.stageY);

console.log('draw a point on this curve');
                                break;
                }
	});
//console.log('adding curve groupId ' + smoothCurve.groupId);
        addToGroupIdList(smoothCurve.groupId, smoothCurve.name);

        smoothCurve.addEventListener("mousedown", function(event) {
                startX = event.stageX;
                startY = event.stageY;
        })

        smoothCurve.on("pressmove", function(evt){
                removeIntersections();
                dragCurve(evt); //dragging.js
                edgeIntersection(evt);


        });

        smoothCurve.on("mousedown", function(evt) {
		removeIntersections();
        });



        stage.addChild(smoothCurve);
        stage.update();

        createPoint(x1,y1);
        createHelper(hx,hy);
        createPoint(x2,y2);

        cy.add({
                group: "edges",
                data: { id: 'c' + edgeId, source: 'n' + (nodeId - 2) , target: 'n' + (nodeId - 1)  }
        });

        edgeId++;
        groupId++;

}

/*computes control points given knots K, this is the brain of the operation*/
function computeControlPoints(K)
{
        p1=new Array();
        p2=new Array();
        n = K.length-1;

        /*rhs vector*/
        a=new Array();
        b=new Array();
        c=new Array();
        r=new Array();

        /*left most segment*/
        a[0]=0;
        b[0]=2;
        c[0]=1;
        r[0] = K[0]+2*K[1];

        /*internal segments*/
        for (i = 1; i < n - 1; i++)
        {
                a[i]=1;
                b[i]=4;
                c[i]=1;
                r[i] = 4 * K[i] + 2 * K[i+1];
        }

        /*right segment*/
        a[n-1]=2;
        b[n-1]=7;
        c[n-1]=0;
        r[n-1] = 8*K[n-1]+K[n];

        /*solves Ax=b with the Thomas algorithm (from Wikipedia)*/
        for (i = 1; i < n; i++)
        {
                m = a[i]/b[i-1];
                b[i] = b[i] - m * c[i - 1];
                r[i] = r[i] - m*r[i-1];
        }

        p1[n-1] = r[n-1]/b[n-1];
        for (i = n - 2; i >= 0; --i)
                p1[i] = (r[i] - c[i] * p1[i+1]) / b[i];

        /*we have p1, now compute p2*/
        for (i=0;i<n-1;i++)
                p2[i]=2*K[i+1]-p1[i+1];

        p2[n-1]=0.5*(K[n]+p1[n-1]);

        return {p1:p1, p2:p2};
}

function drawHelper(object,x,y) {

	object.graphics.clear();
        object.graphics.setStrokeStyle(3).beginStroke("#528494").beginFill('#cedee4').drawRect(x - 6, y - 6, 12, 12);
	object.x1 = x;
	object.y1 = y;
        stage.update();

}

function drawLine(object,x1,y1,x2,y2) {
//console.log('draw ' + object.id() + ' at ' + x1 + ', ' + y1 + ', ' + x2 + ', ' + y1);
	object.graphics.clear();
        object.graphics.setStrokeStyle(12).beginStroke('#91b6c2');
        object.graphics.moveTo(x1,y1);
        object.graphics.lineTo(x2,y2);
        object.graphics.endStroke();
	object.x1 = x1;
	object.y1 = y1;
	object.x2 = x2;
	object.y2 = y2;
	stage.update();
}



function drawPoint(object,x,y) {


	object.graphics.clear();
        object.graphics.setStrokeStyle(3).beginStroke("#528494").beginFill("#cedee4").drawCircle(x, y, 8);
	object.x1 = x;
	object.y1 = y;
	object.oldX = x;
	object.oldY = y;
	stage.update();
	
}



function drawIntersectionPoint(x,y,color,fill) {
        var x1,y1,x2,y2;
        var circle = new createjs.Shape();
        circle.graphics.setStrokeStyle(3).beginStroke(color).beginFill(fill).drawCircle(x, y, 8);
        circle.type = 'point';
        circle.name = 'intersection' + intersectionList.length;
	intersectionList.push(circle.name);
	stage.addChild(circle);
	stage.update();
}

function drawIntersectionHelper(x,y,color,fill) {

	var helper = new createjs.Shape();
        helper.graphics.clear();
        helper.graphics.setStrokeStyle(3).beginStroke("#528494").beginFill('#cedee4').drawRect(x - 6, y - 6, 12, 12);
	helper.name = 'intersection' + intersectionList.length;
	intersectionList.push(helper.name);
	stage.addChild(helper);
        stage.update();
}


function drawIntersectionLine(edge) {
        var line = new createjs.Shape();

	var thisEdge = stage.getChildByName(edge.id());
        line.graphics.setStrokeStyle(12).beginStroke("orange");
        line.graphics.moveTo(thisEdge.x1, thisEdge.y1);
        line.graphics.lineTo(thisEdge.x2, thisEdge.y2);
        line.graphics.endStroke();
        line.name = 'intersection' + intersectionList.length;
        intersectionList.push(line.name);


	stage.addChild(line);
	stage.update();
}

function drawIntersectionCurve(edge) {
        var curve = new createjs.Shape();
	var e = stage.getChildByName(edge.id());

        curve.graphics.setStrokeStyle(12).beginStroke('orange');
        curve.graphics.moveTo(e.x1, e.y1);

	curve.graphics.bezierCurveTo(e.helper1x,e.helper1y,e.helper2x,e.helper2y,e.hx,e.hy);
	curve.graphics.bezierCurveTo(e.helper3x,e.helper3y,e.helper4x,e.helper4y,e.x2,e.y2);
        curve.graphics.endStroke();
        curve.name = 'intersection' + intersectionList.length;
        intersectionList.push(curve.name);

	stage.addChild(curve);
	stage.update();
}


function createPoint(x,y) {

	var x1,y1,x2,y2;
	var circle = new createjs.Shape();
        circle.graphics.setStrokeStyle(3).beginStroke("#528494").beginFill("#cedee4").drawCircle(x, y, 8);

	circle.type = 'point';
	circle.groupId = 'g' + groupId;
	circle.name = 'n' + nodeId;
	circle.x1 = x;
	circle.y1 = y;
	circle.oldX = x;
	circle.oldY = y;

        addToGroupIdList(circle.groupId, circle.name);

        circle.addEventListener("click", function(event) {

		switch (mode) {
			case "glue":
				glue(event.stageX, event.stageY);
				break;
			case "cut":
				cutNode(event.currentTarget.name, 5, 5);
				break;
			case "erase":
                                erasePoint(event.currentTarget.name);
                                break;

		}
		dragPoint(event);
	})

	stage.addChild(circle);
	stage.update();

	cy.add({
    		group: "nodes",
    		data: { id: 'n' + nodeId }
	});

	nodeId++;

	circle.on("pressmove", function(evt){
		switch (mode) {
			case "drag":
                		removeIntersections();
                		dragPoint(evt);
                		pointIntersection(evt);
				break;
			case "draw":
        			updatePoint(drawingPoint,evt.stageX,evt.stageY);
				break;
		}

	});

//var myVar;
        circle.on("mousedown", function(evt) {

                removeIntersections();
//myVar = setInterval(myTimer, 100);
//thisEvent = evt;

		if (mode == "draw") {
			createLine(evt.currentTarget.x1,evt.currentTarget.y1,evt.currentTarget.x1 + 6, evt.currentTarget.y1);
			glue(evt.currentTarget.x1 - 6,evt.currentTarget.y1);

			drawingPoint = stage.getChildByName('n' + (nodeId - 1));
			evt.currentTarget.x1 = evt.currentTarget.x1 + 12;
			evt.currentTarget.y1 = evt.currentTarget.y1 + 12;
		}

        });
//function myTimer() {
//                removeIntersections();
//                dragPoint(thisEvent);
//                pointIntersection(thisEvent);
//}

        circle.on("pressup", function(evt){

		if (mode == "draw") {
                	glue(evt.stageX, evt.stageY);
			updatePoint(drawingPoint, evt.stageX, evt.stageY);
                	pointIntersection(evt);
		}
		if (mode == "drag") {

		}
//clearInterval(myVar);
        });

}



function createHelper(x,y) {

        var helper = new createjs.Shape();
        helper.graphics.setStrokeStyle(3).beginStroke("#528494").beginFill('#cedee4').drawRect(x - 6, y - 6, 12, 12);
        helper.type = 'point';
        helper.nodeId = 'n' + nodeId;
        helper.groupId = 'g' + groupId;
        helper.name = 'h' + edgeId;
	helper.x1 = x;
	helper.y1 = y;

        addToGroupIdList(helper.groupId, helper.name);

        helper.addEventListener("click", function(event) {
//		console.log(event.currentTarget.name + ' was clicked '  + event.currentTarget.groupId); 
	});
        stage.addChild(helper);
        stage.update();
        helperId++;

	helper.on("pressmove", function(evt){
		//dragHelper(evt);


                removeIntersections();
                dragHelper(evt);
                helperIntersection(evt);


	});

}

function createLine(x1, y1, x2, y2) {
	var line = new createjs.Shape();

	line.graphics.setStrokeStyle(12).beginStroke('#91b6c2');
	line.graphics.moveTo(x1,y1);
	line.graphics.lineTo(x2,y2);
	line.graphics.endStroke();
	line.groupId = 'g' + groupId;
	line.name = 'l' + edgeId;
	line.x1 = x1;
	line.y1 = y1;
	line.x2 = x2;
	line.y2 = y2;

        line.addEventListener("click", function(event) {

                switch (mode) {
                        case "toggle":
                        	toggleLine(event.currentTarget.name);
                                break;
                        case "erase":
 	                        erase(event.currentTarget.name);
                                break;
                        case "cut":
				cutEdge(event.currentTarget.name, event.stageX, event.stageY, 5, 5);
                                break;
			case "draw":
console.log('draw a point on this line');
                                cutEdge(event.currentTarget.name, event.stageX, event.stageY, 0, 0);
console.log('before glue');
for (key in groupIdList) {
  console.log('groupIdList[' + key + '] ' + groupIdList[key]);
}
				glue(event.stageX, event.stageY);
				break;

                }

	});

        addToGroupIdList(line.groupId, line.name);
 
	stage.addChild(line);
	stage.update();

	createPoint(x1,y1);
	createPoint(x2,y2);
	cy.add({
    		group: "edges",
    		data: { id: 'l' + edgeId, source: 'n' + (nodeId - 2) , target: 'n' + (nodeId - 1)  }
	});

        line.addEventListener("mousedown", function(event) { 
		startX = event.stageX;
		startY = event.stageY;
	})

	line.on("pressmove", function(evt){
                removeIntersections();

		dragLine(evt);
                edgeIntersection(evt);

	});

        line.on("mousedown", function(evt) {
                removeIntersections();

        });


        edgeId++;
        groupId++;
}



