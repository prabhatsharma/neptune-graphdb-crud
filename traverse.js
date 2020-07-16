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

    // get spouse of prabhat
    // var spouse = await g.V().has('person', 'name', 'prabhat').both('spouse').valueMap(true).toList()
    // console.log(spouse)

    // get friends of prabhat
    var friends = await g.V().has('person', 'name', 'prabhat').both('friend').valueMap(true).toList()
    console.log(friends)

    await dc.close()
}

main()

