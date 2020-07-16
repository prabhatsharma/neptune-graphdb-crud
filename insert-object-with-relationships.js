const gremlin = require('gremlin');
const flatten = require('flat')
var utils = require('./log-utils')

const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;

var endpoint = "npt3.cluster-ckxzh9614kml.us-west-2.neptune.amazonaws.com"

var dc = new DriverRemoteConnection('wss:' + endpoint + ':8182/gremlin', { mimeType: 'application/vnd.gremlin-v2.0+json' });

const graph = new Graph();
const g = graph.traversal().withRemote(dc);

async function main() {
    var event = require('./event2.json')
    // var flatEvent = flatten(event)
    var id = event.auditID
    delete(event.auditID)

    var log = await g.addV('event').property('id', id).next() // ad the event/log

    for (var key in event) {
        if (typeof (event[key]) !== 'object' && key != 'userAgent' && key != 'sourceIPs' && key != 'objectRef' && key != 'responseStatus' && key != 'annotations' ) {
            try {
                await g.V().has('event', 'id', id).property(key, event[key]).next() // add the event's properties
            } catch (error) {
                console.log("could not add event's property: ", key, " : ", event[key]) 
            }
            
        } else {
            var response = await utils.checkandInsert(key, event[key])
            if(response.inserted == true){
                try {
                    var item = await g.addV(key).property('id', response.id).next() // 1. insert the child node
                } catch (error) {
                    console.log('could not insert child node: ', key, " : ", event[key])
                }
                
                // insert additional properties
                var flatsubKey
                if(key == 'userAgent') {
                    flatsubKey = event[key]
                    try {
                        await g.V(item.value).property(key,flatsubKey).next() // 2. insert additional properties of child
                    } catch (error) {
                        console.log('could not insert additional properties of child node: ', key, " : ", flatsubKey)
                    }
                } 
                else {
                    flatsubKey = flatten(event[key])
                    for(var keySub in flatsubKey){
                        try {
                            await g.V(item.value).property(keySub,flatsubKey[keySub]).next() // 2. insert additional properties of child
                        } catch (error) {
                            console.log('could not insert additional properties of child node: ', keySub, " : ", flatsubKey[keySub])
                        }
                    }
                } 

                

                try {
                    await g.V(log.value).addE('relatesTo').to(item.value).next() // 3. create relationship of inserted node with event
                } catch (error) {
                    console.log('could not create relationship with: ', key)
                }
            } else { // child node is already present
                var item = await g.V().has(key,'id', response.id).next() // 1. get the existing node
                try {
                    // 2. create relationship of existing node with event
                    await g.V(log.value).addE('relatesTo').to(item.value).next() 
                } catch (error) {
                    console.log('could not create relationship with: ', key)
                }
            }

            delete(event[key])
            console.log(response)

            await dc.close()
        }
    }
    console.log(event)
}



main()

