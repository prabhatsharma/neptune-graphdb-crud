const zlib = require('zlib');
const gremlin = require('gremlin');
const flatten = require('flat')

const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;

var endpoint = "npt3.cluster-ckxzh9614kml.us-west-2.neptune.amazonaws.com"

var dc = new DriverRemoteConnection('wss:' + endpoint + ':8182/gremlin', { mimeType: 'application/vnd.gremlin-v2.0+json' });

const graph = new Graph();
const g = graph.traversal().withRemote(dc);


exports.handler = async (event, context) => {
    const payload = Buffer.from(event.awslogs.data, 'base64');
    const parsed = JSON.parse(zlib.gunzipSync(payload).toString('utf8'));
    var logEvents = parsed.logEvents;
    for(var i=0; i < logEvents.length; i++){
        var flatEvent = flatten(JSON.parse(logEvents[i].message))
        await g.addV('event').property('id', flatEvent.auditID).next()
        
        for (var key in flatEvent) {
            if (key !== 'auditID') {
                await g.V().has('event', 'id', flatEvent.auditID).property(key, flatEvent[key]).next()
            }
        }
    
        console.log(flatEvent)
    }
    return `Successfully processed ${parsed.logEvents.length} log events.`;
};
