const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;

async function main() {
    var endpoint = "npt2.cluster-ckxzh9614kml.us-west-2.neptune.amazonaws.com"

    dc = new DriverRemoteConnection('wss:' + endpoint + ':8182/gremlin', {});

    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    // await g.V('0cb99fca-e424-ed2d-1b53-26f054572db6').drop().next()

    var vertices = await g.V().toList()

    for(var i=0;i < vertices.length;i++){
        // console.log(vertices[i].id)
        await g.V(vertices[i].id).drop().next()
    }

    var edges = await g.E().toList

    for(var j=0;j<edges.length;j++){
        await g.E(edges[j].id).drop().next()
    }

    await dc.close()
}

main()
