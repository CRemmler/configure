//FUNCTIONS
//toggleLine(edgeName);
//toggleCurve(edgeName);
//cutEdge(edgeName,x,y,randomSize);
//cutNode(nodeName,x,y,randomSize);        

function cutNode(nodeName, randomSize) {
	var edgeName;
	var randomX, randomY;
	var x, y, x1, x2, y1, y2, hx, hy;


	x = group.children[nodeName].segments[0].point.x + 8;
	y = group.children[nodeName].segments[0].point.y;

	cy.$("#" + nodeName).neighborhood().forEach( function(ele) {
	        randomX = Math.random() * randomSize;
        	randomY = Math.random() * randomSize;
	        edgeName = ele.id();
		if (edgeName[0] == "c") {
			x1 = group.children[edgeName].segments[0].point.x;
			y1 = group.children[edgeName].segments[0].point.y;
        		hx = group.children[edgeName].segments[1].point.x;
        		hy = group.children[edgeName].segments[1].point.y;
        		x2 = group.children[edgeName].segments[2].point.x;
        		y2 = group.children[edgeName].segments[2].point.y;
			erase(edgeName);
       if ((x == x1) && (y == y1)) {
                createCurve(x1 + randomX, y1 + randomY, hx, hy, x2, y2);
                glue(x2,y2);
        } else {
                createCurve(x1, y1, hx, hy, x2 + randomX, y2 + randomY);
                glue(x1,y1);
        }

		} else {
			if (edgeName[0] == "l") {
        			x1 = group.children[edgeName].segments[0].point.x;
        			y1 = group.children[edgeName].segments[0].point.y;
        			x2 = group.children[edgeName].segments[1].point.x;
        			y2 = group.children[edgeName].segments[1].point.y;
        			erase(edgeName);

        if ((x == x1) && (y == y1)) {
                createLine(x1 + randomX, y1 + randomY, x2, y2);
                glue(x2,y2);
        } else {
                createLine(x1, y1, x2 + randomX, y2 + randomY);
                glue(x1,y1);
        }

			}
		}
	});
}

function cutEdge(edgeName,x,y,randomSize) {

        var x1 = group.children[edgeName].segments[0].point.x;
        var y1 = group.children[edgeName].segments[0].point.y;
        if (edgeName[0] == "l") {
   	        var x2 = group.children[edgeName].segments[1].point.x;
        	var y2 = group.children[edgeName].segments[1].point.y;
	} else {
                var x2 = group.children[edgeName].segments[2].point.x;
                var y2 = group.children[edgeName].segments[2].point.y;

	}

        var mx1 = x + randomSize;
        var my1 = y + randomSize;
        var mx2 = x - randomSize;
        var my2 = y - randomSize;
	var hx1,hy1,hx2,hy2;

	erase(edgeName);

	if (edgeName[0] == "l") {
	        createLine(x1,y1,mx1,my1);
        	createLine(x2,y2,mx2,my2);
		glue(x1,y1);
		glue(x2,y2);

	} else {
		hx1 = (x1 + mx1) / 2;
		hy1 = (y1 + my1) / 2;
		hx2 = (x2 + mx2) / 2;
		hy2 = (y2 + my2) / 2;

                createCurve(x1,y1,hx1,hy1,mx1,my1);
		createCurve(x2,y2,hx2,hy2,mx2,my2);
//                createCurve(mx1,my1,hx2,hy2,x2,x2);
                glue(x1,y1);
                glue(x2,y2);
	}
}
  
function toggleLine(edgeName) {
	var x1 = group.children[edgeName].segments[0].point.x;
        var y1 = group.children[edgeName].segments[0].point.y;
        var x2 = group.children[edgeName].segments[1].point.x;
        var y2 = group.children[edgeName].segments[1].point.y;
	var hx = (x1 + x2) / 2;
	var hy = (y1 + y2) / 2;
        erase(edgeName);
	createCurve(x1,y1,hx,hy,x2,y2);
	glue(x1,y1);
	glue(x2,y2);
}

function toggleCurve(edgeName) {
//        var x1 = stage.getChildByName(edgeName).x1;
//        var y1 = stage.getChildByName(edgeName).y1;
//        var x2 = stage.getChildByName(edgeName).x2;
//        var y2 = stage.getChildByName(edgeName).y2;
	var x1 = group.children[edgeName].segments[0].point.x;
	var y1 = group.children[edgeName].segments[0].point.y;
	var x2 = group.children[edgeName].segments[2].point.x;
	var y2 = group.children[edgeName].segments[2].point.y;
        erase(edgeName);
        createLine(x1,y1,x2,y2);
        glue(x1,y1);
        glue(x2,y2);
}

