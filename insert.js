const gremlin = require('gremlin');
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;



async function main() {
    var endpoint = "npt3.cluster-ckxzh9614kml.us-west-2.neptune.amazonaws.com"

    dc = new DriverRemoteConnection('wss:' + endpoint + ':8182/gremlin', {});

    const graph = new Graph();
    const g = graph.traversal().withRemote(dc);

    var prabhat = await g.addV('person').property('name', 'prabhat').property('age', 38).next()
    var quinsika = await g.addV('person').property('name', 'quinsika').property('age', 35).next()
    // var kiash = await g.addV('person').property('name', 'kiash').property('age', 38).next()

    var amit = await g.addV('person').property('name', 'amit').property('age', 38).next()
    var saurabh = await g.addV('person').property('name', 'saurabh').property('age', 38).next()
    var suraj = await g.addV('person').property('name', 'suraj').property('age', 38).next()
    var wasim = await g.addV('person').property('name', 'wasim').property('age', 38).next()
    var tushar = await g.addV('person').property('name', 'tushar').property('age', 38).next()
    var shailabh = await g.addV('person').property('name', 'shailabh').property('age', 38).next()

    try {
        await g.V(prabhat.value).addE('friend').to(suraj.value).next()
        await g.V(prabhat.value).addE('friend').to(amit.value).next()
        await g.V(prabhat.value).addE('friend').to(saurabh.value).next()
        await g.V(prabhat.value).addE('friend').to(wasim.value).next()
        await g.V(prabhat.value).addE('friend').to(tushar.value).next()

        await g.V(suraj.value).addE('friend').to(amit.value).next()
        await g.V(suraj.value).addE('friend').to(saurabh.value).next()
        await g.V(suraj.value).addE('friend').to(wasim.value).next()

        await g.V(prabhat.value).addE('friend').to(shailabh.value).next()

        await g.V(prabhat.value).addE('spouse').to(quinsika.value).next()
    } catch (error) {
        console.log(error)
    }

    await dc.close()
}

main()


