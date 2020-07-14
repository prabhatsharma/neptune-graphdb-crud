const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;

var reader = gremlin.structure.GraphSONReader

async function main() {
    var endpoint = "npt2.cluster-ckxzh9614kml.us-west-2.neptune.amazonaws.com"

    var dc, graph, g;

    dc = new DriverRemoteConnection('wss:' + endpoint + ':8182/gremlin', {mimeType: 'application/vnd.gremlin-v2.0+json'});
    graph = new Graph();
    g = graph.traversal().withRemote(dc);

    var items

    // items = await g.V().valueMap(true).toList() // working best. need to convert result to json

    // get all vertices
    var items2 = await g.V().valueMap(true).toList()
    console.log(items2)

    // get all edges
    var edges = await g.E().valueMap(true).toList()
    console.log(edges)

    // get spouse of prabhat
    var spouse = 




    await dc.close()
}

main()
