function showGroupIdList() {
	for (key in groupIdList) {		
	console.log('groupIdList[' + key + ']: ' + groupIdList[key]); 
	}
	console.log(' ');
}

function setupButtons() {
        
	// prevent footer to toggle on touch
        $("[data-role=footer]").toolbar({ tapToggle: false });

	$("#shape").click(function(){
                $("#aboutButtonContent").hide();
               // $(".palette-case").hide();
	});

        // reset palette selection (css) and select the clicked color for canvas strokeStyle
        $(".palette-item").click(function(){
                $(".palette-item").css("border-color", "#fff");
                $(this).css("border-color", "black"); //#777");
		if (this.id.search("-") == -1) {
			mode = this.id;
		} else {
			mode = this.id.substr(0,this.id.search("-"));
		}
        });

        $("#segment").click(function() {
                  newCanvas();
                  createLine(250,74,180,150);
//                $(".palette-case").show();

        });
        $("#arc").click(function() {
                  newCanvas();
                  createCurve(170,41,133,140,40,80);
//                $(".palette-case").show();

        });

	$("#default").click(function() {
                  newCanvas();
//                $(".palette-case").show();
	});
        $("#heart").click(function() {
                  newCanvas();
		createLine(310,129,232,224);
		createLine(161,128,232,224);
		createCurve(238,98,170,71,161,128);
		createCurve(238,98,307,67,310,129);
		glue(232,224);
		glue(310,129);
		glue(161,128);
		glue(238,98);
//                $(".palette-case").show();
        });


        $("#print").click(function() {
                  console.log('Current shapes are:');

                  for (d = 0; d < group.children.length; d++) {
                         shape = group.children[d];
			if (shape.name[0] == "l") {

				x1 = Math.round(shape.segments[0].point.x);
				y1 = Math.round(shape.segments[0].point.y);
				x2 = Math.round(shape.segments[1].point.x);
				y2 = Math.round(shape.segments[1].point.y);
				console.log('createLine(' + x1 + ',' + y1 + ',' + x2 + ',' + y2 + ');');
			}

			if (shape.name[0] == "c") {
                                x1 = Math.round(shape.segments[0].point.x);
                                y1 = Math.round(shape.segments[0].point.y);
                                hx = Math.round(shape.segments[1].point.x);
                                hy = Math.round(shape.segments[1].point.y);
                                x2 = Math.round(shape.segments[2].point.x);
                                y2 = Math.round(shape.segments[2].point.y);
				console.log('createCurve(' + x1 + ',' + y1 + ',' + hx + ',' + hy + ',' + x2 + ',' + y2 + ');');
			}

                   }
              console.log('GroupIdList is:');
              for (key in groupIdList) {
                      console.log('groupIdList[' + key + ']: ' + groupIdList[key]);
              }

	});





//	$("select:heart").click(function() {
//console.log('heart');
//	});

	$("#about").click(function() {
		$("#aboutButtonContent").show();
		$("#newButtonContent").hide();
		$("#canvas").hide();
//		$(".palette-case").hide();
	//	$("#aboutButtonContent").css("background-color", "white");

	});

	$("#closeAbout").click(function() {
		$("#aboutButtonContent").hide();
		$("#canvas").show();
//		$(".palette-case").show();
	});
        $("#closeNew").click(function() {
                $("#newButtonContent").hide();
                $("#content").show();
//                $(".palette-case").show();
        });



}
