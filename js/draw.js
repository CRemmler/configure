// functions:
// drawCurve, createCurve, computeControlPoints
// drawLine, createLine
// drawPoint, createPoint
// getCurvesFromSpline
// drawIntersectionPoint
// drawIntersectionLine

var startX, startY;



function drawCurve(object,x1,y1,hx,hy,x2,y2) {

        /*grab (x,y) coordinates of the control points*/
        var x=new Array();
        var y=new Array();

        x[0] = x1; y[0] = y1;
        x[1] = hx; y[1] = hy;
        x[2] = x2; y[2] = y2;

        /*computes control points p1 and p2 for x and y direction*/
        var px = computeControlPoints(x);
        var py = computeControlPoints(y);
        object.segments[0].handleOut.x = px.p1[0] - x1; //x1 -  px.p1[0];
        object.segments[0].handleOut.y = py.p1[0] - y1; //y1 - py.p1[0];
        object.segments[1].handleIn.x = px.p2[0] - hx; //hx - px.p2[0];
        object.segments[1].handleIn.y = py.p2[0] - hy; //hy - py.p2[0];
        object.segments[1].handleOut.x = px.p1[1] - hx; //hx - px.p1[1];
        object.segments[1].handleOut.y = py.p1[1] - hy; //hy - py.p1[1];
        object.segments[2].handleIn.x = px.p2[1] - x2; //x2 - px.p2[1];
        object.segments[2].handleIn.y = py.p2[1] - y2; //y2 - py.p2[1];
        object.segments[0].point.x = x1;
        object.segments[0].point.y = y1;
        object.segments[1].point.x = hx;
        object.segments[1].point.y = hy;
        object.segments[2].point.x = x2;
        object.segments[2].point.y = y2;
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

        var curve = new Path();
        curve.strokeWidth = 15;
        curve.strokeColor = '#91b6c2';
        curve.add(new Point(x1, y1), new Point(hx, hy), new Point(x2, y2));

//	curve.moveTo(new Point(x1,y1);
//	curve.cubicCurveTo(new Point(px.p1[0],py.p1[0]), new Point(px.p2[0], py.p2[0]), new Point(hx, hy);
//	curve.cubicCurveTo(new Point(px.p1[1],py.p1[1]), new Point(px.p2[1], py.p2[1]), new Point(x2, y2);
        curve.closed = false;
        curve.name = 'c' + edgeId;
        curve.groupId = 'g' + groupId;
	curve.helperX = hx;
	curve.helperY = hy;
//	curve.smooth();
        group.addChild(curve);

	curve.segments[0].handleOut.x = px.p1[0] - x1; //x1 -  px.p1[0];
	curve.segments[0].handleOut.y = py.p1[0] - y1; //y1 - py.p1[0];
        curve.segments[1].handleIn.x = px.p2[0] - hx; //hx - px.p2[0];
        curve.segments[1].handleIn.y = py.p2[0] - hy; //hy - py.p2[0];
        curve.segments[1].handleOut.x = px.p1[1] - hx; //hx - px.p1[1];
        curve.segments[1].handleOut.y = py.p1[1] - hy; //hy - py.p1[1];
        curve.segments[2].handleIn.x = px.p2[1] - x2; //x2 - px.p2[1];
        curve.segments[2].handleIn.y = py.p2[1] - y2; //y2 - py.p2[1];

        curve.onClick = function(event) {
                switch (mode) {
                        case "toggle":
                                toggleCurve(this.name);
                                drawAllIntersections();

                                break;
                        case "erase":
                               erase(this.name);
                                drawAllIntersections();

			       break;
                        case "cut":
                                cutEdge(this.name, event.point.x, event.point.y, 5);
                                drawAllIntersections();

				 break;
        //                case "draw":
        //                        cutEdge(this.name,event.point.x,event.point.y,0,0);
        //                        glue(event.point.x, event.point.y);
        //                        break;
                }
	}
        addToGroupIdList(curve.groupId, curve.name);

        curve.onMouseDown = function (evt) {
                if (mode == "draw") {
                        cutEdge(this.name, evt.point.x, evt.point.y, 0);
                        glue(evt.point.x, evt.point.y);

                        thisX = evt.point.x;
                        thisY = evt.point.y
                        createLine(thisX, thisY, thisX + 20, thisY + 20);
                        dragThisLine = 'l' + (edgeId - 1);
                        glue(thisX,thisY);

                        initialPoint = new Point(thisX, thisY);

                        dragPoint(group.children['n' + (nodeId - 1)], thisX, thisY);
                        drawingPoint = group.children['n' + (nodeId - 1)];

                        transferPermtoTemp(dragThisLine);

                } else {

	                transferPermtoTemp(this.name);
	                startX = evt.point.x;
	                startY = evt.point.y;
		}
	}

        curve.onMouseUp = function (evt) {
                if (mode == "draw") {
//                        glue(evt.point.x, evt.point.y);
//                        updatePoint(drawingPoint, evt.point.x, evt.point.y);
//                        toggleLine(dragThisLine);
                } 
	        transferTempToPerm();
        }

        curve.onMouseDrag = function (evt) {
                if (mode == "draw") {
                               removeTempIntersections();
                                updatePoint(drawingPoint,evt.point.x, evt.point.y);
                                pointIntersection(evt,drawingPoint.name);
                } else {
        	        removeTempIntersections();
               		dragCurve(group.children[this.name],evt.point.x,evt.point.y);
                	edgeIntersection(evt, this.name);
		}
	}

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
        var offsetX = object.segments[0].point.x - x;
        var offsetY = object.segments[0].point.y - y;
//console.log('drawHelper ' + object.name + ' ' + x + ',' + y); 
        object.segments[0].point.x = object.segments[0].point.x - offsetX;
        object.segments[0].point.y = object.segments[0].point.y - offsetY;
        object.segments[1].point.x = object.segments[1].point.x - offsetX;
        object.segments[1].point.y = object.segments[1].point.y - offsetY;
        object.segments[2].point.x = object.segments[2].point.x - offsetX;
        object.segments[2].point.y = object.segments[2].point.y - offsetY;
        object.segments[3].point.x = object.segments[3].point.x - offsetX;
        object.segments[3].point.y = object.segments[3].point.y - offsetY;
}

function drawLine(object,x1,y1,x2,y2) {
//console.log('drawLine');
	//console.log('drawLine ' + object.name + ' from ' + x1 + ',' + y1 + ',' + x2 + ',' + y2);
        object.segments[0].point.x = x1;
        object.segments[0].point.y = y1;
        object.segments[1].point.x = x2;
        object.segments[1].point.y = y2;
}

function drawPoint(object,x,y) {
        var offsetX = object.segments[0].point.x - x;
        var offsetY = object.segments[0].point.y - y;
        object.segments[0].point.x = object.segments[0].point.x - offsetX;
        object.segments[0].point.y = object.segments[0].point.y - offsetY;
        object.segments[1].point.x = object.segments[1].point.x - offsetX;
        object.segments[1].point.y = object.segments[1].point.y - offsetY;
        object.segments[2].point.x = object.segments[2].point.x - offsetX;
        object.segments[2].point.y = object.segments[2].point.y - offsetY;
        object.segments[3].point.x = object.segments[3].point.x - offsetX;
        object.segments[3].point.y = object.segments[3].point.y - offsetY;


}



function drawIntersectionPoint(x,y,color,fill) {



//        var x1,y1,x2,y2;
//        var circle = new createjs.Shape();
//        circle.graphics.setStrokeStyle(3).beginStroke(color).beginFill(fill).drawCircle(x, y, 8);
//        circle.type = 'point';
//        circle.name = 'intersection' + intersectionList.length;
//	intersectionList.push(circle.name);
//	stage.addChild(circle);
//	stage.update();
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

        function completeHitTest(point, nodes, edges) {
                var thisObject;
                var objectsFound = [];
                var foundAllObjects = false;
                while (foundAllObjects == false) {
                        thisObject = group.hitTest(point);
                        if (thisObject == false) {
                                foundAllObjects = true;
                        } else {
                                //is thisObject in objectsFound?
                                for (j=0;j<objectsFound.length;j++) {
                                        if (thisObject.item.name == objectsFound[j]) {
                                                foundAllObjects = true;
                                                j = objectsFound.length;
                                        }
                                }
                                if (foundAllObjects == false) {
					objectsFound.push(thisObject.item.name);
                                        thisObject.item.sendToBack();
                                }
                        }
                }
		var requestedObjectsFound = [];
		for (s=0;s<objectsFound.length;s++) {
			if (objectsFound[s][0] == "n") {
				if (nodes) { requestedObjectsFound.push(objectsFound[s]); }
			}
			if ((objectsFound[s][0] == "l") || (objectsFound[s][0] == "c")) {
				if (edges) { requestedObjectsFound.push(objectsFound[s]); }
			}
		}
                return requestedObjectsFound;
        }


function createPoint(x,y) {
	var circle = new Path.Circle(new Point(x, y), 8);
	circle.fillColor = "#cedee4";
	circle.strokeWidth = 3;
	circle.strokeColor = "#528494";
	circle.name = 'n' + nodeId;
	circle.groupId = 'g' + groupId;
	circle.smooth();
	group.addChild(circle);
        addToGroupIdList(circle.groupId, circle.name);
	paper.view.draw();

	circle.onClick = function(event) {
//console.log('circle.onClick at ' + event.point.x + ',' + event.point.y);
		switch (mode) {
			case "glue":
				glue(event.point.x, event.point.y);
			        drawAllIntersections();

				break;
			case "cut":
				cutNode(this.name,5);
                                drawAllIntersections();

				break;
			case "erase":
				erasePoint(this.name);
                                drawAllIntersections();

				break;
		}
	}

	cy.add({
    		group: "nodes",
    		data: { id: 'n' + nodeId }
	});

	nodeId++;

	circle.onMouseDrag = function (evt) {
		switch (mode) {
			case "drag":
                		removeTempIntersections();
		                dragPoint(group.children[this.name],evt.point.x, evt.point.y);
                		pointIntersection(evt,this.name);
				break;
			case "draw":

                                removeTempIntersections();
                                updatePoint(drawingPoint,evt.point.x, evt.point.y);
                                pointIntersection(evt,this.name);
				break;
		}
	}  
	
	circle.onMouseDown = function (evt) {

		transferPermtoTemp(this.name);
		var thisX, thisY;
		if (mode == "draw") {
			thisX = group.children[this.name].segments[0].point.x;
			thisY = group.children[this.name].segments[0].point.y;
			createLine(thisX, thisY, thisX + 20, thisY + 20);
			dragThisLine = 'l' + (edgeId - 1);
			glue(thisX,thisY);

			initialPoint = new Point(thisX, thisY);
			dragPoint(group.children['n' + (nodeId - 1)], thisX, thisY);
			drawingPoint = group.children['n' + (nodeId - 1)];
		}
	}

	circle.onMouseUp = function (evt) {
//console.log('circle.onMouseUp');

                transferTempToPerm();
		if (mode == "draw") {
//console.log('drawingPoint ' + drawingPoint.segments[0].point.x + ',' + drawingPoint.segments[0].point.y);
//console.log('initialPoint ' + initialPoint.x + ',' + initialPoint.y);
			drawingFirstLine = false;

                        //if drawingPoint and initialPoint are too close together
			if (distance(drawingPoint.segments[0].point.x,drawingPoint.segments[0].point.y,initialPoint.x,initialPoint.y) < 20) {
				erase(dragThisLine);

				createPoint(evt.point.x, evt.point.y);
				glue(evt.point.x, evt.point.y);

				groupId++;
			} else {

				var thisPoint = new Point(evt.point.x, evt.point.y);
				var nodesClicked = completeHitTest(thisPoint, true, false);
				var edgesClicked = completeHitTest(thisPoint, false, true);
				if (edgesClicked.length > 1) {
		 			cutEdge(edgesClicked[1], evt.point.x, evt.point.y, 0);          
				}
				glue(evt.point.x, evt.point.y);

				updatePoint(drawingPoint, evt.point.x, evt.point.y);
				toggleLine(dragThisLine);
				drawAllIntersections();
			}
		}
		if (mode == "drag") {
		}
	}

}


function distance(x1,y1,x2,y2) {
	var a = x1 - x2;
	var b = y1 - y2;
	var c = Math.sqrt( a*a + b*b );
	return c;
}

function createHelper(x,y) {

        var helper = new Path();
        helper.add(new Point(x - 7, y - 7), new Point(x + 7, y - 7), new Point(x + 7, y + 7), new Point(x - 7 , y + 7));
        helper.fillColor = "#cedee4";
       helper.strokeWidth = 3;
       helper.strokeColor = "#528494";
       helper.name = 'h' + edgeId;
        helper.groupId = 'g' + groupId;
	helper.closed = true;
        group.addChild(helper);

        addToGroupIdList(helper.groupId, helper.name);

        helper.onClick = function(event) {
	}

        helper.onMouseDrag = function (evt) {
                removeTempIntersections();
		dragHelper(group.children[this.name],evt.point.x, evt.point.y);
                helperIntersection(evt, this.name);
	}
        helper.onMouseDown = function (evt) {
                transferPermtoTemp(this.name);
        }

        helper.onMouseUp = function (evt) {
                transferTempToPerm();
	}
}

function createLine(x1, y1, x2, y2) {
//console.log('createLine ' + x1 + ','  + y1 + ',' + x2 + ',' + y2);
	var line = new Path();
	line.strokeWidth = 15;
	line.strokeColor = '#91b6c2';
	line.add(new Point(x1, y1), new Point(x2, y2));
	line.closed = false;
        line.name = 'l' + edgeId;
        line.groupId = 'g' + groupId;
        group.addChild(line);

        line.onClick = function(event) {
//console.log('line.onClick');
                switch (mode) {
                        case "toggle":
				toggleLine(this.name);
                                drawAllIntersections();

                                break;
                        case "erase":
				erase(this.name);
                                drawAllIntersections();

			      break;

                        case "cut":
				cutEdge(this.name, event.point.x, event.point.y, 5);
                                drawAllIntersections();

				break;
			case "draw":
//				cutEdge(this.name, event.point.x, event.point.y,0);
//				glue(event.point.x, event.point.y);
				break;
                }
	}

        addToGroupIdList(line.groupId, line.name);
 
	createPoint(x1,y1);
	createPoint(x2,y2);
	cy.add({
    		group: "edges",
    		data: { id: 'l' + edgeId, source: 'n' + (nodeId - 2) , target: 'n' + (nodeId - 1)  }
	});

 
        line.onMouseDown = function (evt) {
//console.log('line.onMouseDown');
		if (mode == "draw") {
			cutEdge(this.name, evt.point.x, evt.point.y, 0);
			glue(evt.point.x, evt.point.y);
			thisX = evt.point.x;
			thisY = evt.point.y
                        createLine(thisX, thisY, thisX + 20, thisY + 20);
                        dragThisLine = 'l' + (edgeId - 1);
                        glue(thisX,thisY);

                        initialPoint = new Point(thisX, thisY);
                        dragPoint(group.children['n' + (nodeId - 1)], thisX, thisY);
                        drawingPoint = group.children['n' + (nodeId - 1)];
	                transferPermtoTemp(dragThisLine);
		} else {
	                transferPermtoTemp(this.name);
			startX = evt.point.x;
			startY = evt.point.y;
		}

	}

        line.onMouseUp = function (evt) {
//console.log('line.onMouseUp');
                if (mode == "draw") {
                   //     glue(evt.point.x, evt.point.y);
                   //     updatePoint(drawingPoint, evt.point.x, evt.point.y);
                   //     toggleLine(dragThisLine);
                } 
	        transferTempToPerm();
        }


        line.onMouseDrag = function (evt) {
//console.log('line.onMouseDrag');
		if (mode == "draw") {
                        removeTempIntersections();
                        updatePoint(drawingPoint,evt.point.x, evt.point.y);

			    pointIntersection(evt,drawingPoint.name);
		} else {
	                removeTempIntersections();
 	                dragLine(group.children[this.name],evt.point.x,evt.point.y);

  	                edgeIntersection(evt, this.name);
		}
	}

        edgeId++;
        groupId++;
}



