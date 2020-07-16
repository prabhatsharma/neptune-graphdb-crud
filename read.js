const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;

var reader = gremlin.structure.GraphSONReader

async function main() {
    var endpoint = "npt3.cluster-ckxzh9614kml.us-west-2.neptune.amazonaws.com"

    var dc, graph, g;

    dc = new DriverRemoteConnection('wss:' + endpoint + ':8182/gremlin', {mimeType: 'application/vnd.gremlin-v2.0+json'});
    graph = new Graph();
    g = graph.traversal().withRemote(dc);

    // get all vertices
    var items2 = await g.V().valueMap(true).toList()
    console.log(items2)

    // get all edges
    var edges = await g.E().valueMap(true).toList()
    console.log(edges)

    // get spouse of prabhat
    var spouse = await g.V().has('person', 'name', 'prabhat').both('spouse').valueMap(true).next()

    // console.log(spouse)

    await dc.close()
}

main()

