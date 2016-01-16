//lineIntersection
//findAnIntersection

function lineIntersectsLine(l1, l2) {
	//lines defined as
	//line1 = { p1: {x:250, y:74}, p2: {x:180,y:250} };
    // from http://jsfiddle.net/justin_c_rounds/Gd2S2/
    var denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false,
	denominator: null
    }
    denominator = ((l2.p2.y - l2.p1.y) * (l1.p2.x - l1.p1.x)) - ((l2.p2.x - l2.p1.x) * (l1.p2.y - l1.p1.y));
    if (denominator == 0) {
        return result;
    }		
    a = l1.p1.y - l2.p1.y;
    b = l1.p1.x - l2.p1.x;
    numerator1 = ((l2.p2.x - l2.p1.x) * a) - ((l2.p2.y - l2.p1.y) * b);
    numerator2 = ((l1.p2.x - l1.p1.x) * a) - ((l1.p2.y - l1.p1.y) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    result.a = a;
    result.b = b;
    result.denominator = denominator;

    result.x = l1.p1.x + (a * (l1.p2.x - l1.p1.x));
    result.y = l1.p1.y + (a * (l1.p2.y - l1.p1.y));

    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    return result;
}

function findAnIntersection() {

//        createCurve(170,41,133,140,40,80);
//        createCurve(80,180,95,50,220,200);

var curve = new Bezier(48, 84, 100, 187, 166, 37); var curve2 = new Bezier(68, 150, 74, 6, 143, 150); 

        var cat = new Bezier(170,41,150,70,133,140);
        var dog = new Bezier(80,180,85,120,95,50);

	var pig = new Bezier(133,140,70,100,40,80);
	var cow = new Bezier(95,50,150,100,220,200);

//        createLine(250,74,180,250);
//        createLine(255,114,220,90);
        var line1 = { p1: {x:250, y:74}, p2: {x:180,y:250} };
        var line2 = { p1: {x:255, y:114}, p2: {x:220,y:90} };

	console.log('does curve intersect line once?');
        dog.intersects(line1).forEach(function(t) {
                console.log('intersection point');
        });

	console.log('does curve intersect curve twice?');
        cat.intersects(dog).forEach(function(t) {
                console.log('intersection point');
        });
        cat.intersects(cow).forEach(function(t) {
                console.log('intersection point');
        });
        dog.intersects(pig).forEach(function(t) {
                console.log('intersection point');
        });
        dog.intersects(cat).forEach(function(t) {
                console.log('intersection point');
        });

        var elk = { p1: {x:250, y:74}, p2: {x:180,y:250} };

	
    	//    lineIntersects: function(line) {
	console.log('does line intersect line once?');
	var lineInt = lineIntersectsLine(elk,line2);
	console.log(lineInt.x + ' ' + lineInt.y);
}

function findLineIntersection(x1,y1,x2,y2,x3,y3,x4,y4) {	

	line1 = {p1: {x:x1, y:y1}, p2: {x:x2, y:y2} };

	// type line above, but replace x1,y1,x2,y2 with x3,y3,x4,y4

	line2 = {p1: {x:x3, y:y3}, p2: {x:x4, y:y4} };
	
	return line1.intersects(line2).length;

}

