//FUNCTIONS
// glue()
// unglue()
// erase()


function erasePoint(nodeName) {
console.log(nodeName);
        var neighbors = cy.$("#" + nodeName).neighborhood();
//console.log('neighbors' + neighbors.length);
	if (neighbors.length == 0) {


		removeFromGroupIdList(nodeName, group.children[nodeName].groupId);
		delete groupIdList[group.children[nodeName].groupId];
		group.children[nodeName].remove();
	}

}

function erase(edgeName) {
//console.log('erase ' + edgeName);

	var source = cy.$("#" + edgeName).source();
	var target = cy.$("#" + edgeName).target();
	var sourceNeighbors = cy.$("#" + source.id()).neighborhood();
	var targetNeighbors = cy.$("#" + target.id()).neighborhood();
	var helperName = 'h' + edgeName.substr(1,edgeName.length)

	//if line or curve is alone
	if ((sourceNeighbors.length == 2) && (targetNeighbors.length == 2)) {
		removeFromGroupIdList(source.id(), group.children[source.id()].groupId);
                removeFromGroupIdList(target.id(), group.children[target.id()].groupId);
		removeFromGroupIdList(edgeName, group.children[edgeName].groupId);
		removeFromGroupIdList(helperName, group.children[edgeName].groupId);
		delete groupIdList[group.children[edgeName].groupId];
		cy.remove(cy.$("#" + source.id()));
                cy.remove(cy.$("#" + target.id()));
                cy.remove(cy.$("#" + edgeName));
		if (group.children[helperName] != undefined) {
			group.children[helperName].remove();
		}
		group.children[edgeName].remove();
		group.children[source.id()].remove();
		group.children[target.id()].remove();
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
                removeFromGroupIdList(removableNeighbor.id(), group.children[removableNeighbor.id()].groupId);
                removeFromGroupIdList(edgeName, group.children[edgeName].groupId);
                removeFromGroupIdList(helperName, group.children[edgeName].groupId);
                cy.remove(cy.$("#" + removableNeighbor.id()));
                cy.remove(cy.$("#" + edgeName));
		if (group.children[helperName] != undefined ) {
			group.children[helperName].remove(); 
                }
		group.children[edgeName].remove();
		group.children[removableNeighbor.id()].remove();
	} 

	//if line or curve is connected to lines or curves on both ends
	if ((sourceNeighbors.length > 2) && (targetNeighbors.length > 2)) {
		removeFromGroupIdList(edgeName, group.children[edgeName].groupId);
		removeFromGroupIdList(helperName, group.children[edgeName].groupId);
		cy.remove(cy.$("#" + edgeName));
		group.children[edgeName].remove();
                if (group.children[helperName] != undefined) {
			group.children[helperName].remove();
                }
		var sameObject = false;
		cy.$("#" + source.id()).components().forEach(function( ele ){
			if (ele.id() == target.id()) { sameObject = true; }
		});
		if (sameObject == false) {
			groupId++;
			cy.$("#" + source.id()).components().forEach(function( ele ){
				removeFromGroupIdList(ele.id(), group.children[ele.id()].groupId);
//console.log('remove ' + ele.id() + ' from ' + group.children[ele.id()].groupId);
				addToGroupIdList('g' + groupId, ele.id());				
//console.log('add ' + ele.id() + ' to ' + groupId);
			});
		}
	}

}

function glue(x,y) {
console.log('glue');
        var nodesHere = [];
        var thisPoint = new Point(x,y);
	var edgesInGroup = [];
	var thisX, thisY;
	var glueToItself = false;

	var firstClickedNode = null; 
       for (key in group.children) {
//console.log('key ' + key);
		if ((key[0] == "n") && (firstClickedNode == null)) {
			if (group.children[key].contains(thisPoint)) {
				firstClickedNode = key;
				nodesHere.push(group.children[key]);
			}
		}
                if ((key[0] == "c") || (key[0] == "l")) {
                                edgesInGroup.push(group.children[key]);
                }
	}


	if (firstClickedNode != null) {
		for (key in group.children) {
			if ((key[0] == "n") && (key != firstClickedNode)) {
				if (group.children[key].bounds.intersects(group.children[firstClickedNode].bounds)) {
					nodesHere.push(group.children[key]);
				}
	
			}
		}
	}

//console.log('nodesHere ' + nodesHere);
//console.log('edgesInGroup ' + edgesInGroup);

	
	var source, target, sourceHere, targetHere, gluedEdge;
	//for each edge in group, see if source and target are in nodesHere
	for (key in edgesInGroup) {
		sourceHere = false;
		targetHere = false;
		source = cy.$('#' + edgesInGroup[key].name).source();
		target = cy.$('#' + edgesInGroup[key].name).target();
		for (key2 in nodesHere) {
			if (source.id() == nodesHere[key2].name) {
				sourceHere = true;
			}
			if (target.id() == nodesHere[key2].name) {
				targetHere = true;
			}
		}
		if ((sourceHere) && (targetHere)) {
			glueToItself = true;
			gluedEdge = edgesInGroup[key];
		}
	}

	if (glueToItself == true) {
		//spread pieces apart
		thisX = group.children[firstClickedNode].segments[0].point.x;
		thisY = group.children[firstClickedNode].segments[0].point.y; 
                dragPoint(group.children[firstClickedNode], thisX + 20, thisY + 20);
	}

	if (glueToItself == false) {
                       var tempSource, tempTarget, tempId, tempId2;
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
      								group.children[groupIdList[nodesHere[q].groupId][v]].groupId = firstNode.groupId;
                                                        }
                                                }
                                                delete groupIdList[thisGroup];
                                        }
                                        var i = groupIdList[firstNode.groupId].indexOf(nodesHere[q].name);
                                        if(i != -1) { groupIdList[firstNode.groupId].splice(i, 1);}
                               		group.children[nodesHere[q].name].remove();
                                }
				for (key in group.children) {
					if ((key[0] == 'c') || (key[0] == 'l')) {
						group.children[firstNode.name].insertAbove(group.children[key]);
					}
				}
                dragPoint(group.children[firstNode.name],x + 1,y + 1);

                        }
	}	


        if (firstClickedNode != null) {
		group.children[firstClickedNode].bringToFront();
	}

}




