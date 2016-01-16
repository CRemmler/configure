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

function colorIntersection(intersections) {
}

function drawAllIntersections() {
	permIntersectionGroup.removeChildren();
	permIntersectionGroupFill.removeChildren();

	for (key in group.children) {
		if ((key[0] == "c") || (key[0] == "l")) {
			if ((group.children[key].name[0] == "c") || (group.children[key].name[0] == "l")) {
                       		edgeIntersection(null,group.children[key].name);
			}
		}
	}
        transferTempToPerm();
	
}

function transferPermtoTemp(name) {
//console.log('transferPermtoTemp for ' + name);
	var thisSource;
        var transferList = [];
	var thisGroupId;
	var firstGroupId, secondGroupId;
	var tempName;

        for (key in permIntersectionGroup.children) {
                transferList.push(permIntersectionGroup.children[key]);

//console.log('transferList ' + permIntersectionGroup.children[key].name1 + ' ' + permIntersectionGroup.children[key].name2);
        }

	if ((name[0] == "c") || (name[0] == "l")) {
		thisGroupId = group.children[name].groupId;
		for (c=0; c<transferList.length; c++) {
			firstGroupId = group.children[transferList[c].name1].groupId;
			if (transferList[c].name2 == false) {
				if (thisGroupId == firstGroupId) {
                                         tempIntersectionGroup.addChild(transferList[c]);
                                        removePermIntersection(transferList[c]);

				}
			}

			if (transferList[c].name2 != false) {
				secondGroupId = group.children[transferList[c].name2].groupId;
//console.log('thisGroupId ' + thisGroupId + ' and first and second ' + firstGroupId + ' ' + secondGroupId);
				if ((thisGroupId == firstGroupId) || (thisGroupId == secondGroupId)) {
                             		 tempIntersectionGroup.addChild(transferList[c]);
                                	removePermIntersection(transferList[c]);
				}
			}	
		}
	} else {
		if (name[0] == "h") { tempName = "c" + name.substr(1,name.length); } else { tempName = name; }
        	for (a = 0; a < transferList.length; a++) {
			if ((tempName == transferList[a].name1) ||  (tempName == transferList[a].name2)) {
	                	tempIntersectionGroup.addChild(transferList[a]);
				removePermIntersection(transferList[a]);
			}
        	}	
		neighborhood = cy.$('#' + tempName).neighborhood();
		for (t=0;t<neighborhood.length;t++) {
			for (b = 0; b<transferList.length; b++) {
	               		if ((neighborhood[t].id() == transferList[b].name1) ||  (neighborhood[t].id() == transferList[b].name2)) {
                       			tempIntersectionGroup.addChild(transferList[b]);
                       			removePermIntersection(transferList[b]);
				}
			}
		}
	}
        for (key in tempIntersectionGroup.children) {

               	tempIntersectionGroup.children[key].fillColor = 'yellow';
        }


	transferList = [];

        for (key in permIntersectionGroupFill.children) {
                transferList.push(permIntersectionGroupFill.children[key]);
        }
        if ((name[0] == "c") || (name[0] == "l")) {
                thisGroupId = group.children[name].groupId;
                for (c=0; c<transferList.length; c++) {
                        firstGroupId = group.children[transferList[c].name1].groupId;
			if (transferList[c].name2 == false) {
				if ((name[0] == "c") || (name[0] == "h")) {
	                               if ((thisGroupId == firstGroupId) || (thisGroupId == secondGroupId)) {
        	                                 tempIntersectionGroupFill.addChild(transferList[c]);
                	                        removePermIntersectionFill(transferList[c]);
                        	        }
				}
			
			}
                        if (transferList[c].name2 != false) {
                                secondGroupId = group.children[transferList[c].name2].groupId;
                                if ((thisGroupId == firstGroupId) || (thisGroupId == secondGroupId)) {
                                         tempIntersectionGroupFill.addChild(transferList[c]);
                                        removePermIntersectionFill(transferList[c]);
                                }
                        }
                }
        } else {
                if (name[0] == "h") { name = "c" + name.substr(1,name.length); }
                for (a = 0; a < transferList.length; a++) {
                        if ((name == transferList[a].name1) ||  (name == transferList[a].name2)) {
                                tempIntersectionGroupFill.addChild(transferList[a]);
                                removePermIntersectionFill(transferList[a]);
                        }
                }
                neighborhood = cy.$('#' + name).neighborhood();
                for (t=0;t<neighborhood.length;t++) {
                        for (b = 0; b<transferList.length; b++) {
                                if ((neighborhood[t].id() == transferList[b].name1) ||  (neighborhood[t].id() == transferList[b].name2)) {
                                        tempIntersectionGroupFill.addChild(transferList[b]);
                                        removePermIntersectionFill(transferList[b]);
                                }
                        }
                }
        }
        for (key in tempIntersectionGroupFill.children) {
		if (tempIntersectionGroupFill.children[key].strokeColor != '{ red: 1, green: 0, blue: 0 }') {
                	tempIntersectionGroupFill.children[key].strokeColor = 'yellow';
		}
        }
}
function transferTempToPerm() {

//console.log('transferTempToPerm');
	var transferList = [];
        for (key in tempIntersectionGroup.children) {
		transferList.push(tempIntersectionGroup.children[key]);
        }
	for (a = 0; a < transferList.length; a++) {
		permIntersectionGroup.addChild(transferList[a]);
	}
        for (key in permIntersectionGroup.children) {
                permIntersectionGroup.children[key].fillColor = 'orange';
        }

        transferList = [];
        for (key in tempIntersectionGroupFill.children) {
                transferList.push(tempIntersectionGroupFill.children[key]);
        }
        for (a = 0; a < transferList.length; a++) {
                permIntersectionGroupFill.addChild(transferList[a]);
        }
        for (key in permIntersectionGroupFill.children) {
		if (permIntersectionGroupFill.children[key].strokeColor != '{ red: 1, green: 0, blue: 0 }') {
                	permIntersectionGroupFill.children[key].strokeColor = 'orange';
		}
        }

        removeTempIntersections();

}

function removePermIntersection(thisChild) {
    permIntersectionGroup.removeChildren(thisChild);
}

function removeTempIntersections() {
    tempIntersectionGroup.removeChildren();
    tempIntersectionGroupFill.removeChildren();    
}

function removePermIntersectionFill(thisChild) {
    permIntersectionGroupFill.removeChildren(thisChild);
}

//function removeTempIntersectionsFill() {
//    tempIntersectionGroupFill.removeChildren();
//}


function findObjectsHere(data) {
	var hitObject = group.hitTest(data.point);
	var name = hitObject.item.name;
	var found = false;
	for (z=0;z<data.objects.length;z++) {
		if (name == data.objects[z]) {
			found = true;
		}
	}
	//if object has already been found, then data.objects is complete
	if (found) {
		return data;
	}
	// else find object below
	data.objects.push(name);
	hitObject.item.sendToBack();
	return findObjectsHere(data);
}

function drawTempIntersections(intersections, name) {

	// find all lines and curves here, if more than one, draw intersection
	var foundObjects, name1, name2;
	var circlesHere;
        for (var f = 0; f < intersections.length; f++) {
                thisPoint = intersections[f].point;
		var allObjectsFound = [];
		var data = {objects: allObjectsFound, point: thisPoint};
		foundObjects = findObjectsHere(data);
		foundObjects = foundObjects.objects;
		name1 = null;
		name2 = null;
		circlesHere = 0;
		for (q=0;q<foundObjects.length;q++) {

			if (foundObjects[q][0] == "n") { circlesHere++; }
			if ((foundObjects[q][0] == "c") || (foundObjects[q][0] == "l")) {
				if (name1 == null) { 
					name1 = foundObjects[q]; 
				} else {
					name2 = foundObjects[q]; 
					//i = foundObjects.length;
				}	
			}
		}

		if ((name2 != null) && (circlesHere < 1)) {
                        var intersectionPath = new Path.Circle({
                                center: intersections[f].point,
                                radius: 4,
                                fillColor: 'yellow', //'orange',
                                strokeColor: 'red',
                                strokeWidth: 2,
                                name1: name1,
                                name2: name2,
                                parent: tempIntersectionGroup
                        });
		}
	}
}

function drawIntersectionLine(firstName, secondName, point1, point2) {
//console.log('drawIntersectionLine');

	var changeY, changeX, slope;

	changeY = point2.y - point1.y;
	changeX = point2.x - point1.x;
//console.log('x ' + point1.x + ' ' + point2.x);
	if ( Math.abs(point1.x - point2.x) < 4) {

//console.log('point1.x == point2.x ' + point1.x + ' ' + point2.x + ' diff ' + (point1.x - point2.x));
		if (point1.y < point2.y) {
			point1.y = point1.y + 15 * 1;
			point2.y = point2.y - 15 * 1;
		} else {
			point1.y = point1.y - 15 * 1;
			point2.y = point2.y + 15 * 1;
		}
//console.log('draw line from ' + point1.x + ',' + point1.y + ' to ' + point2.x + ',' + point2.y);
	} else {
	
		slope = Math.abs(changeY / changeX);
		if (slope < 1) {
			if (point1.x < point2.x) {
				point1.x = point1.x + 15 * 1;
				point2.x = point2.x - 15 * 1;
			} else {
				point1.x = point1.x - 15 * 1;
				point2.x = point2.x + 15 * 1;
			}
			if (point1.y <= point2.y) {
				point1.y = point1.y + 15 * slope;
				point2.y = point2.y - 15 * slope;
			} else {
				point1.y = point1.y - 15 * slope;
				point2.y = point2.y + 15 * slope;
			}
		} else {
                        slope = 1 / slope;
                        if (point1.x < point2.x) {
                                point1.x = point1.x + 15 * slope;;
                                point2.x = point2.x - 15 * slope;
                        } else {
                                point1.x = point1.x - 15 * slope;
                                point2.x = point2.x + 15 * slope;
                        }
                        if (point1.y <= point2.y) {
                                point1.y = point1.y + 15;
                                point2.y = point2.y - 15;
                        } else {
                                point1.y = point1.y - 15;
                                point2.y = point2.y + 15;
                        }
		}
	}

        //draw intersection line between point1 and point
        var line = new Path();
        line.strokeWidth = 8;
        line.strokeColor = 'red';
        line.strokeCap = 'round';
        line.add(point1, point2);
        line.name1 = firstName;
        line.name2 = secondName;
        line.parent = tempIntersectionGroup;

        var line2 = new Path();
        line2.strokeColor = 'yellow';
        line2.strokeWidth = 3;
        line2.strokeCap = 'round';
        line2.add(point1, point2);
        line2.name1 = firstName;
        line2.name2 = secondName;
	line2.parent = tempIntersectionGroupFill;

}

function checkCollinear(p1, p2, p3, p4) {
	var result;
	var leftSide, rightSide;
	var collinear123, collinear124;

//console.log(p1.y + ' ' + p2.y + ' ' + p3.y + ' ' + p4.y);
	//are points 1, 2, and 3 collinear?
	leftSide = (p1.y - p2.y) * (p2.x - p3.x);
	rightSide = (p1.x - p2.x) * (p2.y - p3.y);
	if (Math.abs(leftSide - rightSide) < (0.1 * Math.abs(leftSide))) { collinear123 = true; } else { collinear123 = false; }
	if ((Math.abs(p1.y - p2.y) < 3) && (Math.abs(p2.y - p3.y) < 3)) { collinear123 = true; }
        if ((Math.abs(p1.x - p2.x) < 3 ) && (Math.abs(p2.x - p3.x) < 3)) { collinear123 = true; }

	//are points 1, 2 and 4 collinear?
        leftSide = (p2.y - p3.y) * (p3.x - p4.x);
        rightSide = (p2.x - p3.x) * (p3.y - p4.y);
        if (Math.abs(leftSide - rightSide) < (0.1 * Math.abs(leftSide))) { collinear124 = true; } else { collinear124 = false; }
        if ((Math.abs(p2.y - p3.y) < 3) && (Math.abs(p3.y - p4.y) < 3)) { collinear124 = true; }
        if ((Math.abs(p2.x - p3.x) < 3) && (Math.abs(p3.x - p4.x) < 3)) { collinear124 = true; }

	if (collinear123 && collinear124) {
		return true;
	} else {
		return false;
	}
}

function drawLineIntersections(name1, name2) {
	var point1, point2, point3, point4;
	var child1, child2;
	var collinear;
	var numberDistinctPoints;
	var drawBetweenPoints;
	if ((name1[0] == "l") && (name2[0] == "l")) {
		child1 = group.children[name1];
		child2 = group.children[name2];
		point1 = new Point(child1.segments[0].point.x, child1.segments[0].point.y);
		point2 = new Point(child1.segments[1].point.x, child1.segments[1].point.y);
                point3 = new Point(child2.segments[0].point.x, child2.segments[0].point.y);
                point4 = new Point(child2.segments[1].point.x, child2.segments[1].point.y);
		collinear = checkCollinear(point1, point2, point3, point4);
		if (collinear) {
//console.log('collinear');

			numberDistinctPoints = 4;
			//p1, p2, p3 are 3 distinct points
			if (point1.x == point2.x) { if (point1.y == point2.y) { numberDistinctPoints = 3; p1 = point1; p2 = point3; p3 = point4; } }
                        if (point1.x == point3.x) { if (point1.y == point3.y) { numberDistinctPoints = 3; p1 = point1; p2 = point2; p3 = point4; } }
                        if (point1.x == point4.x) { if (point1.y == point4.y) { numberDistinctPoints = 3; p1 = point1; p2 = point2; p3 = point3; } }
                        if (point2.x == point3.x) { if (point2.y == point3.y) { numberDistinctPoints = 3; p1 = point2; p2 = point1; p3 = point4; } }
                        if (point2.x == point4.x) { if (point2.y == point4.y) { numberDistinctPoints = 3; p1 = point2; p2 = point1; p3 = point3; } }
                        if (point3.x == point4.x) { if (point3.y == point4.y) { numberDistinctPoints = 3; p1 = point3; p2 = point1; p3 = point2; } }

			if (numberDistinctPoints == 3) {
				//find shortest line
                		distance1 = distance(p1.x, p1.y, p2.x, p2.y);
                		distance2 = distance(p1.x, p1.y, p3.x, p3.y);
		                if (distance1 < distance2) {
             			       drawIntersectionLine(name1, name2, p1, p2);
                		} else {
                        		drawIntersectionLine(name1, name2, p1, p3);
                		}
			} else {

//console.log('draw between points');
				drawBetweenPoints = findMidPoints(point1, point2, point3, point4);		
//console.log(drawBetweenPoints);
				drawIntersectionLine(name1, name2, drawBetweenPoints.firstPoint, drawBetweenPoints.secondPoint);
			}
		}
	}
}

function compareNumbers(a, b) {
  return a - b;
}

function findMidPoints(thisPoint1, thisPoint2, thisPoint3, thisPoint4) {

//console.log(thisPoint1 + ' ' + thisPoint2 + ' ' + thisPoint3 + ' ' + thisPoint4);
	var midPoints = {firstPoint: false, secondPoint: false}
	var firstX, firstY, secondX, secondY;
	var order1, order2;

	if (Math.abs(thisPoint1.x - thisPoint2.x) < 3) {
		//find midpoints using y values
		order1 = [thisPoint1.y, thisPoint2.y, thisPoint3.y, thisPoint4.y];
		order1.sort(compareNumbers);
		firstY = order1[1];
		secondY = order1[2];
		if (thisPoint1.y == firstY) { firstX = thisPoint1.x; }
		if (thisPoint2.y == firstY) { firstX = thisPoint2.x; }
		if (thisPoint3.y == firstY) { firstX = thisPoint3.x; }
		if (thisPoint4.y == firstY) { firstX = thisPoint4.x; }
                if (thisPoint1.y == secondY) { secondX = thisPoint1.x; }
                if (thisPoint2.y == secondY) { secondX = thisPoint2.x; }
                if (thisPoint3.y == secondY) { secondX = thisPoint3.x; }
                if (thisPoint4.y == secondY) { secondX = thisPoint4.x; }

	} else {
                //find midpoints using x values
                order2 = [thisPoint1.x, thisPoint2.x, thisPoint3.x, thisPoint4.x];
                order2.sort(compareNumbers);
                firstX = order2[1];
                secondX = order2[2];
                if (thisPoint1.x == firstX) { firstY = thisPoint1.y; }
                if (thisPoint2.x == firstX) { firstY = thisPoint2.y; }
                if (thisPoint3.x == firstX) { firstY = thisPoint3.y; }
                if (thisPoint4.x == firstX) { firstY = thisPoint4.y; }
                if (thisPoint1.x == secondX) { secondY = thisPoint1.y; }
                if (thisPoint2.x == secondX) { secondY = thisPoint2.y; }
                if (thisPoint3.x == secondX) { secondY = thisPoint3.y; }
                if (thisPoint4.x == secondX) { secondY = thisPoint4.y; }
//console.log(firstX + ',' + firstY + ' ' + secondX + ',' + secondY);
	}
	midPoints.firstPoint = {x: firstX, y: firstY};
	midPoints.secondPoint = {x: secondX, y:secondY};	
	return midPoints;
}

function drawCurveIntersections(name) {
//console.log('drawCurveInt');
	var thisChild = group.children[name];
	var point1 = new Point(thisChild.segments[0].point.x, thisChild.segments[0].point.y);
        var pointH = new Point(thisChild.segments[1].point.x, thisChild.segments[1].point.y);
        var point2 = new Point(thisChild.segments[2].point.x, thisChild.segments[2].point.y);
	var distance12, distance1H, distance2H;
	var collinear = checkCollinear(point1, pointH, point2, pointH);
	var distance1, distance2;
	var overlapping = false;
	var minPoint, maxPoint;

	if (collinear) {
//console.log('collinear');
		//is the distance between point1 and point less than the distance between point1 and pointH

		distance1H = distance(point1.x, point1.y, pointH.x, pointH.y);
		distance12 = distance(point1.x, point1.y, point2.x, point2.y);
		distance2H = distance(point2.x, point2.y, pointH.x, pointH.y);

		if (Math.abs(pointH.x - point1.x) < 4) {
			minPoint = Math.min(point1.y, pointH.y, point2.y);
			maxPoint = Math.max(point1.y, pointH.y, point2.y);
			if ((minPoint == pointH.y) || (maxPoint == pointH.y)) { overlapping = true; }
		} else {
                        minPoint = Math.min(point1.x, pointH.x, point2.x);
                        maxPoint = Math.max(point1.x, pointH.x, point2.x);
                        if ((minPoint == pointH.x) || (maxPoint == pointH.x)) { overlapping = true; }
		}
	
		if ((distance1H < 25) || (distance2H < 25)) { overlapping = false; }
		if (overlapping) { 
			//draw line between shortest segment
			if (distance1H < distance2H) {
                		drawIntersectionLine(name, false, point1, pointH);
			} else {
        	        	drawIntersectionLine(name, false, point2, pointH);
			}
		}
	}
}


//function distance(thisPoint1, thisPoint2) {

//}

function dragCurve(object,x,y) {
		//$("#drag").click();
                var offsetX = startX - x;
                var offsetY = startY - y;
                startX = x;
                startY = y;
                var thisGroupId = object.groupId;
                moveByOffset(thisGroupId, offsetX, offsetY);
//moveByOffset(thisGroupId, evt.stageX, evt.stageY);

}

function dragLine(object,x,y) {

                var offsetX = startX - x;
                var offsetY = startY - y;
                startX = x;
                startY = y;
                var thisGroupId = object.groupId;  
                moveByOffset(thisGroupId, offsetX, offsetY);
}

function dragHelper(object,x,y) {

	var hx = x;
	var hy = y;
	drawHelper(object,hx - 8,hy - 8);

	var thisCurve = "c" + object.name.substr(1,object.name.length);
	var x1 = group.children[thisCurve].segments[0].point.x;
	var y1 = group.children[thisCurve].segments[0].point.y;
        var x2 = group.children[thisCurve].segments[2].point.x;
	var y2 = group.children[thisCurve].segments[2].point.y;
	drawCurve(group.children[thisCurve],x1,y1,hx,hy,x2,y2);
}

function updatePoint(point, x, y) {
	var x1,y1,x2,y2,hx,hy;
//	x = x - 8;

//console.log('canvasOffset ' + ' ' + canvasOffset.top + ' ' + canvasOffset.left);
                //redraw current point where the mouse is
                drawPoint(point, x - 8, y);
                //redraw the lines (edges) based on coordinates of points/nodes
                cy.$('#' + point.name).neighborhood('edge').forEach(function( ele ){
                        //if the edge is a line
                        if (ele.id()[0] == "l") {
				x1 = group.children[ele.target().id()].segments[0].point.x;
				y1 = group.children[ele.target().id()].segments[0].point.y;
				x2 = group.children[ele.source().id()].segments[0].point.x;
				y2 = group.children[ele.source().id()].segments[0].point.y;
				drawLine(group.children[ele.id()],(x1 + 8) ,y1,(x2 + 8),y2);
			}
                        if (ele.id()[0] == "c") {
                                x1 = group.children[ele.target().id()].segments[0].point.x;
                                y1 = group.children[ele.target().id()].segments[0].point.y;
                                x2 = group.children[ele.source().id()].segments[0].point.x;
                                y2 = group.children[ele.source().id()].segments[0].point.y;
                                var tempName = 'h' + ele.id().substr(1,ele.id().length);
                              hx = group.children[ele.id()].segments[1].point.x;
                              hy = group.children[ele.id()].segments[1].point.y;
				drawCurve(group.children[ele.id()],x1 + 8,y1,hx,hy,x2 + 8,y2);

				drawHelper(group.children[tempName],hx - 8,hy - 8);

                        }
                });
}

function dragPoint(object, x, y) {


//console.log('dragPoint from ' + object.segments[2].point.x + ' ' + object.segments[2].point.y);
//console.log('dragPoint from ' + object.segments[3].point.x + ' ' + object.segments[3].point.y);

//console.log(' dragPoint ' + object.name + ' to ' + x  + ',' + y);


//updatePoint(group.children[object],x,y);
	updatePoint(object,x,y);

}

function helperIntersection(evt, name) {
        var shape;
        var pathA, pathB;
	var ele, ele2;
        var intersections;


        var thisName = 'c' + name.substr(1,name.length);
        ele = cy.$('#' + thisName);
        pathA = group.children[ele.id()];
	if (ele.id()[0] == "c") { drawCurveIntersections(ele.id()); }
                // all lines and edges in the world
                for (key in group.children) {
                        if ((key[0] == 'l') || (key[0] == 'c')) {
  	                      shape = group.children[key];
        	                if (((shape.name[0] == "l") || (shape.name[0] == "c")) && (ele.id() != shape.name)) {
                	                ele2 = cy.$('#' + shape.name);
                        	        pathB = group.children[shape.name];
                                	intersections = pathA.getIntersections(pathB);
                                        drawLineIntersections(ele.id(), shape.name);
				        drawTempIntersections(intersections, thisName);

 				}
                        }
                }
}

function edgeIntersection(evt, name) {

//console.log('edge Intersection' + name);

//for (key in group.children) {
//  console.log(key + ':' + group.children[key]);
//}

        var shape;
        var pathA, pathB;
        var ele, ele2;
	var intersections;

	var ele;
	var thisGroup = group.children[name].groupId;
	// all the lines and edges in this shape

	for (r=0;r<groupIdList[thisGroup].length;r++) {

		if (groupIdList[thisGroup][r][0] != 'h') {
			ele = cy.$('#' + groupIdList[thisGroup][r]);
        	        if ((ele.id()[0] == "l") || (ele.id()[0] == "c")) {
                	        pathA = group.children[ele.id()];
			        if (ele.id()[0] == "c") { drawCurveIntersections(ele.id()); }

                		// all lines and edges in the world
                		for (key in group.children) {
					if ((key[0] == 'l') || (key[0] == 'c')) {
       		        	         	shape = group.children[key];
                	        		if (((shape.name[0] == "l") || (shape.name[0] == "c")) && (ele.id() != shape.name)) {
                        	   		     ele2 = cy.$('#' + shape.name);
                        	        		pathB = group.children[shape.name];
		                                	intersections = pathA.getIntersections(pathB);
							drawTempIntersections(intersections, name);
	       	        		                drawLineIntersections(ele.id(), shape.name);

						}
			        	}
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

function pointIntersection(evt, name) {
        var shape;
	var pathA, pathB;
        var ele, ele2;
        var intersections;
        cy.$('#' + name).neighborhood('edge').forEach(function( ele ){
		if ((ele.id()[0] == "l") || (ele.id()[0] == "c")) {
			pathA = group.children[ele.id()];
		        if (ele.id()[0] == "c") { drawCurveIntersections(ele.id()); }

		}
		// all lines and edges in the world
		for (key in group.children) {
                        if ((key[0] == 'l') || (key[0] == 'c')) {
				shape = group.children[key];
				if (((shape.name[0] == "l") || (shape.name[0] == "c")) && (ele.id() != shape.name)) {
                                	ele2 = cy.$('#' + shape.name);
					pathB = group.children[shape.name];
					intersections = pathA.getIntersections(pathB);

			                drawTempIntersections(intersections, name);
                                        drawLineIntersections(ele.id(), shape.name);

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

