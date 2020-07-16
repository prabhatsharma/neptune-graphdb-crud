const gremlin = require('gremlin');
const cliProgress = require('cli-progress');

const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;

async function main() {
    var endpoint = "npt3.cluster-ckxzh9614kml.us-west-2.neptune.amazonaws.com"

    dc = new DriverRemoteConnection('wss:' + endpoint + ':8182/gremlin', {});

    console.log('connecting to server')

    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    console.log('connected to server. now will start deleting. ')

    await g.V().drop().iterate()

    console.log('All vertices deleted ')

    await dc.close()
}

main()
