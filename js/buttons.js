function setupButtons() {

//console.log('setting up stage events');
//	stage.on("stagemousedown", function(evt) {
//    		console.log("the canvas was clicked at "+evt.stageX+","+evt.stageY);
//	})

        
	// prevent footer to toggle on touch
        $("[data-role=footer]").toolbar({ tapToggle: false });

	$("#shape").click(function(){
                $("#aboutButtonContent").hide();
               // $(".palette-case").hide();
	});

        // reset palette selection (css) and select the clicked color for canvas strokeStyle
        $(".palette-item").click(function(){
                $(".palette-item").css("border-color", "#fff");
                $(this).css("border-color", "#777");

                //$(this).css("border-style", "dashed");

		if ((this.id == "drag-one") || (this.id == "drag-two")) {
			mode = "drag";
		} else { 	
			if ((this.id == "erase-one") || (this.id == "erase-two")) {
			  	mode = "erase";
			} else {
				if ((this.id == "rotate-one") || (this.id == "rotate-two")) {
					mode = "rotate";
				} else {
					mode = this.id;
				}
			}
		}
//                color = $(this).css("background-color");
                //ctx.beginPath();
                //ctx.strokeStyle = color;
        });

        // link the new button with newCanvas() function
        $("#new").click(function() {
                $("#newButtonContent").show();
                $("#canvas").hide();
		$("#aboutButtonContent").hide();
        });


	$("#default").click(function() {
                  newCanvas();
                  createCurve(170,41,133,140,40,80);
                  createLine(250,74,180,150);
	});
        $("#heart").click(function() {
                  newCanvas();
		createLine(232,224.8000030517578,309,127.80000305175781)
		createLine(232,224.8000030517578,160,126.80000305175781)
		createCurve(160,126.80000305175781,170,70.80000305175781,237,96.80000305175781)
		createCurve(309,127.80000305175781,307,66.80000305175781,237,96.80000305175781)
		glue(223,225);
		glue(309,128);
		glue(160,127);
		glue(237,97);
        });


        $("#print").click(function() {
                  console.log('Current shapes are:');
                  for (d = 0; d < stage.children.length; d++) {
                           shape = stage.children[d];
  			   shape.x1 = Math.round(shape.x1);
  			   shape.y1 = Math.round(shape.y1);
  			   shape.x2 = Math.round(shape.x2);
  			   shape.y2 = Math.round(shape.y2);
                           if (shape.name[0] == "l") {
                                  console.log('createLine(' + shape.x1 + ',' + shape.y1 + ',' + shape.x2 + ',' + shape.y2 + ')');
                           }
                           if (shape.name[0] == "c") {
				shape.hx = Math.round(shape.hx);
  				shape.hy = Math.round(shape.hy);
				 console.log('createCurve(' + shape.x1 + ',' + shape.y1 + ','+ shape.hx + ',' + shape.hy + ',' + shape.x2 + ',' + shape.y2 + ')');
                           }
                   }
		  console.log('groupIdList');
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
		$(".palette-case").hide();
	//	$("#aboutButtonContent").css("background-color", "white");

	});

	$("#closeAbout").click(function() {
		$("#aboutButtonContent").hide();
		$("#canvas").show();
		$(".palette-case").show();
	});
        $("#closeNew").click(function() {
                $("#newButtonContent").hide();
                $("#content").show();
                $(".palette-case").show();
        });



}
