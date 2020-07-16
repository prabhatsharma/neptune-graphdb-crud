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
        await g.V(prabhat).addE('friend').to(suraj).next()
        await g.V(prabhat).addE('friend').to(amit).next()
        await g.V(prabhat).addE('friend').to(saurabh).next()
        await g.V(prabhat).addE('friend').to(wasim).next()
        await g.V(prabhat).addE('friend').to(tushar).next()

        await g.V(suraj).addE('friend').to(amit).next()
        await g.V(suraj).addE('friend').to(saurabh).next()
        await g.V(suraj).addE('friend').to(wasim).next()

        await g.V(prabhat.value).addE('friend').to(shailabh.value).next()

        await g.V(prabhat).addE('spouse').to(quinsika).next()
        
        // await g.V().addE('friend').from_(suraj.value.id).to(prabhat.value.id).next()

        console.log(prabhat.value.id)
        // prabhat.addE('friend', suraj)
    } catch (error) {
        console.log(error)
    }

    // await g.addV('person').property('id', '2').property('name', 'vadas').property('age', 27).next()
    // await g.addV('software').property('id', '3').property('name', 'lop').property('lang', 'java').next()
    // await g.addV('person').property('id', '4').property('name', 'josh').property('age', 32).next()
    // await g.addV('person').property('id', '6').property('name', 'peter').property('age', 35).next()
    // await g.addV('person').property('id', '7').property('name', 'prabhat').property('age', 37).property('expertise', 'cloud').property('expertise', 'k8s').next()

    await dc.close()
}

main()


