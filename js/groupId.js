function addToGroupIdList(thisGroupId, thisName) {
        if (groupIdList[thisGroupId] == undefined) {groupIdList[thisGroupId] = [];}
        groupIdList[thisGroupId].push(thisName);
}

function removeFromGroupIdList(name, groupId) {
  var h = groupIdList[groupId].indexOf(name);
  if (h != -1) { groupIdList[groupId].splice(h,1); }
}


function moveByOffset(thisGroupId, offsetX, offsetY) {

//console.log('move group ' + thisGroupId + ' by ' + offsetX + ', ' + offsetY);

var thisChild;
var x1, y1, hx, hy, x2, y2;
//console.log('groupIdList[thisGroupId] is ' + groupIdList[thisGroupId]);
//console.log('this group has ' + groupIdList[thisGroupId].length + ' members');
for (k=0;k<groupIdList[thisGroupId].length; k++) {
//console.log('they are ' + groupIdList[thisGroupId][k]);

	thisChild = stage.getChildByName(groupIdList[thisGroupId][k]);
	switch (groupIdList[thisGroupId][k][0]) {
		case "n":

			x1 = thisChild.x1 - offsetX;
			y1 = thisChild.y1 - offsetY;
			drawPoint(thisChild, x1, y1);
			break;
                case "l":
			x1 = thisChild.x1 - offsetX;
			y1 = thisChild.y1 - offsetY;
			x2 = thisChild.x2 - offsetX;
			y2 = thisChild.y2 - offsetY;
			drawLine(thisChild, x1, y1, x2, y2);
			break;
                case "h":
			x1 = thisChild.x1 - offsetX;
			y1 = thisChild.y1 - offsetY;
			drawHelper(thisChild, x1, y1);
			break;
                case "c":
                        x1 = thisChild.x1 - offsetX;
                        y1 = thisChild.y1 - offsetY;
                        hx = thisChild.hx - offsetX;
                        hy = thisChild.hy - offsetY;
			x2 = thisChild.x2 - offsetX;
                        y2 = thisChild.y2 - offsetY;
                        drawCurve(thisChild, x1, y1, hx, hy, x2, y2);
			break;
		default: break;
        }
}

}


