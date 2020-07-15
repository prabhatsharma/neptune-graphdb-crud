const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;



async function main() {
    var endpoint = "npt2.cluster-ckxzh9614kml.us-west-2.neptune.amazonaws.com"

    dc = new DriverRemoteConnection('wss:' + endpoint + ':8182/gremlin', {});

    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    // var prabhat = await g.addV('person').property('name', 'prabhat').property('age', 38).next()
    await g.V().has('person', 'name', 'prabhat').property('company', 'amazon').next()
    // var quinsika = await g.addV('person').property('name', 'quinsika').property('age', 35).next()
    // var kiash = await g.addV('person').property('name', 'kiash').property('age', 38).next()

    await dc.close()
}

main()


