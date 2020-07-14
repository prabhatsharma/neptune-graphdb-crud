const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;

dc = new DriverRemoteConnection('wss://npt1.cluster-ckxzh9614kml.us-west-2.neptune.amazonaws.com:8182/gremlin', {});

const graph = new Graph();
const g = graph.traversal().withRemote(dc);


g.addV('person').property('name','prabhat').next()


// g.V().limit(1).count().next().
//     then(data => {
//         console.log(data);
//         dc.close();
//     }).catch(error => {
//         console.log('ERROR', error);
//         dc.close();
//     });

