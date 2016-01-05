//FUNCTION dragging.js
//dragCircle
//dragLine
//dragHelper
//dragCurve
//setupLine
//setupCurve
//pointIntersection
//edgeIntersection
//helperIntersection

function colorIntersection(thisX, thisY) {
//console.log('color at ' + thisX + ', ' + thisY);
	drawIntersectionPoint(thisX, thisY,"red","orange");
}


function whatever() {
//DRAW INTERSECTION LINES
	if (firstEdge.id()[0] == "l") {drawIntersectionLine(firstEdge);} else {drawIntersectionCurve(firstEdge);}
        if (secondEdge.id()[0] == "l") {drawIntersectionLine(secondEdge);} else {drawIntersectionCurve(secondEdge);}
	if ((firstEdge.id()[0] == 'l') || (firstEdge.id()[0] == 'c')) {
		var targetName = cy.$('#' + firstEdge.id()).target().id();
		var targetX = stage.getChildByName(targetName).x1;
		var targetY = stage.getChildByName(targetName).y1;
		drawIntersectionPoint(targetX,targetY,"#528494","#cedee4");
		var sourceName = cy.$('#' + firstEdge.id()).source().id();
		var sourceX = stage.getChildByName(sourceName).x1;
		var sourceY = stage.getChildByName(sourceName).y1;
		drawIntersectionPoint(sourceX,sourceY,"#528494","#cedee4");
		if (firstEdge.id()[0] == 'c') {
			var helperX = stage.getChildByName(firstEdge.id()).hx;
			var helperY = stage.getChildByName(firstEdge.id()).hy;
			drawIntersectionHelper(helperX,helperY);
		}
	}
        if ((secondEdge.id()[0] == 'l') || (secondEdge.id()[0] == 'c')) {
                var targetName = cy.$('#' + secondEdge.id()).target().id();
                var targetX = stage.getChildByName(targetName).x1;
                var targetY = stage.getChildByName(targetName).y1;
                drawIntersectionPoint(targetX,targetY,"#528494","#cedee4");
                var sourceName = cy.$('#' + secondEdge.id()).source().id();
                var sourceX = stage.getChildByName(sourceName).x1;
                var sourceY = stage.getChildByName(sourceName).y1;
                drawIntersectionPoint(sourceX,sourceY,"#528494","#cedee4");
                if (secondEdge.id()[0] == 'c') {
                        var helperX = stage.getChildByName(secondEdge.id()).hx;
                        var helperY = stage.getChildByName(secondEdge.id()).hy;
                        drawIntersectionHelper(helperX,helperY);
                }

        }



}

function removeIntersections() {
//console.log('removeIntersections');
	for (p=0;p<intersectionList.length;p++) {
                stage.removeChild(stage.getChildByName(intersectionList[p]));
	}
	intersectionList = [];
}


function dragCurve(evt) {
		$("#drag").click();
                var offsetX = startX - evt.stageX;
                var offsetY = startY - evt.stageY;
                startX = evt.stageX;
                startY = evt.stageY;
                var thisGroupId = evt.currentTarget.groupId;
                moveByOffset(thisGroupId, offsetX, offsetY);
//moveByOffset(thisGroupId, evt.stageX, evt.stageY);

}
function dragLine(evt) {
//		$("#drag").click();
//console.log('drag line');
	
                var offsetX = startX - evt.stageX;
                var offsetY = startY - evt.stageY;
//console.log('startX ' + startX + ' evt.stageX ' + evt.stageX);
                startX = evt.stageX;
                startY = evt.stageY;
                var thisGroupId = evt.currentTarget.groupId;
                moveByOffset(thisGroupId, offsetX, offsetY);



}
function dragHelper(evt) {
	var hx = evt.stageX;
	var hy = evt.stageY;
	drawHelper(evt.currentTarget,hx,hy);
	var thisCurve = "c" + evt.currentTarget.name.substr(1,evt.currentTarget.name.length);
	var x1 = stage.getChildByName(thisCurve).x1;
	var y1 = stage.getChildByName(thisCurve).y1;
        var x2 = stage.getChildByName(thisCurve).x2;
        var y2 = stage.getChildByName(thisCurve).y2;
	drawCurve(stage.getChildByName(thisCurve),x1,y1,hx,hy,x2,y2);
}

function updatePoint(point, x, y) {
	var x1,y1,x2,y2,hx,hy;
                //redraw current point where the mouse is
                drawPoint(point, x, y);
                //redraw the lines (edges) based on coordinates of points/nodes
                cy.$('#' + point.name).neighborhood('edge').forEach(function( ele ){
                        //if the edge is a line
                        if (ele.id()[0] == "l") {
                                x1 = stage.getChildByName(ele.target().id()).x1;
                                y1 = stage.getChildByName(ele.target().id()).y1;
                                x2 = stage.getChildByName(ele.source().id()).x1;
                                y2 = stage.getChildByName(ele.source().id()).y1;
                                drawLine(stage.getChildByName(ele.id()), x1,y1,x2,y2);
			}
                        if (ele.id()[0] == "c") {
                                x1 = stage.getChildByName(ele.target().id()).x1;
                                y1 = stage.getChildByName(ele.target().id()).y1;
                                x2 = stage.getChildByName(ele.source().id()).x1;
                                y2 = stage.getChildByName(ele.source().id()).y1;
                                var tempName = 'h' + ele.id().substr(1,ele.id().length);

				hx = stage.getChildByName(ele.id()).hx;
				hy = stage.getChildByName(ele.id()).hy; 
                                drawCurve(stage.getChildByName(ele.id()), x1,y1,hx,hy,x2,y2);
				drawHelper(stage.getChildByName(tempName),hx,hy);
                        }
                });
}

function dragPoint(evt) {



//console.log('point at ' + evt.currentTarget.x1 + ',' + evt.currentTarget.y1);
//console.log('mouse at ' + stage.mouseX + ',' + stage.mouseY); 

	updatePoint(evt.currentTarget, evt.stageX, evt.stageY);

}

function helperIntersection(evt) {
        var tempX = evt.currentTarget.oldX;
        var tempY = evt.currentTarget.oldY;
        var intersects = false;
        var intersection;
        var shape;
        var curves1,curves1a,curves1b,curve1;
        var curves2,curves2a,curves2b;
        var x1,y1,x2,y2,helper1x,helper1y,helper2x,helper2y,helper3x,helper3y,helper4x,helper4y;
        var tempPair;
        var ele;
	var thisName = 'c' + evt.currentTarget.name.substr(1,evt.currentTarget.name.length);

		ele = cy.$('#' + thisName);

                curves1 = setupCurve(ele.id(),ele.target().id(),ele.source().id());
                curve1a = curves1[1];
                curves1 = setupCurve(ele.id(),ele.source().id(),ele.target().id());
                curve1b = curves1[1];
                // all lines and edges in the world
                for (d = 0; d < stage.children.length; d++) {
                        shape = stage.children[d];
if (((shape.name[0] == "l") || (shape.name[0] == "c")) && (ele.id() != shape.name)) {
                                ele2 = cy.$('#' + shape.name);
                                if (shape.name[0] == 'l') {
                                        line2 = setupLine(ele2.source().id(),ele2.target().id());
                                } else {
                                        if (shape.name[0] == 'c') {
                                                curves2 = setupCurve(ele2.id(),ele2.source().id(),ele2.target().id(),'green','blue');
                                                curve2a = curves2[0];
                                                curve2b = curves2[1];
                                        }
                                }
                                if ((ele.id()[0] == "l") && (ele2.id()[0] == "l")) {
                                        lineLineIntersection(line1, line2);
                                }
                                if ((ele.id()[0] == "c") && (ele2.id()[0] == "c")) {
                                        curveCurveIntersection(curve1a, curve2a);
                                        curveCurveIntersection(curve1a, curve2b);
                                        curveCurveIntersection(curve1b, curve2a);
                                        curveCurveIntersection(curve1b, curve2b);
                                }
                                if ((ele.id()[0] == "l") && (ele2.id()[0] == "c")) {
                                        curveLineIntersection(curve2a, line1);
                                        curveLineIntersection(curve2b, line1);
                                }
                                if ((ele.id()[0] == "c") && (ele2.id()[0] == "l")) {
                                        curveLineIntersection(curve1a, line2);
                                        curveLineIntersection(curve1b, line2);
                                }

                        }
                }
        
}

function edgeIntersection(evt) {
        var tempX = evt.currentTarget.oldX;
        var tempY = evt.currentTarget.oldY;
        var intersects = false;
        var intersection;
        var shape;
        var curves1,curves1a,curves1b,curve1;
        var curves2,curves2a,curves2b;
        var x1,y1,x2,y2,helper1x,helper1y,helper2x,helper2y,helper3x,helper3y,helper4x,helper4y;
        var tempPair;
	var ele;

	var thisGroup = evt.currentTarget.groupId;
	// all the lines and edges in this shape
	for (r=0;r<groupIdList[thisGroup].length;r++) {
		ele = cy.$('#' + groupIdList[thisGroup][r]);
                if (ele.id()[0] == "l") {
                        line1 = setupLine(ele.source().id(),ele.target().id());
                } else { if (ele.id()[0] == "c") {
                               curves1 = setupCurve(ele.id(),ele.target().id(),ele.source().id());
                               curve1a = curves1[1];
                               curves1 = setupCurve(ele.id(),ele.source().id(),ele.target().id());
                               curve1b = curves1[1];

			}
                }
                // all lines and edges in the world
                for (d = 0; d < stage.children.length; d++) {
                        shape = stage.children[d];
			if (((shape.name[0] == "l") || (shape.name[0] == "c")) && (ele.id() != shape.name)) {
                                ele2 = cy.$('#' + shape.name);
                                if (shape.name[0] == 'l') {
                                        line2 = setupLine(ele2.source().id(),ele2.target().id());
                                } else {
                                        if (shape.name[0] == 'c') {
                                                curves2 = setupCurve(ele2.id(),ele2.source().id(),ele2.target().id(),'green','blue');
                                                curve2a = curves2[0];
                                                curve2b = curves2[1];
                                        }
                                }
                                if ((ele.id()[0] == "l") && (ele2.id()[0] == "l")) {
                                        lineLineIntersection(line1, line2);
                                }
                                if ((ele.id()[0] == "c") && (ele2.id()[0] == "c")) {
                                        curveCurveIntersection(curve1a, curve2a);
                                        curveCurveIntersection(curve1a, curve2b);
                                        curveCurveIntersection(curve1b, curve2a);
                                        curveCurveIntersection(curve1b, curve2b);
                                }
                                if ((ele.id()[0] == "l") && (ele2.id()[0] == "c")) {
                                        curveLineIntersection(curve2a, line1);
                                        curveLineIntersection(curve2b, line1);
                                }
                                if ((ele.id()[0] == "c") && (ele2.id()[0] == "l")) {
                                        curveLineIntersection(curve1a, line2);
                                        curveLineIntersection(curve1b, line2);
                                }

                        }
                }
        }
}

function lineLineIntersection(lineA, lineB) {
       var intersection = lineIntersectsLine(lineA,lineB);
	if ((intersection.onLine1) && (intersection.onLine2))  {
               colorIntersection(intersection.x,intersection.y);
        }
}

function curveIntersection(curveA, ele) {
	var int = false;
	var intX, intY;
        curveA.intersects().forEach(function(pair) {
                var t=pair.split('/');
                int = true;
                intX = curveA.get(t[0]).x;
                intY = curveA.get(t[0]).y;
        });
        if (int == true) {
//        	intX = shape.x1;
//        	intY = shape.y1;
                colorIntersection(intX, intY);
        }
}

function curveCurveIntersection(curveA,curveB) {
	var int = false;
	var intX, intY;
	curveA.intersects(curveB).forEach(function(pair) {
		var t=pair.split('/');
		int = true;
		intX = curveA.get(t[0]).x;
		intY = curveA.get(t[0]).y;	
	});
	if (int == true) {
		colorIntersection(intX, intY);
	}
}
function curveLineIntersection(curveA, lineA) {
	var int = false;
	var intX, intY;
	curveA.intersects(lineA).forEach(function(t) {
		int = true;
		intX = curveA.get(t).x, 
		intY = curveA.get(t).y;
	});
	if (int == true) {
                colorIntersection(intX, intY);
	}
}

function pointIntersection(evt) {

        var tempX = evt.currentTarget.oldX;
        var tempY = evt.currentTarget.oldY;
        var intersects = false;
        var intersection;
        var shape;
        var curves1,curves1a,curves1b,curve1;
        var curves2,curves2a,curves2b;
        var x1,y1,x2,y2,helper1x,helper1y,helper2x,helper2y,helper3x,helper3y,helper4x,helper4y;
	var tempPair;
	var c1c2aintersection;

        cy.$('#' + evt.currentTarget.name).neighborhood('edge').forEach(function( ele ){
//console.log('compare: ' + ele.id());
                if (ele.id()[0] == "l") {
                        line1 = setupLine(ele.source().id(),ele.target().id());
                } else { if (ele.id()[0] == "c") {
                               curves1 = setupCurve(ele.id(),ele.target().id(),ele.source().id());
                               curve1a = curves1[1];
                               curves1 = setupCurve(ele.id(),ele.source().id(),ele.target().id());
                               curve1b = curves1[1];
                               curveIntersection(curve1a, ele);
                               curveIntersection(curve1b, ele);

				//curveIntersection(curve1a, evt.currentTarget);
				//curveIntersection(curve1b, evt.currentTarget);
                        }
                }
		// all lines and edges in the world
		for (d = 0; d < stage.children.length; d++) {
			shape = stage.children[d];
			if (((shape.name[0] == "l") || (shape.name[0] == "c")) && (ele.id() != shape.name)) {
                                ele2 = cy.$('#' + shape.name);
                                if (shape.name[0] == 'l') {
                                        line2 = setupLine(ele2.source().id(),ele2.target().id());
                                } else {
                                        if (shape.name[0] == 'c') {
                                                curves2 = setupCurve(ele2.id(),ele2.source().id(),ele2.target().id(),'green','blue');
                                                curve2a = curves2[0];
                                                curve2b = curves2[1];
                                        }
                                }
                                if ((ele.id()[0] == "l") && (ele2.id()[0] == "l")) {

                                        lineLineIntersection(line1, line2);
                                }
                                if ((ele.id()[0] == "c") && (ele2.id()[0] == "c")) {
                                        curveCurveIntersection(curve1a, curve2a);
                                        curveCurveIntersection(curve1a, curve2b);
                                        curveCurveIntersection(curve1b, curve2a);
                                        curveCurveIntersection(curve1b, curve2b);
                                }
                                if ((ele.id()[0] == "l") && (ele2.id()[0] == "c")) {
                                        curveLineIntersection(curve2a, line1);
                                        curveLineIntersection(curve2b, line1);
                                }
                                if ((ele.id()[0] == "c") && (ele2.id()[0] == "l")) {
                                        curveLineIntersection(curve1a, line2);
                                        curveLineIntersection(curve1b, line2);
                                }

                        }
		}
        });
}


function setupLine(sourceName, targetName) {
	var x1 = stage.getChildByName(targetName).x1;
	var y1 = stage.getChildByName(targetName).y1;
	var x2 = stage.getChildByName(sourceName).x1;
	var y2 = stage.getChildByName(sourceName).y1;
	return { p1: {x: x1, y: y1}, p2: {x: x2, y: y2} };
}


function setupCurve(objectName, sourceName, targetName) {
	var curves = new Array();

	var x1 = stage.getChildByName(sourceName).x1;
	var y1 = stage.getChildByName(sourceName).y1;
	var x2 = stage.getChildByName(targetName).x1;
	var y2 = stage.getChildByName(targetName).y1;
	var hx = stage.getChildByName(objectName).hx;
	var hy = stage.getChildByName(objectName).hy;
        /*grab (x,y) coordinates of the control points*/
        var x=new Array();
        var y=new Array();
        x[0] = x1; y[0] = y1;
        x[1] = hx; y[1] = hy;
        x[2] = x2; y[2] = y2;

        /*computes control points p1 and p2 for x and y direction*/
        var px = computeControlPoints(x);
        var py = computeControlPoints(y);

	curves[0] = new Bezier(Math.round(x1),Math.round(y1),Math.round(px.p1[0]),Math.round(py.p1[0]),Math.round(px.p2[0]),Math.round(py.p2[0]),Math.round(hx),Math.round(hy));

        curves[1] = new Bezier(Math.round(hx),Math.round(hy),Math.round(px.p1[1]),Math.round(py.p1[1]),Math.round(px.p2[1]),Math.round(py.p2[1]),Math.round(x2),Math.round(y2));

	return curves;
}

