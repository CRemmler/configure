function graphingTrials() {


cy.add({
    group: "nodes",
    data: { id: 'n0' }
});

cy.add([
 {  group: "nodes", data: { id: "n1"} },
 {  group: "edges", data: { id: "e0", source: "n0", target: "n1" } }
]);

//cy.remove("node[id = 'n0']");
var eles = cy.add([
 {  group: "nodes", data: { id: "n2"} }
]);

cy.add([
 {  group: "nodes", data: { id: "n3"} },
 {  group: "edges", data: { id: "e1", source: "n2", target: "n3" } },
 {  group: "nodes", data: { id: "n4"} },
 {  group: "edges", data: { id: "e3", source: "n2", target: "n4" } },
 {  group: "nodes", data: { id: "n5"} },
 {  group: "edges", data: { id: "e4", source: "n5", target: "n4" } }
]);

var bfs = cy.elements().bfs({
  roots: '#n2',
  visit: function(i, depth){
    console.log( 'visit ' + this.id() );

    // example of finding desired node
    if( this.id() == "n1" ){
console.log('there is a way from n2 to n1');
      return true;
    }
  },
  directed: false
});

}


