const gremlin = require('gremlin');
const flatten = require('flat')

const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;

var endpoint = "npt2.cluster-ckxzh9614kml.us-west-2.neptune.amazonaws.com"

var dc = new DriverRemoteConnection('wss:' + endpoint + ':8182/gremlin', { mimeType: 'application/vnd.gremlin-v2.0+json' });

const graph = new Graph();
const g = graph.traversal().withRemote(dc);

async function main() {
    var event = require('./event.json')
    var flatEvent = flatten(event)

    await g.addV('event').property('id', event.auditID).next()

    for (key in flatEvent) {
        if (key !== 'auditID') {
            await g.V().has('event', 'id', flatEvent.auditID).property(key, flatEvent[key]).next()
        }
    }

    await dc.close()
}


main()




