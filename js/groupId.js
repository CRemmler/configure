function addToGroupIdList(thisGroupId, thisName) {
        if (groupIdList[thisGroupId] == undefined) {groupIdList[thisGroupId] = [];}
        groupIdList[thisGroupId].push(thisName);
}

function removeFromGroupIdList(name, groupId) {
  var h = groupIdList[groupId].indexOf(name);
  if (h != -1) { groupIdList[groupId].splice(h,1); }

}


function moveByOffset(thisGroupId, offsetX, offsetY) {

var thisChild;
var x1, y1, hx, hy, x2, y2;
for (k=0;k<groupIdList[thisGroupId].length; k++) {
	thisChild = group.children[groupIdList[thisGroupId][k]];
	switch (groupIdList[thisGroupId][k][0]) {
		case "n":
			x1 = thisChild.segments[0].point.x - offsetX;
			y1 = thisChild.segments[0].point.y - offsetY;
			drawPoint(thisChild, x1, y1);
			break;
                case "l":
			x1 = thisChild.segments[0].point.x - offsetX;
			y1 = thisChild.segments[0].point.y - offsetY;
			x2 = thisChild.segments[1].point.x - offsetX;
			y2 = thisChild.segments[1].point.y - offsetY;
			drawLine(thisChild, x1, y1, x2, y2);
			break;
                case "h":
			x1 = thisChild.segments[0].point.x - offsetX;
			y1 = thisChild.segments[0].point.y - offsetY;
			drawHelper(thisChild, x1, y1);
			break;
                case "c":
			x1 = thisChild.segments[0].point.x - offsetX;
			y1 = thisChild.segments[0].point.y - offsetY;
			hx = thisChild.segments[1].point.x - offsetX;
			hy = thisChild.segments[1].point.y - offsetY;
			x2 = thisChild.segments[2].point.x - offsetX;
			y2 = thisChild.segments[2].point.y - offsetY;
                        drawCurve(thisChild, x1, y1, hx, hy, x2, y2);
			break;
		default: break;
        }
}
}


