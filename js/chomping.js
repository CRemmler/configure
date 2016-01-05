//FUNCTIONS
// glue()
// unglue()
// erase()


function erasePoint(nodeName) {
                removeFromGroupIdList(nodeName, stage.getChildByName(nodeName).groupId);
                delete groupIdList[stage.getChildByName(nodeName).groupId];
                stage.removeChild(stage.getChildByName(nodeName));
                stage.update();

}

function erase(edgeName) {

//	var edgeName = event.currentTarget.name;
	var source = cy.$("#" + edgeName).source();
	var target = cy.$("#" + edgeName).target();
	var sourceNeighbors = cy.$("#" + source.id()).neighborhood();
	var targetNeighbors = cy.$("#" + target.id()).neighborhood();
	var helperName = 'h' + edgeName.substr(1,edgeName.length)

	//if line or curve is alone
	if ((sourceNeighbors.length == 2) && (targetNeighbors.length == 2)) {

		removeFromGroupIdList(source.id(), stage.getChildByName(source.id()).groupId);
                removeFromGroupIdList(target.id(), stage.getChildByName(target.id()).groupId);
		removeFromGroupIdList(edgeName, stage.getChildByName(edgeName).groupId);
		removeFromGroupIdList(helperName, stage.getChildByName(edgeName).groupId);
		delete groupIdList[stage.getChildByName(edgeName).groupId];

		cy.remove(cy.$("#" + source.id()));
                cy.remove(cy.$("#" + target.id()));
                cy.remove(cy.$("#" + edgeName));

		if (stage.getChildByName(helperName) != undefined) { 
			stage.removeChild(stage.getChildByName(helperName));
		}
		stage.removeChild(stage.getChildByName(edgeName));
                stage.removeChild(stage.getChildByName(source.id()));
                stage.removeChild(stage.getChildByName(target.id()));
		stage.update();
	}

	//if line/curve has one alone node
	if (((sourceNeighbors.length == 2) || (targetNeighbors.length == 2)) &&
		(sourceNeighbors.length != targetNeighbors.length)) {
		var removableNeighbor;
		if (sourceNeighbors.length == 2) {
			removableNeighbor = source;		
		} else {
			removableNeighbor = target;
		}
                removeFromGroupIdList(removableNeighbor.id(), stage.getChildByName(removableNeighbor.id()).groupId);
                removeFromGroupIdList(edgeName, stage.getChildByName(edgeName).groupId);
                removeFromGroupIdList(helperName, stage.getChildByName(edgeName).groupId);

                cy.remove(cy.$("#" + removableNeighbor.id()));
                cy.remove(cy.$("#" + edgeName));

                if (stage.getChildByName(helperName) != undefined) {
                        stage.removeChild(stage.getChildByName(helperName));
                }
                stage.removeChild(stage.getChildByName(edgeName));
                stage.removeChild(stage.getChildByName(removableNeighbor.id()));
                stage.update();
	} 

	//if line or curve is connected to lines or curves on both ends
	if ((sourceNeighbors.length > 2) && (targetNeighbors.length > 2)) {
		removeFromGroupIdList(edgeName, stage.getChildByName(edgeName).groupId);
                removeFromGroupIdList(helperName, stage.getChildByName(edgeName).groupId);
		cy.remove(cy.$("#" + edgeName));
		stage.removeChild(stage.getChildByName(edgeName));
                if (stage.getChildByName(helperName) != undefined) {
                        stage.removeChild(stage.getChildByName(helperName));
                }
		stage.update();
		var sameObject = false;
		cy.$("#" + source.id()).components().forEach(function( ele ){
			if (ele.id() == target.id()) { sameObject = true; }
		});
		if (sameObject == false) {
			groupId++;
			cy.$("#" + source.id()).components().forEach(function( ele ){
				removeFromGroupIdList(ele.id(), stage.getChildByName(ele.id()).groupId);
				addToGroupIdList(groupId, ele.id());				
			});
		}
	}
}

function glue(x,y) {
			var shapesHere = stage.getObjectsUnderPoint(x,y);
                       var tempSource, tempTarget, tempId, tempId2;
                        //var shapesHere = stage.getObjectsUnderPoint(event.stageX, event.stageY);
                        var nodesHere = [];
                        for (p=0;p<shapesHere.length;p++) {
                                if (shapesHere[p].name[0]== "n") {
                                        nodesHere.push(shapesHere[p]);
                                }
                        }
                        if (nodesHere.length > 1) {
                                var firstNode = nodesHere[0];
                                for (q=1;q<nodesHere.length;q++) {

                                        var sourceCollection = cy.edges("[source = '" + nodesHere[q].name + "']");
                                        for (t=0;t<sourceCollection.length;t++) {
                                                tempTarget = sourceCollection[t].target().id();
                                                tempId = sourceCollection[t].id();
                                                cy.remove(sourceCollection[t]);
                                                cy.add( {  group: "edges", data: { id: tempId, source: firstNode.name, target: tempTarget } });
                                        }
                                        var targetCollection = cy.edges("[target = '" + nodesHere[q].name + "']");
                                        for (r=0;r<targetCollection.length;r++) {
                                                var tempSource = targetCollection[r].source().id();
                                                var tempId2 = targetCollection[r].id();
                                                cy.remove(targetCollection[r]);
                                                cy.add( {  group: "edges", data: { id: tempId2, target: firstNode.name, source: tempSource } });
                                        }
                                        cy.remove(cy.$("#" + nodesHere[q].name));
                                        var thisGroup = nodesHere[q].groupId;

                                        //for everything in groupIdList[nodesHere[q].groupId] add it to groupIdList[firstNode.groupId]
                                        if (firstNode.groupId != nodesHere[q].groupId) {
                                                var maxLength = groupIdList[nodesHere[q].groupId].length;
                                                for (v=0;v<maxLength;v++) {
                                                        if (groupIdList[nodesHere[q].groupId][v] != nodesHere[q].name) {
                                                                groupIdList[firstNode.groupId].push(groupIdList[nodesHere[q].groupId][v]);
                                                                stage.getChildByName(groupIdList[nodesHere[q].groupId][v]).groupId = firstNode.groupId;
                                                        }
                                                }
                                                delete groupIdList[thisGroup];
                                        }
                                        var i = groupIdList[firstNode.groupId].indexOf(nodesHere[q].name);
                                        if(i != -1) { groupIdList[firstNode.groupId].splice(i, 1);}
                                        stage.removeChild(nodesHere[q]);
                                }
                        }
}




